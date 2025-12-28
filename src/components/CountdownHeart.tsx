import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownHeartProps {
  label: string;
  value: string | number;
  delay?: number;
}

const CountdownHeart = ({ label, value, delay = 0 }: CountdownHeartProps) => {
  return (
    <div 
      className="relative animate-scale-in opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Heart shape container */}
      <div className="relative group cursor-pointer">
        <Heart 
          className={cn(
            "w-24 h-24 md:w-28 md:h-28 text-primary fill-primary",
            "transition-all duration-300 ease-out",
            "group-hover:scale-110 group-hover:fill-coral group-hover:text-coral",
            "drop-shadow-lg"
          )}
        />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
          <span className="font-display text-2xl md:text-3xl font-bold">
            {value}
          </span>
          <span className="font-body text-xs md:text-sm font-medium uppercase tracking-wider">
            {label}
          </span>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 group-hover:bg-coral/30 transition-colors duration-300" />
    </div>
  );
};

export default CountdownHeart;
