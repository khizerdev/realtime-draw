import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  activeMenuItem: 'Pencil',
  actionMenuItem: null,
  menuItemClick: (value) => set(() => ({ activeMenuItem: value })),
  actionItemClick: (value) => set(() => ({ actionMenuItem: value })),
}));
