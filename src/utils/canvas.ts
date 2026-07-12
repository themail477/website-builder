import { Shape } from '../types';

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  isSelected: boolean
) => {
  ctx.save();
  ctx.globalAlpha = shape.opacity;
  ctx.fillStyle = shape.fill;
  ctx.strokeStyle = shape.stroke;
  ctx.lineWidth = shape.strokeWidth;

  ctx.translate(shape.x + shape.width / 2, shape.y + shape.height / 2);
  ctx.rotate((shape.rotation * Math.PI) / 180);
  ctx.translate(-(shape.x + shape.width / 2), -(shape.y + shape.height / 2));

  switch (shape.type) {
    case 'rectangle':
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
      if (shape.strokeWidth > 0) {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
      break;

    case 'circle':
      ctx.beginPath();
      ctx.arc(
        shape.x + shape.width / 2,
        shape.y + shape.height / 2,
        Math.min(shape.width, shape.height) / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      if (shape.strokeWidth > 0) {
        ctx.stroke();
      }
      break;

    case 'line':
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
      ctx.stroke();
      break;

    case 'text':
      ctx.fillStyle = shape.fill;
      ctx.font = `${shape.fontSize || 16}px ${shape.fontFamily || 'Arial'}`;
      ctx.fillText(shape.text || 'Text', shape.x, shape.y + (shape.fontSize || 16));
      break;
  }

  ctx.restore();

  // Draw selection box
  if (isSelected) {
    ctx.strokeStyle = '#0066ff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    ctx.setLineDash([]);

    // Draw resize handles
    const handleSize = 8;
    const handles = [
      { x: shape.x - handleSize / 2, y: shape.y - handleSize / 2 },
      { x: shape.x + shape.width - handleSize / 2, y: shape.y - handleSize / 2 },
      { x: shape.x - handleSize / 2, y: shape.y + shape.height - handleSize / 2 },
      { x: shape.x + shape.width - handleSize / 2, y: shape.y + shape.height - handleSize / 2 },
    ];

    handles.forEach((handle) => {
      ctx.fillStyle = '#0066ff';
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  }
};

export const isPointInShape = (x: number, y: number, shape: Shape): boolean => {
  if (shape.type === 'circle') {
    const cx = shape.x + shape.width / 2;
    const cy = shape.y + shape.height / 2;
    const r = Math.min(shape.width, shape.height) / 2;
    return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
  } else if (shape.type === 'line') {
    const tolerance = shape.strokeWidth + 5;
    const dx = shape.x + shape.width - shape.x;
    const dy = shape.y + shape.height - shape.y;
    const distance =
      Math.abs(dy * x - dx * y + (shape.x + shape.width) * shape.y - shape.y * (shape.x + shape.width)) /
      Math.sqrt(dx * dx + dy * dy);
    return distance <= tolerance;
  } else {
    return (
      x >= shape.x &&
      x <= shape.x + shape.width &&
      y >= shape.y &&
      y <= shape.y + shape.height
    );
  }
};

export const generateId = (): string => {
  return `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
