"use client"

import { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { title } from "process";
import { Video } from "@/models/video";

//AIzaSyDSSFhEezYYR7TstNJYGXmPu8LE48lvG-U
const Queue=()=>{
    const fetchVideoDetailsByID=async (videoID:string)=>{
        try{
            const response=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=AIzaSyDSSFhEezYYR7TstNJYGXmPu8LE48lvG-U`,
                {
                    method:"GET"
                }
            )
            const data=await response.json();
            return data;
        }
        catch(err)
        {
            console.error(err)
        }
    }
    const [nextvideo,setnextVideo]=useState<any>(null)
    const [videolink,setVideoLink]=useState<any>("");
    const[videoQueue,setvideoQueue]=useState([]);
    const getVideos=async()=>{
        try{
            const data=await fetch("/api/getvideos",{
                method:"GET",
                cache:"no-store",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const videos=await data.json()
            console.log("videos",videos);
            setvideoQueue(videos);
        }
        catch(err)
        {
            console.error(err);
        }
    }
    const handleVideoInputChange=(e:any)=>{
    try{
        setVideoLink(e.target.value);
    }
    catch(err)
    {
        console.error(err);
    }
    }
    const addVideo=async(video:Video)=>{
        try{
            const response=await fetch("/api/addvideo",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({video})

            })
            console.log("response",response)
        }
        catch(err)
        {
            console.error(err);
        }
    }
    const handleSubmit=async()=>{
        try{
            const videoID:any=videolink.match(/[?&]v=([^&]+)/);
           // console.log("video id",videoID)
            const data=await fetchVideoDetailsByID(videoID[1]);
           // console.log("data",data.items[0].snippet)
           console.log("video id",videoID[1])
           console.log("title of the video",data.items[0].snippet)
           console.log("thumbnail link",data.items[0].snippet.thumbnails.medium.url)
           const video={
            videoid:videoID[1],
            title:data.items[0].snippet.title,
            thumbnail:data.items[0].snippet.thumbnails.default.url
           }
           await addVideo(video)
            setnextVideo(videoID[1])
            setVideoLink("");
            console.log("video Queue",nextvideo);
          
        }
        catch(err)
        {
            console.error(err)
        }
    }
    const handleVideoEnded=()=>{
        try{
            console.log("video ended")
            setnextVideo("rSnQR7vGqMY");

        }
        catch(err)
        {
            console.error(err) 
        }
    }
  useEffect(()=>{
    const fetchdata=async()=>{
        await getVideos()
    }
    fetchdata();
  },[])
return (
   <div>
    <div>
        <input value={videolink} type="text" name="videolink" id="videolink" onChange={(e)=>{
            handleVideoInputChange(e)
        }}/>
        <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
    <div>
        {videoQueue && videoQueue.map((item:any ,index)=>{
            return (
                <div>
                    <p>Title {item.title}</p>
                    <p>Likes {item.likes}</p>
                    <img src={item.thumbnail}></img>
                </div>
            )
        })}
    </div>
    {nextvideo &&   <VideoPlayer videoId={nextvideo} handleVideoEnded={handleVideoEnded}/>}

   </div>
)
}
export default Queue;