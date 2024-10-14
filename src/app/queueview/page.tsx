
import Appbar from '@/components/Appbar/Appbar';
import Queue from '@/components/Queue/Queue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {  useEffect } from 'react';
// Extend the Window interface to include onYouTubeIframeAPIReady


export default function Queueview() {


  return (
  <div >
     <Appbar/>
    <Queue/>
    </div>
  );
}
