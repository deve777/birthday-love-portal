import FloatingHearts from "@/components/FloatingHearts";
import BirthdayHero from "@/components/BirthdayHero";
import WishesSection from "@/components/WishesSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import InteractiveSection from "@/components/InteractiveSection";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const handleCelebrate = () => {
    toast({
      title: "🎉 Happy Birthday!",
      description: "May all your wishes come true, my love! 💕",
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Hero section */}
      <BirthdayHero 
        name="My Love" 
        onCelebrate={handleCelebrate}
      />
      
      {/* Wishes section */}
      <WishesSection />
      
      {/* Love letter section */}
      <LoveLetterSection />
      
      {/* Interactive section */}
      <InteractiveSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
