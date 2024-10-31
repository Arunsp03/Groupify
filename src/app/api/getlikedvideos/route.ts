import { getLikedVideos } from "@/db/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server"

export const POST=async(request:Request)=>{
    try{
        const body=await request.json();
     //   console.log("body",body)

        const data=await getLikedVideos(body.streamername);
        return NextResponse.json(data);
    }
    catch(err)
    {
        return NextResponse.error();
    }
}