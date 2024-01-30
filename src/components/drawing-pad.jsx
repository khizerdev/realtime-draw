import React, { useEffect, useRef } from 'react';
import { useToolboxStore } from '../store/use-toolbox';
import { useMenuStore } from '../store/use-menu';

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);

  const currentActiveItem = useMenuStore((state) => state.activeMenuItem);
  const { color, size } = useToolboxStore((state) => state.currentTool);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.strokeStyle = color;
    context.lineWidth = size;
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function handleMouseDown(e) {
      shouldDraw.current = true;
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    }

    function handleMouseMove(e) {
      if (!shouldDraw.current) return;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    }

    function handleMouseUp(e) {
      shouldDraw.current = false;
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>;
};

export default DrawingPad;
