import { create } from 'zustand';
import { Shape, CanvasState } from '../types';

interface CanvasStore extends CanvasState {
  addShape: (shape: Shape) => void;
  updateShape: (id: string, updates: Partial<Shape>) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;
  setTool: (tool: Shape['type'] | 'select') => void;
  setDragging: (isDragging: boolean) => void;
  setResizing: (isResizing: boolean) => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  clearCanvas: () => void;
  loadFromJSON: (data: Shape[]) => void;
  exportToJSON: () => string;
}

const initialState: CanvasState = {
  shapes: [],
  selectedShapeId: null,
  tool: 'select',
  isDragging: false,
  isResizing: false,
  history: [[]],
  historyStep: 0,
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  ...initialState,

  addShape: (shape: Shape) => {
    set((state) => ({
      shapes: [...state.shapes, shape],
      historyStep: state.historyStep + 1,
      history: [
        ...state.history.slice(0, state.historyStep + 1),
        [...state.shapes, shape],
      ],
    }));
  },

  updateShape: (id: string, updates: Partial<Shape>) => {
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? { ...shape, ...updates } : shape
      ),
    }));
  },

  deleteShape: (id: string) => {
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== id),
      selectedShapeId: state.selectedShapeId === id ? null : state.selectedShapeId,
    }));
  },

  selectShape: (id: string | null) => {
    set({ selectedShapeId: id });
  },

  setTool: (tool: Shape['type'] | 'select') => {
    set({ tool });
  },

  setDragging: (isDragging: boolean) => {
    set({ isDragging });
  },

  setResizing: (isResizing: boolean) => {
    set({ isResizing });
  },

  undo: () => {
    set((state) => {
      if (state.historyStep > 0) {
        const newStep = state.historyStep - 1;
        return {
          shapes: state.history[newStep],
          historyStep: newStep,
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyStep < state.history.length - 1) {
        const newStep = state.historyStep + 1;
        return {
          shapes: state.history[newStep],
          historyStep: newStep,
        };
      }
      return state;
    });
  },

  saveToHistory: () => {
    set((state) => ({
      history: [
        ...state.history.slice(0, state.historyStep + 1),
        JSON.parse(JSON.stringify(state.shapes)),
      ],
      historyStep: state.historyStep + 1,
    }));
  },

  clearCanvas: () => {
    set({
      shapes: [],
      selectedShapeId: null,
      history: [[]],
      historyStep: 0,
    });
  },

  loadFromJSON: (data: Shape[]) => {
    set({
      shapes: data,
      selectedShapeId: null,
      history: [data],
      historyStep: 0,
    });
  },

  exportToJSON: () => {
    const state = get();
    return JSON.stringify(state.shapes, null, 2);
  },
}));
