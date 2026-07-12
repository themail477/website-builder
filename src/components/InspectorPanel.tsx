import React from 'react';
import { useEditorStore } from '../store/canvasStore';
import { ChevronDown, ChevronUp } from 'lucide-react';

const InspectorPanel: React.FC = () => {
  const store = useEditorStore();
  const selectedShapes = store.selectedShapes.length > 0 ? store.selectedShapes : [store.selectedShapeId].filter(Boolean);
  const shapes = store.shapes.filter((s) => selectedShapes.includes(s.id));

  if (shapes.length === 0) {
    return (
      <div className="w-72 bg-gray-50 border-l border-gray-200 p-4 text-center text-gray-500">
        <p>Select shapes to inspect</p>
      </div>
    );
  }

  const handleBatchUpdate = (key: string, value: any) => {
    store.batchUpdateShapes(selectedShapes, { [key]: value });
  };

  const firstShape = shapes[0];
  const isMultiSelect = shapes.length > 1;

  return (
    <div className="w-72 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="font-bold text-lg">
          Inspector {isMultiSelect && `(${shapes.length} selected)`}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {shapes.map((s) => s.type).join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        {/* Position */}
        <div className="bg-white p-3 rounded border border-gray-200">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ChevronDown size={16} />
            Position
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1">X</label>
              <input
                type="number"
                value={Math.round(firstShape.x)}
                onChange={(e) => handleBatchUpdate('x', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Y</label>
              <input
                type="number"
                value={Math.round(firstShape.y)}
                onChange={(e) => handleBatchUpdate('y', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="bg-white p-3 rounded border border-gray-200">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ChevronDown size={16} />
            Size
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1">Width</label>
              <input
                type="number"
                value={Math.round(firstShape.width)}
                onChange={(e) => handleBatchUpdate('width', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Height</label>
              <input
                type="number"
                value={Math.round(firstShape.height)}
                onChange={(e) => handleBatchUpdate('height', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white p-3 rounded border border-gray-200">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ChevronDown size={16} />
            Appearance
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1">Fill Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={firstShape.fill}
                  onChange={(e) => handleBatchUpdate('fill', e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={firstShape.fill}
                  onChange={(e) => handleBatchUpdate('fill', e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={firstShape.opacity}
                onChange={(e) => handleBatchUpdate('opacity', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{Math.round(firstShape.opacity * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Advanced */}
        <div className="bg-white p-3 rounded border border-gray-200">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ChevronDown size={16} />
            Advanced
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1">Rotation</label>
              <input
                type="number"
                value={Math.round(firstShape.rotation)}
                onChange={(e) => handleBatchUpdate('rotation', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Z-Index</label>
              <input
                type="number"
                value={firstShape.zIndex}
                onChange={(e) => handleBatchUpdate('zIndex', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorPanel;
