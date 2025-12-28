import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}

const LoveButton = ({ children, onClick, variant = "primary", className }: LoveButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    
    // Create sparkle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setIsClicked(false);
      setSparkles([]);
    }, 600);

    onClick?.();
  };

  const variants = {
    primary: "bg-gradient-romantic text-primary-foreground hover:shadow-glow",
    secondary: "bg-secondary text-secondary-foreground border-2 border-primary/30 hover:border-primary",
    gold: "bg-gradient-to-r from-champagne to-gold text-foreground hover:shadow-romantic",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative px-8 py-4 rounded-full font-body font-semibold text-lg",
        "transition-all duration-300 ease-out",
        "transform hover:scale-105 active:scale-95",
        "overflow-hidden",
        variants[variant],
        isClicked && "animate-wiggle",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Heart className={cn("w-5 h-5", isClicked && "animate-bounce-soft fill-current")} />
        {children}
        <Heart className={cn("w-5 h-5", isClicked && "animate-bounce-soft fill-current")} />
      </span>
      
      {/* Sparkle effects */}
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute w-4 h-4 text-primary-foreground animate-sparkle pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
        />
      ))}
    </button>
  );
};

export default LoveButton;
