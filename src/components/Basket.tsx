import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface BasketProps {
  className?: string;
}

export const Basket = forwardRef<HTMLDivElement, BasketProps>(
  ({ className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex items-end justify-center w-32 h-32 bg-pink-200 rounded-b-3xl border-4 border-pink-400 shadow-lg",
          className
        )}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-6xl absolute bottom-4 select-none">🧺</span>
        <div className="absolute -top-10 left-0 w-full flex justify-center">
          {/* Bunny ears or handle */}
        </div>
      </motion.div>
    );
  }
);

Basket.displayName = "Basket";
