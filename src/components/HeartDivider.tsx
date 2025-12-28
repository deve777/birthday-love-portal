import { Heart } from "lucide-react";

const HeartDivider = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-primary/50" />
      <Heart className="w-6 h-6 text-primary fill-primary animate-bounce-soft" />
      <Heart className="w-8 h-8 text-coral fill-coral animate-bounce-soft" style={{ animationDelay: "0.2s" }} />
      <Heart className="w-6 h-6 text-primary fill-primary animate-bounce-soft" style={{ animationDelay: "0.4s" }} />
      <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
};

export default HeartDivider;
