# Website Builder - Figma-like Design Tool

A lightweight, browser-based design tool built with React, TypeScript, and Canvas API. No AI, no external APIs.

## Features

✨ **Drawing Tools**
- Rectangle, Circle, Line, and Text shapes
- Fully customizable colors, strokes, and opacity
- Rotation and layering support

🎨 **Design Features**
- Real-time property editing
- Layers panel with Z-index control
- Undo/Redo functionality
- Grid background for alignment
- Selection and dragging
- Multiple shape customization

💾 **Export & Save**
- Export designs as JSON
- Save and load projects from localStorage

🎯 **UI Components**
- Toolbar with all tools
- Properties panel for detailed editing
- Layers panel for shape management
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/themail477/website-builder.git
cd website-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Usage

1. **Select a Tool**: Click on tools in the toolbar (Rectangle, Circle, Line, Text)
2. **Draw**: Click and drag on the canvas to create shapes
3. **Select & Edit**: Use the Select tool to pick shapes and edit properties
4. **Organize**: Use the Layers panel to manage shape order (Z-index)
5. **Export**: Download your design as JSON
6. **Save**: Auto-saves to browser localStorage

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Canvas**: HTML5 Canvas API

## Project Structure

```
src/
├── components/
│   ├── Canvas.tsx       # Main drawing canvas
│   ├── Toolbar.tsx      # Tool selection and actions
│   ├── LayersPanel.tsx  # Layer management
│   └── PropertiesPanel.tsx  # Shape properties
├── store/
│   └── canvasStore.ts   # Zustand state management
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── canvas.ts        # Canvas drawing utilities
├── App.tsx
├── main.tsx
└── index.css
```

## Roadmap

- [ ] Image upload and insertion
- [ ] Gradient fills
- [ ] Path/pen tool
- [ ] Text formatting (bold, italic, underline)
- [ ] Groups and components
- [ ] Keyboard shortcuts
- [ ] Copy/paste functionality
- [ ] Snap to grid/guides
- [ ] Multiple pages/artboards
- [ ] Export as PNG/SVG
- [ ] Keyboard shortcuts documentation

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
