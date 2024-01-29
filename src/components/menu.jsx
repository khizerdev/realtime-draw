import { Download, Eraser, Pencil, Redo, Undo } from 'lucide-react';
import React from 'react';

const Menu = () => {
  return (
    <div className="flex gap-3">
      <button className="btn-icon">
        <Pencil size={18} />
      </button>
      <button className="btn-icon">
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
