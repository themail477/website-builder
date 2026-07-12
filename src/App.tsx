import React from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import LayersPanel from './components/LayersPanel';
import PropertiesPanel from './components/PropertiesPanel';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <LayersPanel />
        <div className="flex-1 overflow-auto canvas-container flex items-center justify-center">
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
