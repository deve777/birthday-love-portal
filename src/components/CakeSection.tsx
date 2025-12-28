import { useState } from "react";
import { motion } from "framer-motion";
import BirthdayCake from "./BirthdayCake";
import HeartDivider from "./HeartDivider";
import { Sparkles } from "lucide-react";

const CakeSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-soft overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-gold/30 animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            Blow the Candles!
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Click each candle to blow it out and make a wish! 🎂
          </p>
        </motion.div>

        <HeartDivider />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <BirthdayCake />
        </motion.div>
      </div>
    </section>
  );
};

export default CakeSection;
