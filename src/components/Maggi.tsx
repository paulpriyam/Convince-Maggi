import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { cn } from "../lib/utils";

export const Maggi = ({ className }: { className?: string }) => {
  const { message, happiness } = useGameStore();
  const controls = useAnimation();

  useEffect(() => {
    // Jump when happiness increases (simple check on happiness change)
    if (happiness > 0) {
      controls.start({
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 },
      });
    }
  }, [happiness, controls]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Speech Bubble */}
      <motion.div
        className="bg-white px-6 py-4 rounded-2xl shadow-lg relative border-2 border-gray-100 max-w-[200px] text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={message} // Re-animate on message change
      >
        <p className="font-medium text-gray-700 text-sm md:text-base">{message}</p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-100 rotate-45 transform" />
      </motion.div>

      {/* Maggi the Bunny */}
      <motion.div
        animate={controls}
        className="text-8xl select-none cursor-pointer filter drop-shadow-md"
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
      >
        🐰
      </motion.div>
    </div>
  );
};
