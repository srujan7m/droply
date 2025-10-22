import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq, isNull } from "drizzle-orm";

type FileRow = typeof files.$inferSelect & { thumbnailURL: string | null };

// GET /api/files?parentId=optional
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parentId = req.nextUrl.searchParams.get("parentId");
    const where = parentId
      ? and(eq(files.userId, userId), eq(files.parentId, parentId))
      : and(eq(files.userId, userId), isNull(files.parentId));

    const rows = await db.select().from(files).where(where);
    // Normalize shape for client hooks (url + thumbnailUrl keys expected)
    const items = (rows as FileRow[]).map(r => ({
      id: r.id,
      name: r.name,
      size: r.size ?? undefined,
      type: r.type ?? undefined,
      createdAt: r.createdAt?.toISOString?.() ?? undefined,
      url: r.fileURL,
      thumbnailUrl: r.thumbnailURL ?? undefined,
    }));
    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    console.error("GET /api/files error", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}