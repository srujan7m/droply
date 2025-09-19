import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {userId} =  await auth()
        if(!userId){
         return NextResponse.json({error:"Unauthorized"}, {status: 401})
        }

        // parse req body
        const body = await req.json()
        const {imagekit, userId:bodyUserId } = body

        if(bodyUserId !== userId){
             return NextResponse.json({error:"Unauthorized"}, {status: 401})
        }

        if(!imagekit || !imagekit.url){
             return NextResponse.json({error:"Unauthorized"}, {status: 401})
        }

    const fileData = {
      name: imagekit.name || "Untitled",
      path: imagekit.filePath || `/droply/${userId}/${imagekit.name}`,
      size: imagekit.size || 0,
      type: imagekit.fileType || "image",
      fileURL: imagekit.url,
      thumbnailUrl: imagekit.thumbnailUrl || null,
      userId: userId,
      parentId: null, // Root level by default
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    // Insert file record into database
    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json(newFile);

} catch (error) {
         return NextResponse.json({error: "Failed to save data to db"}, {status: 500})
}
}