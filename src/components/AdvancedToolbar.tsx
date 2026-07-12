import React from 'react';
import { useEditorStore } from '../store/canvasStore';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Lock,
  Eye,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
} from 'lucide-react';

const AdvancedToolbar: React.FC = () => {
  const store = useEditorStore();

  const handleAlignLeft = () => store.alignLeft();
  const handleAlignCenter = () => store.alignCenter();
  const handleAlignRight = () => store.alignRight();
  const handleAlignTop = () => store.alignTop();
  const handleAlignMiddle = () => store.alignMiddle();
  const handleAlignBottom = () => store.alignBottom();

  const handleCopy = () => store.copy();
  const handleCut = () => store.cut();
  const handlePaste = () => store.paste();
  const handleDelete = () => store.deleteSelected();

  const handleExport = () => {
    const json = store.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => store.setZoom(store.zoom + 10);
  const handleZoomOut = () => store.setZoom(store.zoom - 10);

  return (
    <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2 flex-wrap">
      {/* Alignment */}
      <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
        <button
          onClick={handleAlignLeft}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={handleAlignCenter}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={handleAlignRight}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <button
          onClick={handleAlignTop}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Top"
        >
          <AlignStartVertical size={18} />
        </button>
        <button
          onClick={handleAlignMiddle}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Middle"
        >
          <AlignCenterVertical size={18} />
        </button>
        <button
          onClick={handleAlignBottom}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Bottom"
        >
          <AlignEndVertical size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300"></div>

      {/* Clipboard */}
      <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
        <button
          onClick={handleCopy}
          disabled={!store.selectedShapeId}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Copy (Ctrl+C)"
        >
          <Copy size={18} />
        </button>
        <button
          onClick={handleCut}
          disabled={!store.selectedShapeId}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Cut (Ctrl+X)"
        >
          <Scissors size={18} />
        </button>
        <button
          onClick={handlePaste}
          disabled={!store.clipboard}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Paste (Ctrl+V)"
        >
          <Clipboard size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={!store.selectedShapeId}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300"></div>

      {/* Visibility & Lock */}
      <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
        <button
          onClick={() => store.selectedShapeId && store.toggleVisibility(store.selectedShapeId)}
          disabled={!store.selectedShapeId}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Toggle Visibility"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => store.selectedShapeId && store.toggleLock(store.selectedShapeId)}
          disabled={!store.selectedShapeId}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Toggle Lock"
        >
          <Lock size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300"></div>

      {/* Zoom */}
      <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
        <button
          onClick={handleZoomOut}
          className="p-1 hover:bg-gray-100 rounded"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <span className="text-sm font-medium px-2">{store.zoom}%</span>
        <button
          onClick={handleZoomIn}
          className="p-1 hover:bg-gray-100 rounded"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 ml-auto"></div>

      {/* Export/Import */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleExport}
          className="p-2 hover:bg-gray-200 rounded bg-white border border-gray-200"
          title="Export Design"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default AdvancedToolbar;
