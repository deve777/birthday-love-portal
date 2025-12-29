import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const HeartRain = () => {
  const [hearts, setHearts] = useState<
    { id: number; x: number; drift: number; size: number; delay: number }[]
  >([]);
  const [isRaining, setIsRaining] = useState(false);
  const [totalHearts, setTotalHearts] = useState(0);
  const [sending, setSending] = useState(false);

  const startRain = () => {
    if (isRaining) return;

    setIsRaining(true);
    const newHearts = [];

    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,               // start anywhere
        drift: (Math.random() - 0.5) * 40,    // horizontal movement
        size: 16 + Math.random() * 24,
        delay: Math.random() * 1.5,
      });
    }

    setHearts(prev => [...prev, ...newHearts]);
    setTotalHearts(prev => prev + 30);

    toast({
      title: "💕 Heart Shower!",
      description: `You've sent ${totalHearts + 30} hearts of love!`,
    });

    setTimeout(() => setIsRaining(false), 3000);
  };

  // ✅ SEND HEART COUNT EMAIL
  const sendHeartCount = async () => {
    if (totalHearts === 0) return;

    setSending(true);

    try {
      await emailjs.send(
        "service_6q4to35",
        "template_evigund",
        { hearts: totalHearts },
        "mTW_GsJ9aYMictjvn"
      );

      toast({
        title: "💌 Hearts sent!",
        description: "I received your love shower ❤️",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error 😔",
        description: "Could not send hearts count",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-dreamy overflow-hidden min-h-[400px]">
      {/* Raining hearts */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, x: `${heart.x}%`, opacity: 1 }}
          animate={{
            y: "110vh",
            x: `${heart.x + heart.drift}%`,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: heart.delay,
            ease: "easeIn",
          }}
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

        {/* RAIN BUTTON */}
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
          whileTap={!isRaining ? { scale: 0.95 } : {}}
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

        {/* TOTAL + SEND BUTTON */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="font-body text-muted-foreground">
            Total hearts sent:{" "}
            <span className="text-primary font-bold">{totalHearts}</span> 💕
          </p>

          <button
            onClick={sendHeartCount}
            disabled={sending || totalHearts === 0}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-full",
              "bg-primary text-primary-foreground font-semibold",
              "transition-all",
              (sending || totalHearts === 0) &&
                "opacity-60 cursor-not-allowed"
            )}
          >
            {sending && <Loader2 className="w-4 h-4 animate-spin" />}
            {sending ? "Sending…" : "Send Hearts 💌"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeartRain;
