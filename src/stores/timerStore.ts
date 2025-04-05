
import { create } from "zustand";

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  setTimeRemaining: (time: number | ((prev: number) => number)) => void;
  startTimer: () => void;
  stopTimer: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timeRemaining: 0,
  isRunning: true,
  setTimeRemaining: (time) => set((state) => ({
    timeRemaining: typeof time === "function" ? time(state.timeRemaining) : time
  })),
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false })
}));
