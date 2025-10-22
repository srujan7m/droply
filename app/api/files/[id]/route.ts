import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { files as filesTable } from "@/lib/db/schema";

type FileRow = typeof filesTable.$inferSelect & { thumbnailURL: string | null };

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const id = params.id;
    const [row] = await db.select().from(files).where(and(eq(files.id, id), eq(files.userId, userId)));
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      id: row.id,
      name: row.name,
      size: row.size ?? undefined,
      type: row.type ?? undefined,
      createdAt: row.createdAt?.toISOString?.(),
      url: row.fileURL,
      thumbnailUrl: (row as FileRow).thumbnailURL ?? undefined,
    });
  } catch (error) {
    console.error("GET /api/files/[id] error", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const id = params.id;
    const [deleted] = await db
      .delete(files)
      .where(and(eq(files.id, id), eq(files.userId, userId)))
      .returning();
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/files/[id] error", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}