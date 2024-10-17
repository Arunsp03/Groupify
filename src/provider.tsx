
"use client"
import { SessionProvider } from "next-auth/react"
import React, { createContext, useState } from "react"
export const statecontext=createContext<any>(null);
const Providers=({children}:{children:React.ReactNode})=>{
  
    const [selectedstreamer,setSelectedStreamer]=useState("");

return(
    <SessionProvider>
    <statecontext.Provider value={{selectedstreamer,setSelectedStreamer}}>
        {children} 
    </statecontext.Provider>
    </SessionProvider>
)
}
export default Providers;