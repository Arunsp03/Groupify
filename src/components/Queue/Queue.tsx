"use client";

import { useContext, useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Video } from "@/models/video";
import Apiservice from "@/Api/Apiservice";
import { statecontext } from "@/provider";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
const {fetchVideos,fetchNextVideo,markVideoCompleted}=Apiservice
//AIzaSyDSSFhEezYYR7TstNJYGXmPu8LE48lvG-U
const Queue = () => {
  const { streamername } = useParams();
  const session:any=useSession();
  const {selectedstreamer,setSelectedStreamer}=useContext(statecontext)
  const fetchVideoDetailsByID = async (videoID: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=AIzaSyDSSFhEezYYR7TstNJYGXmPu8LE48lvG-U`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const [nextvideo, setnextVideo] = useState<any>(null);
  const [videolink, setVideoLink] = useState<any>("");
  const [videoQueue, setvideoQueue] = useState([]);
  const [title, setTitle] = useState("");
  const getVideos = async () => {
    try {
      const videos = await fetchVideos(selectedstreamer);
      console.log("videos", videos);
      setvideoQueue(videos);
    } catch (err) {
      console.error(err);
    }
  };
  const handleVideoInputChange = (e: any) => {
    try {
      setVideoLink(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };
  const addVideo = async (video: Video) => {
    try {
      const response = await fetch("/api/addvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video }),
      });
      console.log("response", response);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async () => {
    try {
      const videoID: any = videolink.match(/[?&]v=([^&]+)/);
      // console.log("video id",videoID)
      const data = await fetchVideoDetailsByID(videoID[1]);
      // console.log("data",data.items[0].snippet)
      console.log("video id", videoID[1]);
      console.log("title of the video", data.items[0].snippet);
      console.log(
        "thumbnail link",
        data.items[0].snippet.thumbnails.medium.url
      );
      const video = {
        videoid: videoID[1],
        title: data.items[0].snippet.title,
        thumbnail: data.items[0].snippet.thumbnails.default.url,
        streamername:selectedstreamer,
        isplaying:0
      };
      await addVideo(video);
      await getVideos();
      //setnextVideo(videoID[1])
      //setVideoLink("");
      console.log("video Queue", nextvideo);
    } catch (err) {
      console.error(err);
    }
  };
  const handleVideoEnded = async () => {
    try {
      //Mark current video as completed
      // await fetch("/api/markvideocompleted", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ videoid: nextvideo }),
      // });
      await markVideoCompleted(nextvideo);
      await getVideos();
      //Get next video
      console.log("video ended");
      // const data = await fetch("/api/getnextvideo", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const video = await fetchNextVideo(selectedstreamer);
      console.log("next video", video);
      console.log("next video id", video.videoid);
      if (video && video.videoid) {
        setnextVideo(video.videoid);
        setTitle(video.title);
      } else {
        console.log("no next video found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getVideoToPlay = async () => {
    try {
      // const data = await fetch("/api/getnextvideo", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const video = await fetchNextVideo(selectedstreamer );
      console.log("next video", video);
      console.log("next video id", video.videoid);
      console.log("title", video.title);
      if (video && video.videoid) {
        setnextVideo(video.videoid);
        setTitle(video.title);
      } else {
        console.log("no next video found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikes = async (id: number) => {
    try {
      await fetch("/api/handlelike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      await getVideos();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      await getVideos();
      await getVideoToPlay();
      setSelectedStreamer(streamername)
      console.log(streamername+" "+session.data?.user?.username);
    };
    fetchdata();
  }, []);
  return (
    <div className="flex flex-row w-[95vw] m-auto mt-[5rem] ">
      <div className="w-[80vw]">
        <div className="flex flex-row justify-center">
          <input
            className="rounded-sm font-semibold p-1 w-[40vw]"
            placeholder="Enter link"
            value={videolink}
            type="text"
            name="videolink"
            id="videolink"
            onChange={(e) => {
              handleVideoInputChange(e);
            }}
          />
          <button
            className="text-center cursor-pointer text-white font-semibold p-1 ml-5"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="mt-5 ">
          {videoQueue &&
            videoQueue.map((item: any, index) => {
              return (
                <div className="flex flex-col border-b-2">
                  <div className="flex flex-row">
                    <img
                      src={item.thumbnail}
                      style={{ height: "120px", width: "160px" }}
                    ></img>
                    <div className="flex flex-col justify-center p-4">
                      <p className="text-white font-semibold text-sm">
                        {item.title}
                      </p>
                      <div className="flex flex-row items-center mt-2">
                  
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                          id="Like-1--Streamline-Flex"
                          height={18}
                          width={18}
                        >
                          <desc>
                            {"Like 1 Streamline Icon: https://streamlinehq.com"}
                          </desc>
                          <g id="like-1--reward-social-up-rating-media-like-thumb-hand">
                            <path
                              id="Subtract"
                              fill="#79ee8d"
                              d="m3.83715 5.86064 2.86001 -4.41618C6.94817 1.08747 7.35744 0.875 7.79407 0.875c0.81424 0 1.44046 0.71934 1.32766 1.52509l-0.23404 1.67184h1.80211c0.895 0 2.6852 0.89436 2.6852 2.68307 0 1.78871 -1.5548 5.88 -3.45877 5.88 -2.2304 0 -4.47859 -0.6663 -5.68243 -1.0231 -0.14885 -0.0441 -0.28174 -0.0834 -0.39665 -0.1163H3.0769V5.86064h0.76025Z"
                              strokeWidth={1}
                            />
                            <path
                              id="Union"
                              fill="#0c098c"
                              fillRule="evenodd"
                              d="M6.18589 1.08497C6.55402 0.561421 7.15409 0.25 7.79407 0.25 8.98738 0.25 9.9062 1.30446 9.7407 2.48674l-0.13442 0.96019h1.08352c0.6119 0 1.4172 0.28702 2.0685 0.80757C13.4292 4.79086 14 5.6281 14 6.755c0 1.02084 -0.4267 2.58823 -1.082 3.8915 -0.3309 0.6581 -0.7395 1.2889 -1.2172 1.7643 -0.4725 0.4702 -1.0763 0.8492 -1.78457 0.8492 -2.32125 0 -4.63952 -0.6871 -5.84132 -1.0433l-0.0187 -0.0055c-0.11382 -0.0337 -0.21599 -0.064 -0.30732 -0.0906h-0.06008c-0.1095 0.9178 -0.89057 1.6294 -1.83784 1.6294C0.828708 13.75 0 12.9213 0 11.899V5.68777C0 4.66551 0.828708 3.8368 1.85097 3.8368c0.80871 0 1.49628 0.51863 1.74826 1.24143l2.57333 -3.97351c0.00432 -0.00667 0.00876 -0.01325 0.01333 -0.01975ZM3.70194 10.8706V6.48564h0.13521c0.21192 0 0.4094 -0.10738 0.5246 -0.28526l2.85252 -4.40462c0.13435 -0.18549 0.34989 -0.29576 0.5798 -0.29576 0.43517 0 0.76878 0.38422 0.7087 0.81344l-0.23404 1.67184c-0.02508 0.17913 0.02868 0.36034 0.14738 0.49681 0.1187 0.13648 0.29071 0.21484 0.47158 0.21484h1.80211c0.2831 0 0.8203 0.16016 1.288 0.53396 0.4478 0.358 0.7722 0.8623 0.7722 1.52411 0 0.76788 -0.3507 2.14048 -0.9488 3.33 -0.2958 0.5883 -0.6328 1.0921 -0.9822 1.4398 -0.3545 0.3528 -0.6591 0.4852 -0.90277 0.4852 -2.12746 0 -4.2935 -0.6383 -5.50483 -0.9973l-0.00239 -0.0007c-0.14702 -0.0436 -0.28237 -0.0837 -0.40029 -0.1173 -0.0558 -0.016 -0.11354 -0.0241 -0.17157 -0.0241h-0.13521Z"
                              clipRule="evenodd"
                              strokeWidth={1}
                            />
                          </g>
                        </svg>{" "}
                      <p className="text-white font-semibold text-sm ml-3">{item.likes}</p>
                        </div>

                      <button
                        className="text-white w-1 mt-2" 
                        type="button"
                        onClick={() => {
                          handleLikes(item.id);
                        }}
                      >
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex justify-center items-center">
        {nextvideo && (
          <VideoPlayer
            videoId={nextvideo}
            videoTitle={title}
            handleVideoEnded={handleVideoEnded}
          />
        )}
      </div>
    </div>
  );
};
export default Queue;
