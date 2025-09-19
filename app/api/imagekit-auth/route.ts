import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "" ,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""
});

export async function GET() {
   try {
    const {userId} =  await auth()
    if(!userId){
     return NextResponse.json({error:"Unauthorized"}, {status: 401})
    }
 
    const authParams = imageKit.getAuthenticationParameters()
    return NextResponse.json(authParams)
   } catch (error) {
     return NextResponse.json({error: "Failed to generate authentication parameters for imagekit"}, {status: 500})
   }
}