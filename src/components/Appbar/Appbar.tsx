"use client"

import { setEngine } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Appbar=()=>{
const session:any=useSession();
useEffect(()=>{

},[session])
return (
<div className="flex flex-row font-bold justify-end bg-blue-500">
{session.data?.user && <span className="text-white m-2 p-2">{session.data?.user?.username}</span>}
{session.data?.user?.role =="Streamer" &&
<Link className="text-white m-2 p-2" href="/queueview">My Queue</Link>
}
{session.data?.user ?   
<button className="text-white m-2 p-1" onClick={()=>{
    signOut()
}}>Sign out</button>
:<button className="text-white m-2 p-1" onClick={()=>{
    signIn()
}}>Sign In</button>}

</div>
)
}
export default Appbar;