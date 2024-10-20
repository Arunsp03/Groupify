import { addLikes } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
        const body=await request.json();
        await addLikes(body.id)
        return NextResponse.json({"success":"success"});
    }
    catch(err){
        return NextResponse.error();
    }
}