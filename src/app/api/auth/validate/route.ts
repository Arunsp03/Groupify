import { validateUser } from "@/db/db";
import { NextResponse } from "next/server"
export async function POST(request:Request){
    try{
        const body=await request.json();
      //  console.log("body",body);
        const user=await validateUser(body.username,body.password);
      //  console.log("found user",user)
        return NextResponse.json(user);
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json(err)
    }
}