"use client"
import Appbar from '@/components/Appbar/Appbar';
import Landing from '@/components/Landing/Landing';
import Queue from '@/components/Queue/Queue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {  useEffect } from 'react';
export default function Queueview() {
  const session:any=useSession();
  const router=useRouter();
  useEffect(()=>{
   // console.log("isauth",session.data.user);
    if(!session.data?.user?.isauthenticated)
    {
      router.push("/")
    }
  },[session])
  return (
  <div >
    
     <Appbar/>
     { session.data?.user &&
    <Queue/>
    }
    </div>
  );
}
