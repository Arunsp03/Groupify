import { useContext, useEffect, useState } from "react";
import Apiservice from "@/Api/Apiservice";
import { statecontext } from "@/provider";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const {getStreamerList}=Apiservice
const ShowStreamers=()=>{
    const router=useRouter()
    const [streamers,setStreamers]=useState([])
  const[searchStreamer,setSearchStreamer]=useState("")
  const [filteredStreamers,setFilteredStreamers]=useState([])
    const {selectedstreamer,setSelectedStreamer}=useContext(statecontext)
    useEffect(()=>{
        
        const fetchData=async()=>{
            const streamers=await getStreamerList();
            setStreamers(streamers);
setFilteredStreamers(streamers);
            
        }
        fetchData();
    },[])
    const filterStreamer=()=>{
        if(searchStreamer=="")
            {
                setFilteredStreamers(streamers)
            }
            else{
            setFilteredStreamers(streamers.filter((streamer:any)=>streamer.streamername==searchStreamer))
            }
    }

return (
    <>
    <div>
         <input className="text-black  w-[20vw] h-[6vh] font-semibold rounded-sm ml-10 mt-10 text-center p-3" value={searchStreamer} onChange={(e)=>{
            setSearchStreamer(e.target.value)
           
         }} placeholder={"Enter streamer name"} type="text"/>
         <button type="button" className="ml-2 p-3 font-semibold hover:bg-white hover:text-black rounded-md" onClick={filterStreamer}>Search</button>
    </div>
    <div className="text-white grid grid-cols-4 w-[80vw] ml-3 mt-[3rem]"  >
       {/* <p className="text-white">{selectedstreamer}</p> */}
  
        {filteredStreamers && filteredStreamers.map((item:any,index)=>{
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
    </>
)
}
export default ShowStreamers;