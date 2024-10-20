import { markVideoPlaying } from "@/db/db";
import { NextResponse } from "next/server";

export const POST=async(request:Request)=>{
    try{
        const body=await request.json();
        await markVideoPlaying(body.videoid);
        return NextResponse.json({"success":"success"});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.error();
    }
}