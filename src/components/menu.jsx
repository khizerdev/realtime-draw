import { Download, Eraser, Pencil, Redo, Undo } from 'lucide-react';
import React from 'react';
import { useMenuStore } from '../store/use-menu';

const Menu = () => {
  const menuItemClick = useMenuStore((state) => state.menuItemClick);
  const activeMenuItem = useMenuStore((state) => state.activeMenuItem);
  const isPencilSelected = activeMenuItem === 'Pencil';
  const isEraserSelected = activeMenuItem === 'Eraser';

  return (
    <div className="flex gap-3">
      <button
        className={`btn-icon ${isPencilSelected ? 'bg-[#f4f4f5]' : ''}`}
        onClick={() => menuItemClick('Pencil')}
      >
        <Pencil size={18} />
      </button>
      <button
        className={`btn-icon ${isEraserSelected ? 'bg-[#f4f4f5]' : ''}`}
        onClick={() => menuItemClick('Eraser')}
      >
        <Eraser size={18} />
      </button>
      <button className="btn-icon">
        <Undo size={18} />
      </button>
      <button className="btn-icon">
        <Redo size={18} />
      </button>
      <button className="btn-icon">
        <Download size={18} />
      </button>
    </div>
  );
};

export default Menu;
