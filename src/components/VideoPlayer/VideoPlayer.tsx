"use client"
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoPlayer = ({ videoId, handleVideoEnded,videoTitle }: any) => {
  const playerRef = useRef<any>(null);
  const handleplayVideo=()=>{
    playerRef.current.playVideo();
  }

  useEffect(() => {
    console.log("re-render");

    const createPlayer = () => {
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

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Cleanup the player when the component unmounts
      }
    };
  }, [videoId]); // Re-run effect when videoId changes

  return (
    <div className="flex flex-col ml-5">
    <h2 className="text-white font-bold text-2xl">Currently Playing</h2>
    <div id="player"></div>
    <button type="button" className="text-black bg-white rounded-sm mt-4" onClick={handleplayVideo}>Play</button>
    
    <h2 className="text-white font-semibold mt-10 w-[420px]">{videoTitle}</h2>
    </div>
  );
};

export default VideoPlayer;
