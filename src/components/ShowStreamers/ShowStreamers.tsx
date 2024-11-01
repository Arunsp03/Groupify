import { useContext, useEffect, useState } from "react";
import Apiservice from "@/Api/Apiservice";
import { statecontext } from "@/provider";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const {getStreamerList}=Apiservice
const ShowStreamers=()=>{
    const router=useRouter()
    const [streamers,setStreamers]=useState([])
  
    const {selectedstreamer,setSelectedStreamer}=useContext(statecontext)
    useEffect(()=>{
        
        const fetchData=async()=>{
            const streamers=await getStreamerList();
            setStreamers(streamers);
        }
        fetchData();
    },[])
return (
    <div className="text-white grid grid-cols-4 w-[80vw] ml-3 mt-[3rem]"  >
       {/* <p className="text-white">{selectedstreamer}</p> */}
       
        {streamers && streamers.map((item:any,index)=>{
            return(
                <div key={index} className="bg-blue-500 w-[18vw] h-[20vh]  rounded-sm flex flex-col justify-between m-[1rem]">
                <p className="font-semibold text-center m-7 text-xl">{item.streamername}</p>
                <div>
                <button className="font-semibold w-full mb-0 p-1 text-center text-white hover:bg-white hover:text-blue-500 " onClick={()=>{
                    setSelectedStreamer(item.streamername)
                    router.replace(`/queueview/${item.streamername}`);
                }}>Join</button>
                </div>
                </div> 
            )
        })}
    </div>
)
}
export default ShowStreamers;