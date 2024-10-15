"use client"
import Appbar from '@/components/Appbar/Appbar';
import Queue from '@/components/Queue/Queue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {  useEffect } from 'react';
export default function Queueview() {
  const session=useSession();
  const router=useRouter();
  useEffect(()=>{
    if(!session.data?.user)
    {
      router.replace("/");
    }

  },[session])
  return (
  <div >
     <Appbar/>
    <Queue/>
    </div>
  );
}
