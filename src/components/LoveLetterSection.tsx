import LoveMessage from "./LoveMessage";
import HeartDivider from "./HeartDivider";
import { Heart, Sparkles } from "lucide-react";

const LoveLetterSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-soft opacity-50" />
      
      {/* Floating decorations */}
      <Heart className="absolute top-10 right-10 w-16 h-16 text-rose-light/40 fill-current animate-float" />
      <Sparkles className="absolute bottom-20 left-10 w-10 h-10 text-gold/40 animate-sparkle" />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            A Love Letter For You
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto">
            Words from the depths of my heart 💌
          </p>
        </div>

        <HeartDivider />

        {/* Love message */}
        <div className="mt-12">
          <LoveMessage
            message="You are the reason I believe in magic. Your smile lights up my world, your laughter is my favorite melody, and your love is the greatest gift I've ever received. On this special day, I want you to know that you are cherished, adored, and loved beyond measure. Happy Birthday, my everything!"
            author="With all my love, forever and always"
          />
        </div>
      </div>
    </section>
  );
};

export default LoveLetterSection;
