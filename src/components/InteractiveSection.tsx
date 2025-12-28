import { useState } from "react";
import { Heart, Gift, Music, Camera, Star, Sparkles } from "lucide-react";
import LoveButton from "./LoveButton";
import HeartDivider from "./HeartDivider";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const interactiveItems = [
  { icon: Heart, label: "Send Love", message: "Sending you infinite love! 💕", color: "text-primary" },
  { icon: Gift, label: "Open Gift", message: "You are my greatest gift! 🎁", color: "text-coral" },
  { icon: Music, label: "Play Song", message: "You're my favorite song! 🎵", color: "text-gold" },
  { icon: Camera, label: "Memories", message: "Every moment with you is precious! 📸", color: "text-champagne" },
];

const InteractiveSection = () => {
  const [clickedItems, setClickedItems] = useState<Set<number>>(new Set());
  const [showSurprise, setShowSurprise] = useState(false);

  const handleItemClick = (index: number, message: string) => {
    const newClicked = new Set(clickedItems);
    newClicked.add(index);
    setClickedItems(newClicked);

    toast({
      title: "💕 Love Message",
      description: message,
    });

    if (newClicked.size === interactiveItems.length && !showSurprise) {
      setShowSurprise(true);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-dreamy overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Interactive Love
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto">
            Click each button to unlock special messages! 🎉
          </p>
        </div>

        <HeartDivider />

        {/* Interactive buttons grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {interactiveItems.map((item, index) => {
            const Icon = item.icon;
            const isClicked = clickedItems.has(index);
            
            return (
              <button
                key={index}
                onClick={() => handleItemClick(index, item.message)}
                className={cn(
                  "relative group p-6 rounded-2xl",
                  "bg-card/80 backdrop-blur-sm",
                  "border-2 transition-all duration-500",
                  "hover:scale-105 active:scale-95",
                  isClicked 
                    ? "border-primary shadow-romantic bg-rose-light/30" 
                    : "border-primary/20 hover:border-primary/50",
                  "animate-fade-in-up opacity-0"
                )}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className={cn(
                      "p-4 rounded-full transition-all duration-300",
                      isClicked 
                        ? "bg-gradient-romantic" 
                        : "bg-muted group-hover:bg-gradient-romantic"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "w-8 h-8 transition-colors duration-300",
                        isClicked 
                          ? "text-primary-foreground" 
                          : cn(item.color, "group-hover:text-primary-foreground")
                      )} 
                    />
                  </div>
                  <span className="font-body font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>

                {/* Checkmark for clicked items */}
                {isClicked && (
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-6 h-6 text-gold fill-gold animate-bounce-soft" />
                  </div>
                )}

                {/* Sparkle effect */}
                {isClicked && (
                  <Sparkles className="absolute top-2 left-2 w-4 h-4 text-gold animate-sparkle" />
                )}
              </button>
            );
          })}
        </div>

        {/* Surprise reveal */}
        {showSurprise && (
          <div 
            className={cn(
              "mt-12 text-center animate-scale-in",
              "p-8 rounded-3xl bg-gradient-romantic shadow-glow"
            )}
          >
            <Sparkles className="inline-block w-10 h-10 text-primary-foreground mb-4 animate-sparkle" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              You unlocked all the love! 🎉
            </h3>
            <p className="font-body text-lg text-primary-foreground/90 mb-6">
              You're officially the queen of my heart forever! 👑
            </p>
            <LoveButton variant="gold">
              You're Amazing!
            </LoveButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSection;
