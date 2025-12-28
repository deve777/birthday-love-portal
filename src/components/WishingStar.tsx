import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const WishingStar = () => {
  const [isWishing, setIsWishing] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [shootingStars, setShootingStars] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWishing && holdProgress < 100) {
      interval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            setIsWishing(false);
            setWishGranted(true);
            
            // Create shooting stars
            const stars = Array.from({ length: 8 }, (_, i) => ({
              id: Date.now() + i,
              x: Math.random() * 100,
              delay: Math.random() * 0.5,
            }));
            setShootingStars(stars);
            
            toast({
              title: "⭐ Wish Upon a Star!",
              description: "Your birthday wish has been sent to the stars! ✨",
            });
            
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isWishing, holdProgress]);

  const handleMouseDown = () => {
    if (!wishGranted) {
      setIsWishing(true);
    }
  };

  const handleMouseUp = () => {
    if (holdProgress < 100) {
      setIsWishing(false);
      setHoldProgress(0);
    }
  };

  const resetWish = () => {
    setWishGranted(false);
    setHoldProgress(0);
    setShootingStars([]);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[hsl(240,30%,15%)] to-[hsl(260,40%,20%)] overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-foreground/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map(star => (
          <motion.div
            key={star.id}
            initial={{ x: `${star.x}%`, y: -20, opacity: 1 }}
            animate={{ x: `${star.x + 30}%`, y: "100vh", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: star.delay }}
            className="absolute"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Wish Upon a Star
          </h2>
          <p className="font-body text-lg text-primary-foreground/70 mb-12">
            Hold the star to make a birthday wish come true ⭐
          </p>
        </motion.div>

        {/* Interactive star */}
        <div className="relative inline-block">
          <motion.button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className={cn(
              "relative p-8 rounded-full",
              "bg-gradient-to-br from-gold/20 to-champagne/20",
              "border-2 border-gold/50",
              "transition-all duration-300",
              "cursor-pointer select-none",
              wishGranted && "pointer-events-none"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isWishing ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isWishing ? Infinity : 0 }}
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="3"
                strokeDasharray={`${holdProgress * 2.83} 283`}
                className="transition-all duration-100"
              />
            </svg>

            <Star 
              className={cn(
                "w-20 h-20 transition-all duration-300",
                wishGranted 
                  ? "text-gold fill-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]" 
                  : "text-gold/70 hover:text-gold"
              )}
            />

            {isWishing && (
              <Sparkles className="absolute top-2 right-2 w-6 h-6 text-gold animate-sparkle" />
            )}
          </motion.button>

          {/* Glow effect */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full blur-2xl transition-opacity duration-500",
              wishGranted ? "bg-gold/40 opacity-100" : "bg-gold/20 opacity-0"
            )} 
          />
        </div>

        {/* Status text */}
        <motion.p
          className="mt-8 font-body text-primary-foreground/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {wishGranted 
            ? "✨ Your wish is written in the stars! ✨" 
            : isWishing 
              ? "Keep holding... making wish magic! ✨" 
              : "Touch and hold the star..."}
        </motion.p>

        {wishGranted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={resetWish}
            className="mt-4 text-sm text-gold/70 hover:text-gold transition-colors"
          >
            Make another wish?
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default WishingStar;
