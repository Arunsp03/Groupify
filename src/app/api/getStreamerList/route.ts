import { NextResponse } from "next/server";
import { getStreamerList } from "@/db/db";

export const GET=async()=>{
    try{
        const streamers=await getStreamerList();
        return NextResponse.json(streamers);

    }
    catch(err)
    {
        console.error(err);
        return NextResponse.error();
    }
}