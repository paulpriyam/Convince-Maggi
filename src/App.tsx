import { useRef, useMemo } from "react";
import { Banana } from "./components/Banana";
import { Basket } from "./components/Basket";
import { HappinessMeter } from "./components/HappinessMeter";
import { Maggi } from "./components/Maggi";
import { SuccessModal } from "./components/SuccessModal";
import { useGameStore } from "./store/useGameStore";
import { cn } from "./lib/utils";

function App() {
  const basketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addHappiness, gameId } = useGameStore();

  // Generate bananas with random positions
  const bananas = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: `banana-${i}`,
    initialX: Math.random() * (window.innerWidth - 100) + 50,
    initialY: Math.random() * (window.innerHeight - 400) + 50, // Avoid bottom area
  })), [gameId]); // Re-generate only when gameId changes

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-pink-50 touch-none select-none">
      {/* Header / Meter */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-20 px-4">
        <HappinessMeter />
      </div>

      {/* Main Game Area */}
      <div className="relative w-full h-full">
        {/* Maggi (Bunny) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Maggi />
        </div>

        {/* Basket (Drop Target) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Basket ref={basketRef} />
        </div>

        {/* Bananas */}
        <div ref={containerRef} key={gameId} className="absolute inset-0 pointer-events-none">
          {bananas.map((banana) => (
            <Banana
              key={banana.id}
              id={banana.id}
              basketRef={basketRef}
              containerRef={containerRef}
              onDrop={() => addHappiness(10)}
              initialX={banana.initialX}
              initialY={banana.initialY}
              className="pointer-events-auto"
            />
          ))}
        </div>
      </div>

      {/* UI Overlay */}
      <SuccessModal />
      
      {/* Instructions */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-400 pointer-events-none hidden md:block">
        Drag bananas to the basket to make Maggi happy!
      </div>
    </div>
  );
}

export default App;
