"use client"
import Appbar from '@/components/Appbar/Appbar';
import Queue from '@/components/Queue/Queue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {  useEffect } from 'react';
// Extend the Window interface to include onYouTubeIframeAPIReady


export default function Home() {

const session=useSession()
const router =useRouter();
useEffect(()=>{
if(session.data?.user)
{
  console.log("go to queueview")
  router .replace("/queueview");
}
},[session,router ])
  return (
  <div className='text-white'>
    <Appbar/>
    <div>Landing</div>
    </div>
  );
}
