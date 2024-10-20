import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt';
import { registerUser } from "@/db/db";
export const POST=async(request:Request)=>{
try{
    const {registrationForm}=await request.json();
   // console.log("body",body)
   const{username,password}=registrationForm
   if(!username || !password)
   {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
   }
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //console.log("hashed password",hashedPassword);
    const response=await registerUser(username,hashedPassword);
    return NextResponse.json({"success":"success"});
}
catch(err)
{
    return NextResponse.error();
}
}