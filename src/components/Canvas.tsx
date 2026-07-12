import React, { useRef, useEffect, useState } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { Shape } from '../types';
import { drawShape, isPointInShape, generateId } from '../utils/canvas';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const store = useCanvasStore();
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Redraw canvas whenever shapes change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let i = 0; i < canvas.width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Sort shapes by zIndex and draw
    const sortedShapes = [...store.shapes].sort((a, b) => a.zIndex - b.zIndex);
    sortedShapes.forEach((shape) => {
      drawShape(ctx, shape, shape.id === store.selectedShapeId);
    });
  }, [store.shapes, store.selectedShapeId]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartX(x);
    setStartY(y);

    if (store.tool === 'select') {
      // Find clicked shape (iterate in reverse for top-most shape)
      const clicked = [...store.shapes]
        .reverse()
        .find((shape) => isPointInShape(x, y, shape));
      store.selectShape(clicked?.id || null);
    } else {
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (store.tool === 'select' && store.selectedShapeId && e.buttons === 1) {
      const deltaX = x - startX;
      const deltaY = y - startY;

      store.updateShape(store.selectedShapeId, {
        x: store.shapes.find((s) => s.id === store.selectedShapeId)!.x + deltaX,
        y: store.shapes.find((s) => s.id === store.selectedShapeId)!.y + deltaY,
      });

      setStartX(x);
      setStartY(y);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    if (width < 5 && height < 5) {
      setIsDrawing(false);
      return;
    }

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);

    const newShape: Shape = {
      id: generateId(),
      type: store.tool as Shape['type'],
      x,
      y,
      width,
      height,
      rotation: 0,
      fill: '#3b82f6',
      stroke: '#1f2937',
      strokeWidth: 2,
      opacity: 1,
      zIndex: store.shapes.length,
      ...(store.tool === 'text' && { text: 'Click to edit', fontSize: 16, fontFamily: 'Arial' }),
    };

    store.addShape(newShape);
    store.selectShape(newShape.id);
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={800}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border-2 border-gray-300 bg-white cursor-crosshair"
    />
  );
};

export default Canvas;
