import { create } from 'zustand';

export const useToolboxStore = create((set) => ({
  currentTool: {
    color: '#18181b',
    size: 3,
  },

  updateColor: (value) =>
    set((state) => ({
      currentTool: { ...state.currentTool, color: value },
    })),
  updateSize: (value) =>
    set((state) => ({
      currentTool: { ...state.currentTool, size: value },
    })),
}));
