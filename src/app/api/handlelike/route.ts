import { addLikeHistory, addLikes } from "@/db/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
        const serverSession:any=await getServerSession(authOptions);
        
        const body=await request.json();
        console.log("server session",serverSession)
        console.log("body",body);
        await addLikes(body.id)
        await addLikeHistory(serverSession?.user?.username,body.videoid,body.streamername)
        return NextResponse.json({"success":"success"});
    }
    catch(err){
        return NextResponse.error();
    }
}