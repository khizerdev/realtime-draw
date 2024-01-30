import React, { useEffect, useRef } from 'react';
import { useToolboxStore } from '../store/use-toolbox';
import { useMenuStore } from '../store/use-menu';

const DrawingPad = () => {
  const canvasRef = useRef(null);

  const currentActiveItem = useMenuStore((state) => state.activeMenuItem);
  const { color, size } = useToolboxStore((state) => state.currentTool);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const remainingHeight = window.innerHeight - navbarHeight;
    canvas.width = window.innerWidth;
    canvas.height = remainingHeight;
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrawingPad;
