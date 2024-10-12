import { addVideo } from "@/db/db";
import { NextResponse } from "next/server";
export async function POST(request:Request){
try{
console.log("hit")
const body = await request.json();
console.log("video",body.video)

const response=await addVideo(body.video);

return NextResponse.json({"response":response})
}
catch(err)
{
    return NextResponse.json(err);
}
}  