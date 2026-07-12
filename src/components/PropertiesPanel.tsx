import React from 'react';
import { useCanvasStore } from '../store/canvasStore';

const PropertiesPanel: React.FC = () => {
  const store = useCanvasStore();
  const selectedShape = store.shapes.find((s) => s.id === store.selectedShapeId);

  if (!selectedShape) {
    return (
      <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 text-center text-gray-500">
        <p>Select a shape to edit properties</p>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    store.updateShape(selectedShape.id, { [key]: value });
  };

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Properties</h3>

      <div className="space-y-4">
        {/* Position */}
        <div>
          <label className="block text-sm font-medium mb-1">X Position</label>
          <input
            type="number"
            value={Math.round(selectedShape.x)}
            onChange={(e) => handleChange('x', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Y Position</label>
          <input
            type="number"
            value={Math.round(selectedShape.y)}
            onChange={(e) => handleChange('y', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <input
            type="number"
            value={Math.round(selectedShape.width)}
            onChange={(e) => handleChange('width', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Height</label>
          <input
            type="number"
            value={Math.round(selectedShape.height)}
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Fill Color */}
        <div>
          <label className="block text-sm font-medium mb-1">Fill Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={selectedShape.fill}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={selectedShape.fill}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Stroke */}
        <div>
          <label className="block text-sm font-medium mb-1">Stroke Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={selectedShape.stroke}
              onChange={(e) => handleChange('stroke', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={selectedShape.stroke}
              onChange={(e) => handleChange('stroke', e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Stroke Width */}
        <div>
          <label className="block text-sm font-medium mb-1">Stroke Width</label>
          <input
            type="number"
            value={selectedShape.strokeWidth}
            onChange={(e) => handleChange('strokeWidth', parseInt(e.target.value))}
            min="0"
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Opacity */}
        <div>
          <label className="block text-sm font-medium mb-1">Opacity</label>
          <input
            type="range"
            value={selectedShape.opacity}
            onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
            min="0"
            max="1"
            step="0.1"
            className="w-full"
          />
          <span className="text-sm text-gray-600">{Math.round(selectedShape.opacity * 100)}%</span>
        </div>

        {/* Rotation */}
        <div>
          <label className="block text-sm font-medium mb-1">Rotation</label>
          <input
            type="number"
            value={Math.round(selectedShape.rotation)}
            onChange={(e) => handleChange('rotation', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Z-Index */}
        <div>
          <label className="block text-sm font-medium mb-1">Z-Index (Layer)</label>
          <input
            type="number"
            value={selectedShape.zIndex}
            onChange={(e) => handleChange('zIndex', parseInt(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        {/* Text properties */}
        {selectedShape.type === 'text' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Text</label>
              <textarea
                value={selectedShape.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <input
                type="number"
                value={selectedShape.fontSize || 16}
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Font Family</label>
              <select
                value={selectedShape.fontFamily || 'Arial'}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              >
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Times New Roman</option>
                <option>Courier New</option>
                <option>Georgia</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
