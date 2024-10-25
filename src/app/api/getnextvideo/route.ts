import { findNextVideoToPlay } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
        const body=await request.json();
        const video=await findNextVideoToPlay(body.streamername);
        return NextResponse.json(video)
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.error();
    }
}
export const revalidate = 0;