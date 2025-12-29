import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return;

    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every(c => !c)) {
      setAllBlown(true);
      setTimeout(() => {
        setShowWish(true);
        toast({
          title: "🎂 Make a Wish!",
          description: "All candles blown! Your wish will come true ✨",
        });
      }, 500);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Candles (scaled to fit cake) */}
      <div className="flex gap-3 mb-1 relative z-10">
        {candlesLit.map((isLit, index) => (
          <motion.button
            key={index}
            onClick={() => blowCandle(index)}
            className="relative cursor-pointer flex flex-col items-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, y: -12 }}
                  animate={{ y: [0, -1.5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="mb-0.5"
                >
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle */}
            <div className="w-2 h-8 bg-gradient-to-b from-champagne to-coral rounded-t-sm" />
          </motion.button>
        ))}
      </div>

      {/* Cake */}
      <div className="relative">
        {/* Top layer */}
        <motion.div
          className="w-44 h-10 bg-gradient-to-b from-rose to-primary rounded-t-xl mx-auto shadow-lg"
          animate={allBlown ? { scale: [1, 1.04, 1] } : {}}
        >
          <div className="absolute inset-x-4 top-1.5 h-1 bg-primary-foreground/30 rounded" />
        </motion.div>

        {/* Middle layer */}
        <motion.div
          className="w-56 h-14 bg-gradient-to-b from-coral to-champagne rounded-xl mx-auto shadow-lg -mt-1"
          animate={allBlown ? { scale: [1, 1.04, 1] } : {}}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute inset-x-5 top-2 h-1 bg-primary-foreground/30 rounded" />
          <div className="flex justify-around pt-5 px-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-primary" />
            ))}
          </div>
        </motion.div>

        {/* Bottom layer */}
        <motion.div
          className="w-72 h-16 bg-gradient-to-b from-secondary to-rose-light rounded-xl mx-auto shadow-lg -mt-1"
          animate={allBlown ? { scale: [1, 1.04, 1] } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-x-6 top-2 h-1 bg-primary-foreground/30 rounded" />
          <div className="flex justify-around pt-6 px-8">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-coral/50" />
            ))}
          </div>
        </motion.div>

        {/* Plate */}
        <div className="w-80 h-5 bg-gradient-to-b from-muted to-muted/50 rounded-full mx-auto shadow-md" />
      </div>

      {/* Wish Granted (centered below cake) */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-5 h-5 animate-sparkle" />
              <span className="font-display text-xl font-bold">
                Wish Granted!
              </span>
              <Sparkles className="w-5 h-5 animate-sparkle" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCake;
