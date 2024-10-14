"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const Appbar=()=>{
const session=useSession();
return (
<>
{session.data?.user?.name && <span className="text-white">{session.data?.user?.name}</span>}
{session.data?.user?.name ? 
<button className="text-white" onClick={()=>{
    signOut()
}}>Sign out</button>
:<button className="text-white" onClick={()=>{
    signIn()
}}>Sign In</button>}
</>
)
}
export default Appbar;