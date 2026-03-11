import { motion } from "framer-motion";
import { useGameStore } from "../store/useGameStore";

export const SuccessModal = () => {
  const { isSuccess, resetGame } = useGameStore();

  if (!isSuccess) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border-4 border-pink-300 relative overflow-hidden"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 12 }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300" />
        
        <motion.div 
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🎉🐰🍌
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment Granted!</h2>
        <p className="text-gray-600 mb-6">
          Maggi is sufficiently pleased with your banana offering. You may now schedule your call.
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg"
            onClick={() => window.alert("Redirecting to calendar... (Mock action)")}
          >
            Book Now
          </button>
          
          <button 
            className="text-sm text-gray-400 hover:text-gray-600 underline"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
