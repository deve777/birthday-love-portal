import { useState } from "react";
import { Heart, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoveMessageProps {
  message: string;
  author?: string;
}

const LoveMessage = ({ message, author }: LoveMessageProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-dreamy rounded-3xl transform rotate-1" />
      <div className="absolute inset-0 bg-gradient-dreamy rounded-3xl transform -rotate-1 opacity-50" />
      
      <div
        className={cn(
          "relative p-8 md:p-12 rounded-3xl",
          "bg-card/90 backdrop-blur-md",
          "border-2 border-primary/30",
          "shadow-romantic",
          "transition-all duration-700",
          isRevealed ? "scale-100" : "scale-95"
        )}
      >
        {/* Quote icon */}
        <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/30 transform -scale-x-100" />
        <Quote className="absolute bottom-4 right-4 w-8 h-8 text-primary/30" />

        {/* Hearts decoration */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Heart className="w-6 h-6 text-primary fill-primary animate-float" />
          <Heart className="w-8 h-8 text-coral fill-coral animate-float" style={{ animationDelay: "0.5s" }} />
          <Heart className="w-6 h-6 text-primary fill-primary animate-float" style={{ animationDelay: "1s" }} />
        </div>

        {/* Content */}
        <div className="text-center pt-4">
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className={cn(
                "group flex flex-col items-center gap-4 mx-auto",
                "transition-all duration-300"
              )}
            >
              <div className="relative">
                <Heart 
                  className="w-20 h-20 text-primary animate-pulse-glow cursor-pointer transition-transform hover:scale-110" 
                  fill="currentColor"
                />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gold animate-sparkle" />
              </div>
              <span className="font-display text-xl text-primary italic">
                Click to reveal my heart...
              </span>
            </button>
          ) : (
            <div className="animate-fade-in-up">
              <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed italic">
                "{message}"
              </p>
              {author && (
                <p className="mt-6 font-body text-lg text-muted-foreground">
                  — {author}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Floating sparkles when revealed */}
        {isRevealed && (
          <>
            <Sparkles className="absolute top-1/4 left-8 w-5 h-5 text-gold animate-sparkle" />
            <Sparkles className="absolute top-1/3 right-8 w-4 h-4 text-coral animate-sparkle" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="absolute bottom-1/4 left-12 w-4 h-4 text-champagne animate-sparkle" style={{ animationDelay: "1s" }} />
          </>
        )}
      </div>
    </div>
  );
};

export default LoveMessage;
