import React from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

const LayersPanel: React.FC = () => {
  const store = useCanvasStore();
  const sortedShapes = [...store.shapes].sort((a, b) => b.zIndex - a.zIndex);

  const handleDelete = (id: string) => {
    store.deleteShape(id);
  };

  const handleLayerUp = (id: string) => {
    const shape = store.shapes.find((s) => s.id === id);
    if (shape) {
      const maxZIndex = Math.max(...store.shapes.map((s) => s.zIndex), 0);
      store.updateShape(id, { zIndex: maxZIndex + 1 });
    }
  };

  const handleLayerDown = (id: string) => {
    const shape = store.shapes.find((s) => s.id === id);
    if (shape && shape.zIndex > 0) {
      store.updateShape(id, { zIndex: shape.zIndex - 1 });
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Layers</h3>

      {sortedShapes.length === 0 ? (
        <p className="text-gray-500 text-sm">No layers yet</p>
      ) : (
        <div className="space-y-2">
          {sortedShapes.map((shape) => (
            <div
              key={shape.id}
              onClick={() => store.selectShape(shape.id)}
              className={`p-2 rounded cursor-pointer flex items-center justify-between group ${
                store.selectedShapeId === shape.id
                  ? 'bg-blue-200 border-2 border-blue-600'
                  : 'bg-white border-2 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {shape.type === 'text' ? shape.text?.substring(0, 20) : shape.type}
                </p>
                <p className="text-xs text-gray-500">Z: {shape.zIndex}</p>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLayerUp(shape.id);
                  }}
                  className="p-1 hover:bg-gray-300 rounded text-xs"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLayerDown(shape.id);
                  }}
                  className="p-1 hover:bg-gray-300 rounded text-xs"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(shape.id);
                  }}
                  className="p-1 hover:bg-red-300 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayersPanel;
