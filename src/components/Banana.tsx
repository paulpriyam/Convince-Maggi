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
  id: _id,
  basketRef,
  containerRef,
  onDrop,
  className,
  initialX = 0,
  initialY = 0,
}: BananaProps) => {
  const controls = useAnimation();
  const bananaRef = useRef<HTMLDivElement>(null);
  const dragStartedAt = useRef<{ x: number; y: number } | null>(null);
  const hasRealDrag = useRef(false);
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1, transition: { delay: Math.random() * 0.5 } });
  }, [controls]);

  const handleDragStart = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragStartedAt.current = { x: info.point.x, y: info.point.y };
    hasRealDrag.current = false;
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!dragStartedAt.current || hasRealDrag.current) return;
    const dx = info.point.x - dragStartedAt.current.x;
    const dy = info.point.y - dragStartedAt.current.y;
    hasRealDrag.current = Math.hypot(dx, dy) > 12;
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!bananaRef.current || !basketRef.current) return;

    if (!hasRealDrag.current) {
      controls.start({ x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.2 } });
      dragStartedAt.current = null;
      return;
    }

    const bananaRect = bananaRef.current.getBoundingClientRect();
    const basketRect = basketRef.current.getBoundingClientRect();

    const pointerInsideBasket =
      info.point.x >= basketRect.left &&
      info.point.x <= basketRect.right &&
      info.point.y >= basketRect.top &&
      info.point.y <= basketRect.bottom;

    const bananaCenterX = bananaRect.left + bananaRect.width / 2;
    const bananaCenterY = bananaRect.top + bananaRect.height / 2;
    const bananaCenterInsideBasket =
      bananaCenterX >= basketRect.left &&
      bananaCenterX <= basketRect.right &&
      bananaCenterY >= basketRect.top &&
      bananaCenterY <= basketRect.bottom;

    const isOverBasket = pointerInsideBasket && bananaCenterInsideBasket;

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
    } else {
      controls.start({ x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.2 } });
    }

    dragStartedAt.current = null;
    hasRealDrag.current = false;
  };

  if (isDropped) return null;

  return (
    <motion.div
      ref={bananaRef}
      drag
      dragConstraints={containerRef}
      dragSnapToOrigin
      dragElastic={0.2}
      whileHover={{ scale: 1.2, cursor: "grab" }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={controls}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ left: initialX, top: initialY }}
      className={cn("absolute text-4xl select-none z-10 touch-none cursor-grab active:cursor-grabbing", className)}
    >
      🍌
    </motion.div>
  );
};
