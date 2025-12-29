import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Pause, Play, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Visualizer bars
  const bars = [1, 2, 3, 4, 5];

  // Play / Pause handler
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  // When song ends → reset state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/music/love-song.mp3"
        preload="auto"
      />

      {/* Floating music button */}
      <motion.button
        onClick={() => setShowPlayer(!showPlayer)}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-gradient-romantic shadow-romantic",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { rotate: [0, 360] } : {}}
        transition={
          isPlaying
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : {}
        }
      >
        <Music className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* Player panel */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: showPlayer ? 1 : 0,
          y: showPlayer ? 0 : 100,
          scale: showPlayer ? 1 : 0.8,
        }}
        className={cn(
          "fixed bottom-24 right-6 z-50",
          "w-64 p-4 rounded-2xl",
          "bg-card/95 backdrop-blur-md",
          "border-2 border-primary/20 shadow-romantic",
          !showPlayer && "pointer-events-none"
        )}
      >
        {/* Song info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-romantic flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground fill-current animate-bounce-soft" />
          </div>
          <div>
            <p className="font-body font-semibold text-foreground text-sm">
              Love Song
            </p>
            <p className="font-body text-xs text-muted-foreground">
              For My Birthday Queen 👑
            </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex items-end justify-center gap-1 h-12 mb-4">
          {bars.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-romantic rounded-full"
              animate={
                isPlaying
                  ? { height: [8, 32, 16, 40, 8] }
                  : { height: 8 }
              }
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-romantic flex items-center justify-center hover:shadow-glow transition-all"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            )}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          {isPlaying
            ? "💕 Playing love vibes..."
            : "Press play for love vibes!"}
        </p>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
