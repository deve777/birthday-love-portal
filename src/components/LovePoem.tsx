import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText = ({ text, className, onComplete }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-primary ml-1"
        />
      )}
    </span>
  );
};

const LovePoem = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [started, setStarted] = useState(false);

  const poemLines = [
    "In a world full of chaos and noise,",
    "You are my peace, my calm, my joys.",
    "Every moment spent with you,",
    "Makes all my dreams come true.",
    "Happy Birthday, my heart, my soul,",
    "With you, I finally feel whole. 💕",
  ];

  const handleLineComplete = () => {
    if (currentLine < poemLines.length - 1) {
      setTimeout(() => setCurrentLine(prev => prev + 1), 300);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-dreamy">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4">
            A Poem For You
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Words written from my heart to yours
          </p>
        </motion.div>

        {!started ? (
          <motion.button
            onClick={() => setStarted(true)}
            className="group relative px-8 py-4 bg-gradient-romantic rounded-full font-body font-semibold text-lg text-primary-foreground shadow-romantic hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5 animate-bounce-soft" />
              Start Reading
              <Heart className="w-5 h-5 animate-bounce-soft" />
            </span>
          </motion.button>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-romantic">
            <div className="space-y-4 min-h-[280px]">
              {poemLines.slice(0, currentLine + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xl md:text-2xl text-foreground italic"
                >
                  {index === currentLine ? (
                    <TypewriterText
                      text={line}
                      onComplete={handleLineComplete}
                    />
                  ) : (
                    line
                  )}
                </motion.div>
              ))}
            </div>

            {currentLine === poemLines.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex justify-center gap-2"
              >
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-6 h-6 text-primary fill-primary animate-bounce-soft"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LovePoem;
