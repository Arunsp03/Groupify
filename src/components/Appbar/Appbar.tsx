"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const Appbar=()=>{
const session=useSession();
return (
<div className="flex flex-row font-bold justify-end">
{session.data?.user?.name && <span className="text-white m-2">{session.data?.user?.name}</span>}
{session.data?.user?.name ? 
<button className="text-white m-2" onClick={()=>{
    signOut()
}}>Sign out</button>
:<button className="text-white m-2" onClick={()=>{
    signIn()
}}>Sign In</button>}
</div>
)
}
export default Appbar;