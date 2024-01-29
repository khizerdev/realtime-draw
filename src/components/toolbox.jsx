import React from 'react';
import { useMenuStore } from '../store/use-menu';

const Toolbox = () => {
  const currentActiveItem = useMenuStore((state) => state.activeMenuItem);
  const isPencilSelected = currentActiveItem === 'Pencil';
  return (
    <div className="p-3 flex rounded-s-lg gap-10">
      <div className={`flex gap-1 ${!isPencilSelected ? 'invisible' : ''}`}>
        <button className="btn-color">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]"></span>
        </button>
        <button className="btn-color">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e11d48]"></span>
        </button>
        <button className="btn-color">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb]"></span>
        </button>
        <button className="btn-color">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#16a34a]"></span>
        </button>
        <button className="btn-color">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f97302]"></span>
        </button>
      </div>
      <div className="flex gap-2">
        <p className="leading-loose mb-0">Brush Size</p>
        <input type="range" min={0} max={10} onChange={() => {}} />
      </div>
    </div>
  );
};

export default Toolbox;
