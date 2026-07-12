export type ShapeType = 'rectangle' | 'circle' | 'line' | 'text' | 'image' | 'button' | 'input' | 'heading' | 'paragraph' | 'image-gallery' | 'video' | 'icon' | 'divider' | 'card' | 'navbar';

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
  fontWeight?: 'normal' | 'bold' | '600' | '700';\n  textAlign?: 'left' | 'center' | 'right';\n  zIndex: number;\n  borderRadius?: number;\n  padding?: number;\n  shadow?: boolean;\n  shadowColor?: string;\n  shadowBlur?: number;\n  link?: string;\n  imageUrl?: string;\n  videoUrl?: string;\n  iconName?: string;\n  placeholder?: string;\n  border?: boolean;\n  borderColor?: string;\n  hoverFill?: string;\n  transition?: boolean;\n}\n\nexport interface CanvasState {\n  shapes: Shape[];\n  selectedShapeId: string | null;\n  tool: ShapeType | 'select';\n  isDragging: boolean;\n  isResizing: boolean;\n  history: Shape[][];\n  historyStep: number;\n  canvasWidth: number;\n  canvasHeight: number;\n}\n\nexport interface Template {\n  id: string;\n  name: string;\n  preview: string;\n  shapes: Shape[];\n  category: 'landing' | 'portfolio' | 'ecommerce' | 'blog' | 'agency';\n}\n\nexport interface Page {\n  id: string;\n  name: string;\n  shapes: Shape[];\n  createdAt: Date;\n}\n\nexport interface Project {\n  id: string;\n  name: string;\n  pages: Page[];\n  theme: {\n    primaryColor: string;\n    secondaryColor: string;\n    fontFamily: string;\n  };\n  createdAt: Date;\n  updatedAt: Date;\n}\n