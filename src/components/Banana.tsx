import { motion, useAnimation, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface BananaProps {
  id: string;
  basketRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  onDrop: () => void;
  className?: string;
  initialX?: number;
  initialY?: number;
}

export const Banana = ({
  id,
  basketRef,
  containerRef,
  onDrop,
  className,
  initialX = 0,
  initialY = 0,
}: BananaProps) => {
  const controls = useAnimation();
  const bananaRef = useRef<HTMLDivElement>(null);
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1, transition: { delay: Math.random() * 0.5 } });
  }, [controls]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!bananaRef.current || !basketRef.current) return;

    const dragDistance = Math.hypot(info.offset.x, info.offset.y);
    if (dragDistance < 8) {
      return;
    }

    const basketRect = basketRef.current.getBoundingClientRect();

    const isOverBasket =
      info.point.x >= basketRect.left &&
      info.point.x <= basketRect.right &&
      info.point.y >= basketRect.top &&
      info.point.y <= basketRect.bottom;

    if (isOverBasket) {
      onDrop();
      // Animate into the basket and disappear
      controls.start({
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }).then(() => {
        setIsDropped(true);
      });
    }
  };

  if (isDropped) return null;

  return (
    <motion.div
      ref={bananaRef}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      whileHover={{ scale: 1.2, cursor: "grab" }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={controls}
      onDragEnd={handleDragEnd}
      style={{ left: initialX, top: initialY }}
      className={cn("absolute text-4xl select-none z-10 touch-none cursor-grab active:cursor-grabbing", className)}
    >
      🍌
    </motion.div>
  );
};
