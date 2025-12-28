import { useState, useEffect } from "react";
import { Cake, Heart, Sparkles, Stars } from "lucide-react";
import LoveButton from "./LoveButton";
import CountdownHeart from "./CountdownHeart";
import { cn } from "@/lib/utils";

interface BirthdayHeroProps {
  name: string;
  onCelebrate?: () => void;
}

const BirthdayHero = ({ name, onCelebrate }: BirthdayHeroProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
  }, []);

  const handleCelebrate = () => {
    setShowConfetti(true);
    onCelebrate?.();
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Calculate years of love (example: could be customized)
  const yearsOfLove = "∞";
  const hugsGiven = "1000+";
  const kissesShared = "∞";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-soft" />
      
      {/* Large decorative hearts */}
      <Heart 
        className="absolute top-20 left-10 w-32 h-32 text-rose-light/30 fill-current animate-float" 
        style={{ animationDelay: "0s" }}
      />
      <Heart 
        className="absolute top-40 right-20 w-24 h-24 text-coral/20 fill-current animate-float" 
        style={{ animationDelay: "1s" }}
      />
      <Heart 
        className="absolute bottom-40 left-20 w-20 h-20 text-champagne/30 fill-current animate-float" 
        style={{ animationDelay: "2s" }}
      />

      {/* Sparkle decorations */}
      <Sparkles className="absolute top-32 right-1/4 w-8 h-8 text-gold animate-sparkle" />
      <Stars className="absolute top-1/4 left-1/4 w-6 h-6 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute bottom-1/3 right-1/3 w-6 h-6 text-coral animate-sparkle" style={{ animationDelay: "1s" }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Birthday cake icon */}
        <div 
          className={cn(
            "inline-flex items-center justify-center mb-6",
            "animate-bounce-soft"
          )}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <Cake className="relative w-16 h-16 text-primary" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-sparkle" />
          </div>
        </div>

        {/* Title */}
        <div 
          className={cn(
            "transition-all duration-1000 ease-out",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="text-gradient-romantic">Happy Birthday</span>
          </h1>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6">
            {name} 💕
          </h2>
        </div>

        {/* Subtitle */}
        <p 
          className={cn(
            "font-body text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto",
            "animate-fade-in-up opacity-0"
          )}
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          Today we celebrate the most beautiful soul in the world. 
          You make every day feel like magic! ✨
        </p>

        {/* Love stats in hearts */}
        <div 
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          <CountdownHeart label="Love" value={yearsOfLove} delay={700} />
          <CountdownHeart label="Hugs" value={hugsGiven} delay={900} />
          <CountdownHeart label="Kisses" value={kissesShared} delay={1100} />
        </div>

        {/* CTA Button */}
        <div 
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "1300ms", animationFillMode: "forwards" }}
        >
          <LoveButton onClick={handleCelebrate} variant="primary">
            Celebrate With Love
          </LoveButton>
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <Heart
              key={i}
              className="absolute animate-float-heart text-primary fill-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-50px",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                width: `${15 + Math.random() * 25}px`,
                height: `${15 + Math.random() * 25}px`,
                color: ['hsl(350, 80%, 65%)', 'hsl(15, 80%, 75%)', 'hsl(40, 70%, 55%)'][Math.floor(Math.random() * 3)],
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BirthdayHero;
