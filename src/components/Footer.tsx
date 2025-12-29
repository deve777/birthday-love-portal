import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 bg-gradient-soft overflow-hidden">
      {/* Background decorations */}
      <Heart className="absolute bottom-10 left-10 w-20 h-20 text-rose-light/20 fill-current animate-float" />
      <Heart className="absolute top-10 right-20 w-16 h-16 text-coral/20 fill-current animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="relative max-w-2xl mx-auto text-center">
        {/* Hearts decoration */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-6 h-6 text-primary fill-primary animate-bounce-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient-romantic mb-4">
          Forever & Always
        </h3>
        
        <p className="font-body text-lg text-muted-foreground mb-8">
          Made with infinite love, just for My Queen 👸💕
        </p>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <span className="font-body">Happy Birthday, My Baby</span>
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-sparkle" />
          <span className="font-body text-sm text-muted-foreground">
            {new Date().getFullYear()} • Created with 💕
          </span>
          <Sparkles className="w-4 h-4 text-gold animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
