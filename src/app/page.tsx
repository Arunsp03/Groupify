"use client"
import Appbar from '@/components/Appbar/Appbar';
import Landing from '@/components/Landing/Landing';

import Queue from '@/components/Queue/Queue';
import ShowStreamers from '@/components/ShowStreamers/ShowStreamers';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {  useEffect } from 'react';
export default function Home() {
const session=useSession();
const router=useRouter();
  return (
  <div className='text-white'>
   
    <Appbar/>
    { session.data?.user ?
   <ShowStreamers/> :<Landing/>
    }
    </div>
  );
}