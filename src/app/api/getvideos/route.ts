import { getVideos } from "@/db/db";
import { NextResponse } from "next/server";
export async function GET()
{
    try{
        const videos=await getVideos();
        return NextResponse.json(videos)
    }
    catch(err)
    {
        return NextResponse.json(err)
    }
}