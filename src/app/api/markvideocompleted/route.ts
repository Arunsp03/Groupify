import { markVideoCompleted } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try{

        const body=await request.json();

        await markVideoCompleted(body.videoid)
        return NextResponse.json({"Status":"Success"})
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.error();
    }
}