import { useRef, useMemo, useState, useEffect } from "react";
import { Banana } from "./components/Banana";
import { Basket } from "./components/Basket";
import { HappinessMeter } from "./components/HappinessMeter";
import { Maggi } from "./components/Maggi";
import { SuccessModal } from "./components/SuccessModal";
import { useGameStore } from "./store/useGameStore";

type FoodType = "banana" | "carrot" | "chocolate";

const FOOD_META: Record<FoodType, { emoji: string; points: number; label: string }> = {
  banana: { emoji: "🍌", points: 10, label: "Banana" },
  carrot: { emoji: "🥕", points: 5, label: "Carrot" },
  chocolate: { emoji: "🍫", points: -10, label: "Chocolate" },
};

interface FoodItem {
  id: string;
  type: FoodType;
  initialX: number;
  initialY: number;
}

const randomPosition = () => ({
  initialX: Math.random() * (window.innerWidth - 100) + 50,
  initialY: Math.random() * (window.innerHeight - 400) + 50,
});

function App() {
  const basketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addHappiness, gameId } = useGameStore();
  const [items, setItems] = useState<FoodItem[]>(
    Array.from({ length: 12 }).map((_, i) => ({
      id: `banana-${i}`,
      type: "banana",
      ...randomPosition(),
    })),
  );

  useEffect(() => {
    setItems(
      Array.from({ length: 12 }).map((_, i) => ({
        id: `banana-${gameId}-${i}`,
        type: "banana",
        ...randomPosition(),
      })),
    );
  }, [gameId]);

  const addItem = (type: FoodType) => {
    setItems((prev) => [
      ...prev,
      {
        id: `${type}-${crypto.randomUUID()}`,
        type,
        ...randomPosition(),
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const counts = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.type] += 1;
          return acc;
        },
        { banana: 0, carrot: 0, chocolate: 0 } as Record<FoodType, number>,
      ),
    [items],
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-pink-50 touch-none select-none">
      <div className="absolute top-8 left-0 w-full flex justify-center z-20 px-4">
        <HappinessMeter />
      </div>

      <div className="absolute top-24 left-4 z-30 bg-white/90 backdrop-blur px-4 py-3 rounded-2xl shadow-lg border border-pink-200 text-sm">
        <p className="font-semibold text-gray-700 mb-2">Choose treats</p>
        <div className="space-y-2">
          {(Object.keys(FOOD_META) as FoodType[]).map((foodType) => (
            <div key={foodType} className="flex items-center justify-between gap-3">
              <span className="min-w-28">{FOOD_META[foodType].emoji} {FOOD_META[foodType].label}: {counts[foodType]}</span>
              <button
                className="px-2 py-1 rounded bg-pink-500 text-white font-bold leading-none hover:bg-pink-600"
                onClick={() => addItem(foodType)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full h-full">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Maggi />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Basket ref={basketRef} />
        </div>

        <div ref={containerRef} key={gameId} className="absolute inset-0 pointer-events-none">
          {items.map((item) => (
            <Banana
              key={item.id}
              id={item.id}
              basketRef={basketRef}
              containerRef={containerRef}
              onDrop={() => {
                addHappiness(FOOD_META[item.type].points);
                removeItem(item.id);
              }}
              initialX={item.initialX}
              initialY={item.initialY}
              emoji={FOOD_META[item.type].emoji}
              className="pointer-events-auto"
            />
          ))}
        </div>
      </div>

      <SuccessModal />

      <div className="absolute bottom-2 right-4 text-xs text-gray-400 pointer-events-none hidden md:block">
        Drag treats anywhere. Drop them in the basket to apply points.
      </div>
    </div>
  );
}

export default App;
