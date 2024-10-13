
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
export const addLikes=async(id:number)=>{
    try{
        await prisma.video.update({
            where:{
                id:id
            },
            data:{
                likes:{
                    increment:1
                }
            }
        })
    }
    catch(err)
    {
        console.error(err);
    }
}
export const findNextVideoToPlay=async()=>{
    try{
        const video=await prisma.video.findFirst({
            where:{
                hasplayed:0
            },
            orderBy:{
                likes:'desc'
            }
        })
        return video;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const markVideoCompleted = async (videoid: string) => {
    try {
        await prisma.video.delete({
            where: {
                videoid: videoid,  // No need for equals; just pass the videoid directly
            },
            
        });
    } catch (err) {
        console.error(err);
    }
};



