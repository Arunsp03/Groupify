import { isVideoPlayingAndReturnVideoId } from "@/db/db";
import { NextResponse } from "next/server"

export const POST =async(request:Request)=>{
    try{
        const body=await request.json();
        const videoId=await isVideoPlayingAndReturnVideoId(body.streamername);
        return NextResponse.json({videoid:videoId});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}