"use client"

import { useRef, useState, useEffect } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import videos, { Video } from "./data/VideoList";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        playPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playing]);

  const configVideo = (index: number) => {
    const currentIndex = index % videos.length;
    setVideoIndex(currentIndex);
    setPlaying(false);
  }

  const configCurrentTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
  }

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;
    playing ? video.pause() : video.play();
    setPlaying(!playing);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-4">
      
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
  
        <div className="w-full lg:w-1/4 bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-700">
            <h2 className="text-white font-medium">Playlist</h2>
          </div>
          <div className="overflow-y-auto h-[500px]">
            {videos.map((video: Video, index) => (
              <button 
                key={index} 
                className={`w-full p-3 flex items-center gap-3 hover:bg-gray-700 transition ${videoIndex === index ? 'bg-gray-600' : ''}`}
                onClick={() => configVideo(index)}
              >
                <img src={video.image} className="w-16 h-12 object-cover rounded" />
                <span className="text-white text-sm text-left truncate">{video.description}</span>
              </button>
            ))}
          </div>
        </div>

      
        <div className="flex-1 flex flex-col">
        
          <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videos[videoIndex].url}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
              onEnded={() => setPlaying(false)}
            />
          </div>
       
          <div className="mt-4 bg-gray-800 rounded-lg p-4">
          
            <input
              type="range"
              min={0}
              max={videoRef.current?.duration || 0}
              step={0.01}
              value={currentTime}
              onChange={(e) => configCurrentTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />

            <div className="flex items-center justify-between mt-3">
              <span className="text-gray-300 text-sm">
                {formatTime(currentTime)}
              </span>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => configCurrentTime(currentTime - 10)}
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaBackward size={18} />
                </button>
                
                <button
                  onClick={playPause}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 transition"
                >
                  {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                
                <button
                  onClick={() => configCurrentTime(currentTime + 10)}
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaForward size={18} />
                </button>
              </div>
              
              <span className="text-gray-300 text-sm">
                {formatTime(videoRef.current?.duration || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}