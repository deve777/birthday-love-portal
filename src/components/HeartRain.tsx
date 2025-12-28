import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const HeartRain = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([]);
  const [isRaining, setIsRaining] = useState(false);
  const [totalHearts, setTotalHearts] = useState(0);

  const startRain = () => {
    if (isRaining) return;
    
    setIsRaining(true);
    const newHearts: typeof hearts = [];
    
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        size: 16 + Math.random() * 24,
        delay: Math.random() * 2,
      });
    }
    
    setHearts(prev => [...prev, ...newHearts]);
    setTotalHearts(prev => prev + 30);
    
    toast({
      title: "💕 Heart Shower!",
      description: `You've sent ${totalHearts + 30} hearts of love!`,
    });

    setTimeout(() => {
      setIsRaining(false);
    }, 3000);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-dreamy overflow-hidden min-h-[400px]">
      {/* Raining hearts */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, x: `${heart.x}%`, opacity: 1 }}
          animate={{ y: "100vh", opacity: 0 }}
          transition={{ duration: 3, delay: heart.delay, ease: "easeIn" }}
          className="absolute pointer-events-none"
          onAnimationComplete={() => {
            setHearts(prev => prev.filter(h => h.id !== heart.id));
          }}
        >
          <Heart 
            className="text-primary fill-primary"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}

      <div className="relative max-w-2xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Send Love Shower
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Make it rain hearts! 💕
          </p>
        </motion.div>

        <motion.button
          onClick={startRain}
          disabled={isRaining}
          className={cn(
            "relative px-10 py-5 rounded-full",
            "bg-gradient-romantic shadow-romantic",
            "font-body font-bold text-xl text-primary-foreground",
            "transition-all duration-300",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            !isRaining && "hover:shadow-glow hover:scale-105"
          )}
          whileHover={!isRaining ? { scale: 1.05 } : {}}
          whileTap={!isRaining ? { scale: 0.95 } : {}}
          animate={isRaining ? { scale: [1, 1.1, 1] } : {}}
          transition={isRaining ? { duration: 0.5, repeat: Infinity } : {}}
        >
          <span className="flex items-center gap-3">
            {isRaining ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin" />
                Raining Love!
                <Sparkles className="w-6 h-6 animate-spin" />
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                Make It Rain Hearts
                <Heart className="w-6 h-6 fill-current" />
              </>
            )}
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 font-body text-muted-foreground"
        >
          Total hearts sent: <span className="text-primary font-bold">{totalHearts}</span> 💕
        </motion.p>
      </div>
    </section>
  );
};

export default HeartRain;
