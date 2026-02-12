import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

type Props = {
  title: string;
  src: string;
  subtitle?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function StoryAudio({ title, src, subtitle }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(1, Math.max(0, current / duration));
  }, [current, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setIsReady(true);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const onTime = () => {
      setCurrent(audio.currentTime);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      // Some browsers block play until user gesture; button click counts as gesture,
      // but we’ll fail silently if something else prevents playback.
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const next = Number(e.target.value); // 0..1000
    const nextTime = (next / 1000) * duration;
    audio.currentTime = nextTime;
    setCurrent(nextTime);
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-100">{title}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-neutral-400">{subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950/60 p-3 text-neutral-100 hover:bg-neutral-900 disabled:opacity-50"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          disabled={!src}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="relative">
          {/* “Fill” bar (visual only) */}
          <div className="h-2 w-full rounded-full bg-neutral-800" />
          <div
            className="pointer-events-none absolute top-0 left-0 h-2 rounded-full bg-neutral-200/80"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Slider (interactive) */}
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={onSeek}
            className="absolute top-[-6px] left-0 h-5 w-full cursor-pointer appearance-none bg-transparent"
            aria-label="Seek audio"
            disabled={!isReady || !duration}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
          <span>{formatTime(current)}</span>
          <span>{duration ? formatTime(duration) : '--:--'}</span>
        </div>
      </div>

      {/* Hidden native audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
