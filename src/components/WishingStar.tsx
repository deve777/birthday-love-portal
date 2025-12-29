import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const WishingStar = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wish, setWish] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [sending, setSending] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const [shootingStars, setShootingStars] = useState<
    { id: number; x: number; delay: number }[]
  >([]);

  /* HOLD LOGIC */
  useEffect(() => {
    if (isHolding && progress < 100 && !completed) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            window.clearInterval(intervalRef.current!);
            setCompleted(true);
            triggerCompletion();
            return 100;
          }
          return prev + 2;
        });
      }, 40);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isHolding]);

  const triggerCompletion = () => {
    setShowInput(true);

    setShootingStars(
      Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
      }))
    );

    toast({
      title: "⭐ Wish made!",
      description: "Now write your wish… ✨",
    });
  };

  const handleRelease = () => {
    if (!completed) {
      setIsHolding(false);
      setProgress(0);
    }
  };

  /* SEND WISH */
  const sendWish = async () => {
    if (!wish.trim()) {
      toast({
        title: "Write something ✨",
        description: "Your wish can’t be empty 💕",
      });
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        "service_6q4to35",
        "template_scdba6p",
        { wish },
        "mTW_GsJ9aYMictjvn"
      );

      toast({
        title: "💌 Wish sent!",
        description: "I received your wish ❤️",
      });

      setShowInput(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error 😔",
        description: "Wish could not be sent",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[hsl(240,30%,15%)] to-[hsl(260,40%,20%)] overflow-hidden">
      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map(star => (
          <motion.div
            key={star.id}
            initial={{ x: `${star.x}%`, y: -50 }}
            animate={{ y: "110vh", opacity: 0 }}
            transition={{ duration: 1.2, delay: star.delay }}
            className="absolute"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Wish Upon a Star
        </h2>
        <p className="text-primary-foreground/70 mb-10">
          Hold the star to make your birthday wish ⭐
        </p>

        {/* STAR */}
        <motion.button
          onMouseDown={() => !completed && setIsHolding(true)}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => !completed && setIsHolding(true)}
          onTouchEnd={handleRelease}
          className={cn(
            "relative p-10 rounded-full",
            "bg-gradient-to-br from-gold/20 to-champagne/20",
            "border-2 border-gold/60",
            "cursor-pointer select-none"
          )}
          whileTap={{ scale: 0.95 }}
        >
          {/* PERFECT PROGRESS RING */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="hsl(var(--gold))"
              strokeWidth="4"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={
                CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE
              }
              strokeLinecap="round"
            />
          </svg>

          <Star
            className={cn(
              "w-20 h-20 transition-all",
              completed
                ? "text-gold fill-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.9)]"
                : "text-gold/70"
            )}
          />

          {isHolding && (
            <Sparkles className="absolute top-2 right-2 text-gold" />
          )}
        </motion.button>

        {/* INPUT */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-card p-6 rounded-2xl shadow-romantic max-w-md mx-auto"
            >
              <p className="font-display text-xl mb-3">
                Write your wish ✨
              </p>
              <textarea
                value={wish}
                onChange={e => setWish(e.target.value)}
                className="w-full rounded-xl border p-3 mb-4"
                rows={3}
                placeholder="My wish is..."
              />

              <button
                onClick={sendWish}
                disabled={sending}
                className={cn(
                  "flex items-center justify-center gap-2 w-full",
                  "bg-gradient-romantic text-white px-6 py-2 rounded-full",
                  sending && "opacity-70 cursor-not-allowed"
                )}
              >
                {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                {sending ? "Sending…" : "Send my wish 💖"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WishingStar;
