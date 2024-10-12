"use client"
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoPlayer = ({ videoId, handleVideoEnded }: any) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    console.log("re-render");

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Destroy existing player before creating a new one
      }

      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        height: '480',
        width: '853',
        playerVars: { 
          autoplay: 1, 
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
      event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        console.log("Video ended");
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
    <div id="player"></div>
  );
};

export default VideoPlayer;
