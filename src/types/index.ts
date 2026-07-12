export type ShapeType = 'rectangle' | 'circle' | 'line' | 'text' | 'image';

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  zIndex: number;
}

export interface CanvasState {
  shapes: Shape[];
  selectedShapeId: string | null;
  tool: ShapeType | 'select';
  isDragging: boolean;
  isResizing: boolean;
  history: Shape[][];
  historyStep: number;
}
