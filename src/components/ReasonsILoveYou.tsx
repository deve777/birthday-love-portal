import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: string;
  back: string;
  delay?: number;
}

const FlipCard = ({ front, back, delay = 0 }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="perspective-1000"
    >
      <motion.div
        className={cn(
          "relative w-full h-48 cursor-pointer",
          "transform-style-3d transition-transform duration-700"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl p-6",
            "bg-gradient-romantic shadow-romantic",
            "flex flex-col items-center justify-center text-center",
            "backface-hidden"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heart className="w-10 h-10 text-primary-foreground mb-3 animate-bounce-soft" />
          <p className="font-display text-xl text-primary-foreground font-semibold">
            {front}
          </p>
          <p className="text-sm text-primary-foreground/70 mt-2 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl p-6",
            "bg-card border-2 border-primary/30 shadow-soft",
            "flex items-center justify-center text-center",
            "backface-hidden"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-body text-lg text-foreground leading-relaxed">
            {back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReasonsILoveYou = () => {
  const reasons = [
    { front: "Reason #1", back: "Your smile lights up my entire world and makes every bad day better 💫" },
    { front: "Reason #2", back: "The way you laugh at my terrible jokes (even when they're not funny) 😄" },
    { front: "Reason #3", back: "How you make ordinary moments feel like magical adventures ✨" },
    { front: "Reason #4", back: "Your kindness and the way you care for everyone around you 💕" },
    { front: "Reason #5", back: "The way you look at me like I'm your whole universe 🌟" },
    { front: "Reason #6", back: "Simply because you're YOU - perfect in every way! 👑" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-soft">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Reasons I Love You
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Tap each card to reveal why you're so special 💝
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <FlipCard
              key={index}
              front={reason.front}
              back={reason.back}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsILoveYou;
