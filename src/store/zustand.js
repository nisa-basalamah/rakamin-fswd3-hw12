import { create } from "zustand";

const useStore = create((set) => ({
  squares: Array(9).fill(null),
  winner: null,
  status: "Tic Tac Toe!",
  setSquares: (newSquares) => set(() => ({ squares: newSquares })),
  setWinner: (newWinner) => set(() => ({ winner: newWinner })),
  setStatus: (newStatus) => set(() => ({ status: newStatus })),
  restart: () =>
    set(() => ({
      squares: Array(9).fill(null),
      winner: null,
      status: "Tic Tac Toe!",
    })),
}));

export default useStore;
