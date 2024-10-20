"use client"

import { setEngine } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Appbar=()=>{
const session:any=useSession();
const router=useRouter();
useEffect(()=>{

},[session])
return (
<div className="flex flex-row font-bold justify-end bg-blue-500">
{session.data?.user && <span className="text-white m-2 p-2">{session.data?.user?.username}</span>}
{session.data?.user?.role =="Streamer" &&
<>
<Link className="text-white m-2 p-2" href={`/queueview/${session.data?.user?.streamername}`}>My Queue</Link>
<Link className="text-white m-2 p-2" href={`/`}>Home</Link>
</>
}
{session.data?.user ?   
<button className="text-white m-2 p-1" onClick={()=>{
    signOut()
}}>Sign out</button>
:<div><button className="text-white m-2 p-1" onClick={()=>{
    signIn()
}}>Sign In</button>
<button className="text-white m-2 p-1" onClick={()=>{
    router.push("/registration")
}}>Sign Up</button>
</div>
}

</div>
)
}
export default Appbar;