import React from 'react';
import { useCanvasStore } from '../store/canvasStore';
import {
  Square,
  Circle,
  Minus,
  Type,
  Pointer,
  Download,
  Trash2,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

const Toolbar: React.FC = () => {
  const store = useCanvasStore();

  const handleExport = () => {
    const json = store.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      store.clearCanvas();
    }
  };

  return (
    <div className="bg-gray-800 text-white p-3 flex items-center gap-2 flex-wrap">
      <button
        onClick={() => store.setTool('select')}
        className={`p-2 rounded hover:bg-gray-700 ${
          store.tool === 'select' ? 'bg-blue-600' : ''
        }`}
        title="Select tool"
      >
        <Pointer size={20} />
      </button>

      <div className="w-px bg-gray-600 h-6"></div>

      <button
        onClick={() => store.setTool('rectangle')}
        className={`p-2 rounded hover:bg-gray-700 ${
          store.tool === 'rectangle' ? 'bg-blue-600' : ''
        }`}
        title="Rectangle tool"
      >
        <Square size={20} />
      </button>

      <button
        onClick={() => store.setTool('circle')}
        className={`p-2 rounded hover:bg-gray-700 ${
          store.tool === 'circle' ? 'bg-blue-600' : ''
        }`}
        title="Circle tool"
      >
        <Circle size={20} />
      </button>

      <button
        onClick={() => store.setTool('line')}
        className={`p-2 rounded hover:bg-gray-700 ${
          store.tool === 'line' ? 'bg-blue-600' : ''
        }`}
        title="Line tool"
      >
        <Minus size={20} />
      </button>

      <button
        onClick={() => store.setTool('text')}
        className={`p-2 rounded hover:bg-gray-700 ${
          store.tool === 'text' ? 'bg-blue-600' : ''
        }`}
        title="Text tool"
      >
        <Type size={20} />
      </button>

      <div className="w-px bg-gray-600 h-6"></div>

      <button
        onClick={() => store.undo()}
        className="p-2 rounded hover:bg-gray-700"
        title="Undo"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={() => store.redo()}
        className="p-2 rounded hover:bg-gray-700"
        title="Redo"
      >
        <RotateCw size={20} />
      </button>

      <div className="w-px bg-gray-600 h-6"></div>

      <button
        onClick={() => store.selectedShapeId && store.deleteShape(store.selectedShapeId)}
        disabled={!store.selectedShapeId}
        className="p-2 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete selected"
      >
        <Trash2 size={20} />
      </button>

      <button
        onClick={handleExport}
        className="p-2 rounded hover:bg-gray-700 ml-auto"
        title="Export as JSON"
      >
        <Download size={20} />
      </button>

      <button
        onClick={handleClear}
        className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-sm"
        title="Clear canvas"
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
