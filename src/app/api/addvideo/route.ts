import { addVideo, returnQueueLength } from "@/db/db";
import { NextResponse } from "next/server";
export async function POST(request:Request){
try{
//console.log("hit")
const body = await request.json();
//console.log("video",body.video)
const queueLength=await returnQueueLength(body.video.streamername);
if(Number(queueLength)>5)
{
 //  console.log("queuelength limit reached");
    return NextResponse.json({"response":"queue limit reached"})
}
else{
const response=await addVideo(body.video);

return NextResponse.json({"response":response})
}
}
catch(err)
{
    return NextResponse.error();
}
}  