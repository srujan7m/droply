import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import ImageKit from "imagekit";
import { v4 as uuidv4 } from "uuid";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const parentId = (form.get("parentId") as string) || null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    if (parentId) {
      const [parent] = await db
        .select()
        .from(files)
        .where(and(eq(files.id, parentId), eq(files.userId, userId), eq(files.isFolder, true)));
      if (!parent) return NextResponse.json({ error: "Parent not found" }, { status: 404 });
    }

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "";
    const uniqueName = `${uuidv4()}.${ext}`;
    const folderPath = parentId ? `/droply/${userId}/folders/${parentId}` : `/droply/${userId}`;

    const uploaded = await imagekit.upload({ file: buffer, fileName: uniqueName, folder: folderPath, useUniqueFileName: false });

    const record = {
      name: file.name,
      path: uploaded.filePath,
      size: file.size,
      type: file.type,
      fileURL: uploaded.url,
      thumbnailURL: uploaded.thumbnailUrl || null,
      userId,
      parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };
    const [saved] = await db.insert(files).values(record).returning();
    return NextResponse.json(saved);
  } catch (error) {
    console.error("POST /api/files/upload error", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}