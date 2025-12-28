import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, X, Sparkles, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SurpriseBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  const handleShake = () => {
    if (!isOpen) {
      setShakeCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setTimeout(() => setIsOpen(true), 300);
        }
        return newCount;
      });
    }
  };

  const surprises = [
    { icon: Crown, text: "You're a queen!", color: "text-gold" },
    { icon: Heart, text: "Infinite love!", color: "text-primary" },
    { icon: Star, text: "You're a star!", color: "text-champagne" },
    { icon: Sparkles, text: "Pure magic!", color: "text-coral" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-soft overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Surprise Gift Box
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {!isOpen 
              ? `Click the box ${3 - shakeCount} more time${3 - shakeCount !== 1 ? 's' : ''} to open!` 
              : "Your surprises await! 🎁"}
          </p>
        </motion.div>

        <div className="relative inline-block">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="closed"
                onClick={handleShake}
                className={cn(
                  "relative p-12 rounded-2xl cursor-pointer",
                  "bg-gradient-romantic shadow-romantic",
                  "border-4 border-gold/50"
                )}
                animate={shakeCount > 0 ? {
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Ribbon */}
                <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gold/80" />
                <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-gold/80" />
                
                {/* Bow */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex gap-1">
                    <div className="w-8 h-6 bg-gold rounded-full -rotate-45" />
                    <div className="w-8 h-6 bg-gold rounded-full rotate-45" />
                  </div>
                  <div className="w-4 h-4 bg-gold rounded-full mx-auto -mt-2" />
                </div>

                <Gift className="w-16 h-16 text-primary-foreground relative z-10" />
                
                {/* Sparkles */}
                {shakeCount > 0 && (
                  <>
                    <Sparkles className="absolute top-2 right-2 w-6 h-6 text-gold animate-sparkle" />
                    <Sparkles className="absolute bottom-2 left-2 w-5 h-5 text-champagne animate-sparkle" style={{ animationDelay: "0.3s" }} />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="grid grid-cols-2 gap-4"
              >
                {surprises.map((surprise, index) => {
                  const Icon = surprise.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.15 }}
                      className={cn(
                        "p-6 rounded-2xl bg-card",
                        "border-2 border-primary/20",
                        "shadow-soft hover:shadow-romantic transition-all duration-300",
                        "cursor-pointer hover:scale-105"
                      )}
                    >
                      <Icon className={cn("w-10 h-10 mx-auto mb-2", surprise.color)} />
                      <p className="font-body font-semibold text-foreground">{surprise.text}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating particles when opening */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 1,
                      opacity: 1 
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300 - 100,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                  >
                    <Heart 
                      className="w-4 h-4 fill-current"
                      style={{ 
                        color: ['hsl(350, 80%, 65%)', 'hsl(15, 80%, 75%)', 'hsl(40, 70%, 55%)'][i % 3]
                      }}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setIsOpen(false);
              setShakeCount(0);
            }}
            className="mt-8 text-muted-foreground hover:text-primary transition-colors font-body"
          >
            Reset gift box?
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default SurpriseBox;
