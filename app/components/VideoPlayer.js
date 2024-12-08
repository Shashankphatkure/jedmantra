'use client';

import { useState, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function VideoPlayer({ videoUrl, posterImage, isPreview = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterImage}
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        onError={(e) => console.error('Video error:', e)}
        controls={!isPreview}
      />
      
      {isPreview && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <PauseIcon className="h-20 w-20 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
          ) : (
            <PlayIcon className="h-20 w-20 text-white opacity-90 group-hover:opacity-100 transition-opacity transform group-hover:scale-110" />
          )}
        </button>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
} 