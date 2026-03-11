import { create } from 'zustand';

interface GameState {
  happiness: number;
  message: string;
  isSuccess: boolean;
  gameId: number;
  addHappiness: (amount: number) => void;
  resetGame: () => void;
}

const getMessage = (happiness: number) => {
  if (happiness >= 100) return "Maggi approved your request!";
  if (happiness >= 70) return "Maggi is considering it...";
  if (happiness >= 30) return "Maggi chewed the paperwork.";
  return "Maggi is sniffing your proposal...";
};

export const useGameStore = create<GameState>((set) => ({
  happiness: 0,
  message: "Maggi is sniffing your proposal...",
  isSuccess: false,
  gameId: 0,
  addHappiness: (amount) =>
    set((state) => {
      const newHappiness = Math.min(state.happiness + amount, 100);
      return {
        happiness: newHappiness,
        message: getMessage(newHappiness),
        isSuccess: newHappiness >= 100,
      };
    }),
  resetGame: () =>
    set((state) => ({
      happiness: 0,
      message: "Maggi is sniffing your proposal...",
      isSuccess: false,
      gameId: state.gameId + 1,
    })),
}));
