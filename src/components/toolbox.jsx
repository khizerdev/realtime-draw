import React from 'react';
import { io } from 'socket.io-client';
import { useMenuStore } from '../store/use-menu';
import { useToolboxStore } from '../store/use-toolbox';

const socket = io.connect('http://localhost:5000');

const Toolbox = () => {
  const currentActiveItem = useMenuStore((state) => state.activeMenuItem);
  const updateSize = useToolboxStore((state) => state.updateSize);
  const updateColor = useToolboxStore((state) => state.updateColor);
  const { color, size } = useToolboxStore((state) => state.currentTool);

  const isPencilSelected = currentActiveItem === 'Pencil';
  return (
    <div className="p-3 flex rounded-s-lg gap-10">
      <div className={`flex gap-1 ${!isPencilSelected ? 'invisible' : ''}`}>
        <button
          className={`btn-color ${color == '#18181b' ? 'border-[#18181b] border-[3px]' : ''}`}
          onClick={() => {
            socket.emit('changeConfig', { color: '#18181b', size });
            updateColor('#18181b');
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]"></span>
        </button>
        <button
          className={`btn-color ${color == '#e11d48' ? 'border-[#e11d48] border-[3px]' : ''}`}
          onClick={() => {
            socket.emit('changeConfig', { color: '#e11d48', size });
            updateColor('#e11d48');
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e11d48]"></span>
        </button>
        <button
          className={`btn-color ${color == '#2563eb' ? 'border-[#2563eb] border-[3px]' : ''}`}
          onClick={() => {
            socket.emit('changeConfig', { color: '#2563eb', size });
            updateColor('#2563eb');
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb]"></span>
        </button>
        <button
          className={`btn-color ${color == '#16a34a' ? 'border-[#16a34a] border-[3px]' : ''}`}
          onClick={() => {
            socket.emit('changeConfig', { color: '#16a34a', size });
            updateColor('#16a34a');
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#16a34a]"></span>
        </button>
        <button
          className={`btn-color ${color == '#f97302' ? 'border-[#f97302] border-[3px]' : ''}`}
          onClick={() => {
            socket.emit('changeConfig', { color: '#f97302', size });
            updateColor('#f97302');
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f97302]"></span>
        </button>
      </div>
      <div className="flex gap-2">
        <p className="leading-loose mb-0">Brush Size</p>
        <input
          type="range"
          min={0}
          max={10}
          value={size}
          onChange={(e) => {
            socket.emit('changeConfig', { color, size: e.target.value });
            updateSize(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Toolbox;
