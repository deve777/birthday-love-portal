import FloatingHearts from "@/components/FloatingHearts";
import BirthdayHero from "@/components/BirthdayHero";
import WishesSection from "@/components/WishesSection";
import CakeSection from "@/components/CakeSection";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import LovePoem from "@/components/LovePoem";
import SurpriseBox from "@/components/SurpriseBox";
import WishingStar from "@/components/WishingStar";
import HeartRain from "@/components/HeartRain";
import LoveLetterSection from "@/components/LoveLetterSection";
import InteractiveSection from "@/components/InteractiveSection";
import MusicPlayer from "@/components/MusicPlayer";
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
      
      {/* Music player */}
      <MusicPlayer />
      
      {/* Hero section */}
      <BirthdayHero 
        name="Simmu" 
        onCelebrate={handleCelebrate}
      />

      {/* Cake section */}
      <CakeSection />
      
      {/* Wishes section */}
      <WishesSection />

      {/* Reasons I love you flip cards */}
      <ReasonsILoveYou />

      {/* Love poem with typewriter */}
      <LovePoem />

      {/* Surprise gift box */}
      <SurpriseBox />

      {/* Wishing star */}
      <WishingStar />

      {/* Heart rain */}
      <HeartRain />
      
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
