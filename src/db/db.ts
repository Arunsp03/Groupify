
import { Video } from '@/models/video';
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
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
    export const getVideos=async(streamername:string)=>{
        try{
            const videos=await prisma.video.findMany({where:{
                hasplayed:0,
                streamername:streamername
            },
        orderBy:{
            likes:"desc"
        }
        },
            
        )
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
export const findNextVideoToPlay=async(streamername:string)=>{
    try{
        const video=await prisma.video.findFirst({
            where:{
                hasplayed:0,
                streamername:streamername
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
        console.log("video id marked deleted",videoid)
        await prisma.video.delete({
            where: {
                videoid: videoid,  // No need for equals; just pass the videoid directly
            },
            
        });
    } catch (err) {
        console.error(err);
    }
};

export const validateUser=async(username:string,password:string)=>{
    try{
      
        const user=await prisma.user.findFirst({
            where:{
                username:username,
               
            }
        })
        if(!user)
        {
            console.error("user does not exist");
            return null;
        }
        console.log("user",user);
        const storedHash=user.password;
        const isMatch = await bcrypt.compare(password, storedHash);
        if(isMatch){
        return user;
        }
        return null;
    }
    catch(err)
    {
        console.error(err);
        return null;
    }
}

export const getStreamerList=async()=>{
    try{
        const streamers=await prisma.user.findMany({
            select:{
                streamername:true,
            },
            where:{
                role:"Streamer"
            }
        })
        return streamers;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const markVideoPlaying = async (videoid: string) => {
    try {
        console.log("video id marked playing",videoid)
        await prisma.video.update({
            where: {
                videoid: videoid, 
            },
            data:{
                isplaying:1
            }
        });
    } catch (err) {
        console.error(err);
    }
};

export const isVideoPlayingAndReturnVideoId=async(streamername:string)=>{
    try{
        const videoId=await prisma.video.findFirst({
            where:{
                streamername:streamername,
                isplaying:1
            },
            select:{
                videoid:true
            }
        })
        return videoId;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const registerUser=async(username:string,password:string)=>{
    try{
        const user = await prisma.user.create({
            data:{
                username:username,
                password:password,
                streamername:username
            }
        })
        return user;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const addLikeHistory=async(username:string,videoId:string,streamername:string)=>{
    try{
        const response=await prisma.likeHistory.create({
            data:{
                username:username,
                videoid:videoId,
                streamername:streamername
            }
        })
        return response;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const getLikedVideos=async(streamername:string)=>{
    try{
        console.log("streamername in server",streamername)
        const response=await prisma.likeHistory.findMany({
            where:{
                streamername:streamername
            }
        })
        return response;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const returnQueueLength=async(streamername:string)=>{
    try{
        const response=await prisma.video.count({
            where:{
                streamername:streamername
            }
        })
        return response;
    }
    catch(err)
    {
        console.error(err);
    }
}

export const isUserAlreadyExisting=async(username:string)=>{
    try{
        const isUserExisting=await prisma.user.count({
            where:{
                username:username
            }
        })
        return isUserExisting;
    }
    catch(err)
    {
        console.error(err);
    }
}