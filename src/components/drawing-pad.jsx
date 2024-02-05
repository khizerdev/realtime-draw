import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useToolboxStore } from '../store/use-toolbox';
import { useMenuStore } from '../store/use-menu';

const socket = io.connect('http://localhost:5000');

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);

  const actionMenuItem = useMenuStore((state) => state.actionMenuItem);
  const actionItemClick = useMenuStore((state) => state.actionItemClick);
  const { color, size } = useToolboxStore((state) => state.currentTool);

  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
  }, [socket]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    socket.on('changeConfig', handleChangeConfig);

    return () => {
      socket.off('changeConfig', handleChangeConfig);
    };
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (actionMenuItem == 'Undo') {
      if (historyPointer.current > 0) {
        historyPointer.current -= 1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
      const imageCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageCanvas);
    }

    if (actionMenuItem == 'Redo') {
      if (historyPointer.current < drawHistory.current.length - 1) {
        historyPointer.current += 1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
      const imageCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageCanvas);
    }

    actionItemClick(null);
  }, [actionMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    function handleMouseDown(e) {
      shouldDraw.current = true;
      beginPath(e.offsetX, e.offsetY);
      socket.emit('beginPath', { x: e.offsetX, y: e.offsetY });
    }

    function handleMouseMove(e) {
      if (!shouldDraw.current) return;
      drawLine(e.offsetX, e.offsetY);
      socket.emit('drawLine', { x: e.offsetX, y: e.offsetY });
    }

    function handleMouseUp(e) {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    }

    const handleBeginPath = (path) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    socket.on('beginPath', handleBeginPath);
    socket.on('drawLine', handleDrawLine);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);

      socket.off('beginPath', handleBeginPath);
      socket.off('drawLine', handleDrawLine);
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
