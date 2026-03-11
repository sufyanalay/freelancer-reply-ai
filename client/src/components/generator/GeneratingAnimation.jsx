import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, MessageSquare, ShieldCheck, PenTool } from "lucide-react";

export function GeneratingAnimation() {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Analyzing client message...", icon: MessageSquare },
    { text: "Applying strategic tone...", icon: ShieldCheck },
    { text: "Crafting professional response...", icon: PenTool },
    { text: "Polishing details...", icon: Sparkles },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [steps.length]);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-6 text-muted-foreground">
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
        />
        <div className="w-16 h-16 bg-card border rounded-2xl shadow-xl flex items-center justify-center relative z-10">
          <motion.div
            key={step}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CurrentIcon className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.p
          key={step}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-medium text-foreground"
        >
          {steps[step].text}
        </motion.p>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}