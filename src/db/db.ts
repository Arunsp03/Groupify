
import { Video } from '@/models/video';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const addVideo=async (video:Video)=>{
try{
    const response=await prisma.video.create({data:video})
    return response;
}
catch(err)
{
    console.error(err);
}
}
export const getVideos=async()=>{
    try{
        const videos=await prisma.video.findMany({where:{
            hasplayed:0
        }})
        return videos;
    }
    catch(err)
    {
        console.error(err);
    }
}


