"use client"

import { useEffect, useRef, useState } from "react";
import Apiservice from "@/Api/Apiservice";
const{checkIsVideoPlayingAndReturnVideoId}=Apiservice;
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
const{markVideoPlaying}=Apiservice
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoPlayer = ({ videoId, handleVideoEnded,videoTitle,setVideoId,streamername }: any) => {
  
  const session:any=useSession();
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false); 
  const handleplayVideo=async()=>{
    if (playerRef.current) {
      playerRef.current.playVideo();
      await markVideoPlaying(videoId);
    }
  }

  useEffect(() => {
    console.log("username",session.data?.user?.username);
    console.log("streamername",streamername);
  

    const createPlayer = () => {
      if(!videoId)
      {
        return ;
      }
      if (playerRef.current) {
        playerRef.current.destroy(); // Destroy existing player before creating a new one
      }

      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        height: '300',
        width: '420',
        playerVars: { 
          autoplay: 0, 
          mute: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerReady = (event: any) => {
      console.log("Player is ready");
      // event.target.playVideo();
      setIsPlayerReady(true);
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
       
        handleVideoEnded();
      }
    };

    // Check if the YouTube API script is already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Assign onYouTubeIframeAPIReady if not already loaded
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      // If YT API is already loaded, create the player immediately
      createPlayer();
    }

    if(!(streamername.toString().toLowerCase()==session.data?.user?.username.toLowerCase())){
      setInterval(async () => {
        const videoId=await checkIsVideoPlayingAndReturnVideoId(streamername.toString());
   console.log("video id",videoId.videoid);
   if(videoId?.videoid){
   setVideoId(videoId.videoid)
   if (playerRef.current ) {
    playerRef.current.playVideo(); 
  }
   
   }  
      }, 10000);
      
      
      console.log("if")
   
    }
    else{
      console.log("else")
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Cleanup the player when the component unmounts
      }
      

      
   
    };
  }, [videoId,streamername]); // Re-run effect when videoId changes

  return (
    <div className="flex flex-col ml-5">
    <h2 className="text-white font-bold text-2xl">Currently Playing</h2>
    <div id="player"></div>
    {streamername.toString().toLowerCase()==session.data?.user?.username.toLowerCase()
    &&
    <button type="button" className="text-black bg-white rounded-sm mt-4" onClick={handleplayVideo}>Play</button>
    }
    <h2 className="text-white font-semibold mt-10 w-[420px]">{videoTitle}</h2>
    </div>
  );
};

export default VideoPlayer;
