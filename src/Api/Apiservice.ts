const getStreamerList=async()=>{
    try{
        const data=await fetch("/api/getStreamerList",{
            method:"GET"
        })
        const streamers=await data.json();
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
        console.log("streamername",streamername)
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
      console.log("inservi",data)
      return data;
    } catch (err) {
      console.error(err);
    }
  };
export default {getStreamerList,fetchVideos,fetchNextVideo,fetchVideoDetailsByID}