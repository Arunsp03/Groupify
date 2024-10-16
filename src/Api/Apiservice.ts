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
export default {getStreamerList}