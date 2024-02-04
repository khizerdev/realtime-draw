import React, { useEffect, useRef } from 'react';
import { useToolboxStore } from '../store/use-toolbox';
import { useMenuStore } from '../store/use-menu';

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);

  const currentActiveItem = useMenuStore((state) => state.activeMenuItem);
  const actionMenuItem = useMenuStore((state) => state.actionMenuItem);
  const actionItemClick = useMenuStore((state) => state.actionItemClick);
  const { color, size } = useToolboxStore((state) => state.currentTool);

  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

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
    if (actionMenuItem == 'Undo') {
      console.log(historyPointer);
      if (historyPointer.current > 0) {
        historyPointer.current -= 1;
      }
      console.log(historyPointer);
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    if (actionMenuItem == 'Redo') {
      if (historyPointer.current < drawHistory.current.length - 1) {
        historyPointer.current += 1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    actionItemClick(null);
  }, [actionMenuItem]);

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
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
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

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default DrawingPad;
