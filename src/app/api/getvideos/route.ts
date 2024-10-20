import { getVideos } from "@/db/db";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
export async function POST(request:Request)
{
    try{

        const session:any=await getServerSession(authOptions);
        const streamername:string|""=session?.user?.streamername;
        console.log("streamername",streamername)
        const body=await request.json();
        const videos=await getVideos(body.streamername);
        return NextResponse.json(videos)
    }
    catch(err)
    {
        return NextResponse.error();
    }
}