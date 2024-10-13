import { findNextVideoToPlay } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const video=await findNextVideoToPlay();
        return NextResponse.json(video)
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json("error");
    }
}