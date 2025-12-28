import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);

    // Check if all candles are blown
    if (newCandles.every(c => !c)) {
      setAllBlown(true);
      setTimeout(() => {
        setShowWish(true);
        toast({
          title: "🎂 Make a Wish!",
          description: "All candles blown! Your wish will come true! ✨",
        });
      }, 500);
    }
  };

  const resetCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setAllBlown(false);
    setShowWish(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Candles */}
      <div className="flex gap-4 mb-2 relative z-10">
        {candlesLit.map((isLit, index) => (
          <motion.button
            key={index}
            onClick={() => blowCandle(index)}
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Candle stick */}
            <div className="w-3 h-12 bg-gradient-to-b from-champagne to-coral rounded-t-sm" />
            
            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0, y: -20 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                >
                  <Flame 
                    className="w-6 h-6 text-orange-400 fill-orange-300 animate-pulse drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to blow!
            </span>
          </motion.button>
        ))}
      </div>

      {/* Cake layers */}
      <div className="relative">
        {/* Top layer */}
        <motion.div 
          className="w-32 h-8 bg-gradient-to-b from-rose to-primary rounded-t-lg mx-auto shadow-lg"
          animate={allBlown ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-x-2 top-1 h-1 bg-primary-foreground/30 rounded" />
        </motion.div>
        
        {/* Middle layer */}
        <motion.div 
          className="w-40 h-10 bg-gradient-to-b from-coral to-champagne rounded-lg mx-auto shadow-lg -mt-1"
          animate={allBlown ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-x-3 top-2 h-1 bg-primary-foreground/30 rounded" />
          {/* Decorations */}
          <div className="flex justify-around pt-3 px-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary" />
            ))}
          </div>
        </motion.div>
        
        {/* Bottom layer */}
        <motion.div 
          className="w-48 h-12 bg-gradient-to-b from-secondary to-rose-light rounded-lg mx-auto shadow-lg -mt-1"
          animate={allBlown ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-x-4 top-2 h-1 bg-primary-foreground/30 rounded" />
          {/* Wave decoration */}
          <div className="flex justify-around pt-4 px-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-coral/50" />
            ))}
          </div>
        </motion.div>

        {/* Plate */}
        <div className="w-56 h-4 bg-gradient-to-b from-muted to-muted/50 rounded-full mx-auto shadow-md" />
      </div>

      {/* Wish reveal */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5 animate-sparkle" />
              <span className="font-display text-xl font-bold">Wish Granted!</span>
              <Sparkles className="w-5 h-5 animate-sparkle" />
            </div>
            <button 
              onClick={resetCandles}
              className="mt-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Light candles again?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCake;
