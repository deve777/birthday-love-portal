import { useState } from "react";
import { Heart, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishCardProps {
  wish: string;
  icon: "heart" | "star" | "sparkle";
  delay?: number;
}

const WishCard = ({ wish, icon, delay = 0 }: WishCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const icons = {
    heart: Heart,
    star: Star,
    sparkle: Sparkles,
  };

  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "relative group cursor-pointer",
        "animate-fade-in-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative p-6 rounded-2xl",
          "bg-card/80 backdrop-blur-sm",
          "border-2 border-primary/20",
          "transition-all duration-500 ease-out",
          "hover:border-primary/50 hover:shadow-romantic",
          "transform hover:-translate-y-2",
          isHovered && "bg-rose-light/50"
        )}
      >
        {/* Decorative corner hearts */}
        <Heart 
          className={cn(
            "absolute -top-2 -right-2 w-6 h-6 text-primary fill-primary",
            "transition-transform duration-300",
            isHovered && "scale-125 animate-bounce-soft"
          )} 
        />
        
        <div className="flex items-start gap-4">
          <div 
            className={cn(
              "p-3 rounded-full bg-gradient-romantic",
              "transition-all duration-300",
              isHovered && "animate-pulse-glow"
            )}
          >
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          
          <p className="font-body text-foreground/90 text-lg leading-relaxed flex-1">
            {wish}
          </p>
        </div>

        {/* Sparkle decoration on hover */}
        {isHovered && (
          <>
            <Sparkles className="absolute top-4 left-4 w-4 h-4 text-gold animate-sparkle" />
            <Sparkles className="absolute bottom-4 right-12 w-3 h-3 text-coral animate-sparkle" style={{ animationDelay: "0.3s" }} />
          </>
        )}
      </div>
    </div>
  );
};

export default WishCard;
