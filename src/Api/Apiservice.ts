import { Video } from "@/models/video";

const getStreamerList=async()=>{
    try{
        const data=await fetch("/api/getStreamerList",{
            method:"GET"
        })
        const streamers=await data.json();
       // console.log("streamerlist",streamers)
        return streamers;
     
    }
    catch(err)
    {
        console.error(err);
    }
}
const fetchVideos=async(selectedstreamer:string)=>{
    try {
        const data = await fetch("/api/getvideos", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({"streamername":selectedstreamer})
        });
        const videos = await data.json();
      
       return videos;
      } catch (err) {
        console.error(err);
      }
    
}
const fetchNextVideo=async(streamername:String)=>{
    try{
      //  console.log("streamername",streamername)
        const data = await fetch("/api/getnextvideo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({"streamername":streamername})
          });
          const video=await data.json();
          return video;
          
    }
    catch(err)
    {
        console.error(err);
    }
}
const fetchVideoDetailsByID = async (videoID: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/v=id%2C+snipideos?partpet&id=${videoID}&key=AIzaSyDSSFhEezYYR7TstNJYGXmPu8LE48lvG-U`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
     // console.log("inservi",data)
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const markVideoCompleted=async(nextvideo:string)=>{
    try {
      //Mark current video as completed
      await fetch("/api/markvideocompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoid: nextvideo }),
      });
    }
      catch(err)
      {
        console.error(err)
      }
  
}
const markVideoPlaying=async(videoId:string)=>{
  try{
    await fetch("/api/markvideoplaying",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoid: videoId }),
    })
  }
  catch(err)
  {
    console.error(err);
  }
}
const checkIsVideoPlayingAndReturnVideoId=async(streamername:string)=>{
  try
  {
    const data=await fetch("/api/isvideoplaying",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({streamername:streamername})
    })
    const video=await data.json();
  //  console.log("video playing",video.videoid);
    return video.videoid;
  }
  catch(err)
  {
    console.error(err);
  }
}
const submitVideo=async(video:Video)=>{
  try{
    const response = await fetch("/api/addvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video }),
    });
    const data=await response.json();
    return data;
  }
  catch(err)
  {
    console.error(err);
  }
}
const submitLike=async(id:number,videoid:string,streamername:string)=>{
  try{
    await fetch("/api/handlelike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id,videoid,streamername }),
    });
  }
  catch(err)
  {
    console.error(err);
  }
} 
 const getLikedVideos=async(streamername:string)=>{
  try{
    console.log("streamer name",streamername)
    const response=await fetch("/api/getlikedvideos",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({streamername:streamername})
    })
    const data=await response.json();
    console.log("liked videos data",data)
    return data;
  }
  catch(err)
  {

  }
}
export default {getStreamerList,fetchVideos,fetchNextVideo,markVideoCompleted,fetchVideoDetailsByID,markVideoPlaying,checkIsVideoPlayingAndReturnVideoId,submitVideo,submitLike,getLikedVideos}