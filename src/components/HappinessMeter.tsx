import { motion } from "framer-motion";
import { useGameStore } from "../store/useGameStore";
import { cn } from "../lib/utils";

export const HappinessMeter = ({ className }: { className?: string }) => {
  const { happiness } = useGameStore();

  return (
    <div className={cn("flex flex-col items-center w-full max-w-md gap-2", className)}>
      <div className="flex justify-between w-full px-2 text-sm font-bold text-pink-600">
        <span>Happiness</span>
        <span>{happiness}%</span>
      </div>
      <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full flex items-center justify-end px-2"
          initial={{ width: 0 }}
          animate={{ width: `${happiness}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {happiness > 10 && <span className="text-xs text-white">❤️</span>}
        </motion.div>
      </div>
    </div>
  );
};
