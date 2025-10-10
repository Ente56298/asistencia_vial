import { useState, useRef, useEffect } from 'react';

interface MediaPlayerProps {
  type: 'audio' | 'video';
  sources: {
    src?: string;
    mp4?: string;
    mp3?: string;
    webm?: string;
    ogg?: string;
  };
  autoplay?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  poster?: string;
  width?: number;
  height?: number;
}

export default function MediaPlayer({
  type,
  sources,
  autoplay = false,
  loop = false,
  preload = 'metadata',
  poster,
  width = 640,
  height = 360
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleTimeUpdate = () => setCurrentTime(media.currentTime);
    const handleDurationChange = () => setDuration(media.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('durationchange', handleDurationChange);
    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);

    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('durationchange', handleDurationChange);
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = mediaRef.current;
    if (!media) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = mediaRef.current;
    const newVolume = parseFloat(e.target.value) / 100;
    
    if (media) {
      media.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderSources = () => {
    const sourceElements = [];
    
    if (sources.src) {
      const ext = sources.src.split('.').pop()?.toLowerCase();
      const mimeTypes: {[key: string]: string} = {
        mp4: 'video/mp4',
        webm: 'video/webm',
        ogv: 'video/ogg',
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav'
      };
      
      sourceElements.push(
        <source key="src" src={sources.src} type={mimeTypes[ext || ''] || ''} />
      );
    }

    if (sources.mp4) {
      sourceElements.push(
        <source key="mp4" src={sources.mp4} type="video/mp4" />
      );
    }

    if (sources.mp3) {
      sourceElements.push(
        <source key="mp3" src={sources.mp3} type="audio/mpeg" />
      );
    }

    if (sources.webm) {
      sourceElements.push(
        <source key="webm" src={sources.webm} type="video/webm" />
      );
    }

    if (sources.ogg) {
      sourceElements.push(
        <source key="ogg" src={sources.ogg} type={type === 'video' ? 'video/ogg' : 'audio/ogg'} />
      );
    }

    return sourceElements;
  };

  if (type === 'video') {
    return (
      <div className="media-player bg-black rounded-lg overflow-hidden">
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          width={width}
          height={height}
          poster={poster}
          preload={preload}
          autoPlay={autoplay}
          loop={loop}
          className="w-full h-auto"
        >
          {renderSources()}
          Tu navegador no soporta el elemento de video.
        </video>
        
        {/* Custom Controls */}
        <div className="bg-gray-900 p-4">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="media-player bg-gray-800 rounded-lg p-6">
      <audio
        ref={mediaRef as React.RefObject<HTMLAudioElement>}
        preload={preload}
        autoPlay={autoplay}
        loop={loop}
        className="hidden"
      >
        {renderSources()}
        Tu navegador no soporta el elemento de audio.
      </audio>
      
      {/* Audio Controls */}
      <div className="text-center">
        <div className="text-4xl mb-4">🎵</div>
        
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={togglePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full text-xl"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
        
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="flex justify-between items-center text-white text-sm mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <span className="text-white">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}