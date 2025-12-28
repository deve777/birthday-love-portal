import WishCard from "./WishCard";
import HeartDivider from "./HeartDivider";

const wishes = [
  { wish: "May your day be filled with endless love, laughter, and all the happiness your heart can hold!", icon: "heart" as const },
  { wish: "You deserve all the beautiful things life has to offer. Wishing you a magical year ahead!", icon: "star" as const },
  { wish: "Thank you for being the light of my life. Every moment with you is a gift!", icon: "sparkle" as const },
  { wish: "May all your dreams come true and may this new year bring you closer to everything you desire!", icon: "heart" as const },
  { wish: "You're not just my love, you're my best friend, my soulmate, and my everything. Happy Birthday, beautiful!", icon: "star" as const },
  { wish: "Here's to another year of adventures, laughter, and making beautiful memories together!", icon: "sparkle" as const },
];

const WishesSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-dreamy">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Birthday Wishes
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto">
            Every word comes straight from my heart to yours 💕
          </p>
        </div>

        <HeartDivider />

        {/* Wishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {wishes.map((wish, index) => (
            <WishCard
              key={index}
              wish={wish.wish}
              icon={wish.icon}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
