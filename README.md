# Website Builder - Figma-like Design Tool

A lightweight, browser-based design tool built with React, TypeScript, and Canvas API. No AI, no external APIs. Featuring a comprehensive editor with advanced capabilities similar to Figma.

## Features

### Drawing Tools
- Basic Shapes: Rectangle, Circle, Line, Text
- Advanced Components: Button, Input, Heading, Paragraph, Card, Navbar
- Media: Image, Video, Image Gallery
- Utilities: Icon, Divider
- Full customization (colors, strokes, opacity, rotation, border radius)

### Selection & Editing
- Click to select shapes
- Multi-select with Shift+Click
- Drag to move shapes
- Resize with handles
- Lock/Hide shapes to prevent accidental edits
- Real-time property updates

### Advanced Alignment & Distribution
- Align: Left, Center, Right, Top, Middle, Bottom
- Distribute: Horizontally and Vertically
- Snap to grid (20px grid background)
- Z-index management (Bring to Front / Send to Back)

### Clipboard Operations
- Copy (Ctrl+C) - Copy selected shape
- Cut (Ctrl+X) - Cut selected shape
- Paste (Ctrl+V) - Paste with auto-offset
- Delete (Delete/Backspace) - Remove shape
- Duplicate (Ctrl+D) - Quick duplicate

### Multi-Page Support
- Create, rename, and delete pages
- Switch between pages instantly
- Each page maintains its own shapes and properties
- Pages panel on the left sidebar

### Project Management
- Create Projects - Start new projects with themes
- Save Projects - Auto-save with metadata
- Export Projects - Download as JSON
- Import Projects - Load from JSON files
- Theme system (Primary color, Secondary color, Font family)

### Template Gallery
- 5 pre-built templates (Landing, Portfolio, E-Commerce, Blog, Agency)
- Apply Templates - Load template designs instantly
- Save as Template - Save current design as reusable template
- Template categories for organization

### Layers Management
- Visual layers panel
- Select shapes from layers
- Reorder with up/down arrows
- Quick delete button
- Z-index indicators

### Advanced Inspector
- Batch Edit - Edit multiple shapes at once
- Position Control - X, Y coordinates
- Size Control - Width, Height
- Appearance - Colors, Opacity, Shadows
- Advanced - Rotation, Z-Index, Borders, Border Radius

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Shift+Z / Ctrl+Y | Redo |
| Ctrl+C | Copy |
| Ctrl+X | Cut |
| Ctrl+V | Paste |
| Ctrl+A | Select All |
| Ctrl+D | Duplicate |
| Delete / Backspace | Delete |
| Escape | Deselect |
| Shift+Click | Multi-select |

### Export Options
- JSON Export - Full design data
- HTML Export - Static HTML preview
- Project Export - Complete project with pages

### Customization Properties
- Fill Color - Solid colors with color picker
- Stroke - Color, width, style
- Opacity - 0-100% transparency
- Rotation - 0-360 degrees
- Border Radius - Rounded corners
- Shadow - Drop shadow effects
- Text Properties - Font, Size, Weight, Alignment
- Hover Effects - Interactive states
- Links - Add URLs to shapes

### History & Undo/Redo
- Full undo/redo history stack
- Track all changes
- Never lose work

### View Controls
- Zoom: 25% - 400%
- Zoom In/Out buttons in toolbar
- Pan canvas with scroll

## Tech Stack

- Frontend: React 18 + TypeScript
- Build Tool: Vite
- State Management: Zustand
- Styling: Tailwind CSS
- Icons: Lucide React
- Canvas: HTML5 Canvas API
- Storage: Browser LocalStorage

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

The app will open at http://localhost:3000

### Build for Production

```bash
npm run build
```

## Usage Guide

### Creating a Design
1. Start a Project: Click \"New Project\" in the Project Manager
2. Select a Tool: Choose from drawing tools in the main toolbar
3. Draw: Click and drag on canvas to create shapes
4. Customize: Edit properties in the Inspector panel
5. Organize: Use Layers panel to manage shape order

### Working with Multiple Objects
1. Select Multiple: Shift+Click on canvas or select in Layers panel
2. Align: Use Advanced Toolbar alignment options
3. Distribute: Spread shapes evenly across canvas
4. Group: Right-click > Group (upcoming feature)

### Managing Pages
1. Add Page: Click + button in Pages panel
2. Switch Page: Click on page name
3. Rename Page: Click edit icon (pencil)
4. Delete Page: Click trash icon (minimum 1 page required)

### Using Templates
1. Click Templates button (bottom right)
2. Choose a category or browse all
3. Click Use to apply template
4. Customize the design as needed
5. Save as template for reuse

### Exporting Your Design
1. Export JSON: Click download in Advanced Toolbar
2. Export HTML: Right-click > Export HTML
3. Export Project: Click Export in Project Manager
4. Share files via email or save locally

### Importing Designs
1. Click Import in Project Manager
2. Select previously saved JSON file
3. Design loads with all properties intact

## Project Structure

```
src/
├── components/
│   ├── Canvas.tsx                 # Main drawing canvas
│   ├── Toolbar.tsx                # Basic tool selection
│   ├── AdvancedToolbar.tsx        # Alignment & clipboard
│   ├── LayersPanel.tsx            # Shape layers management
│   ├── PagesPanel.tsx             # Multi-page management
│   ├── PropertiesPanel.tsx        # Shape properties editor
│   ├── InspectorPanel.tsx         # Advanced inspector
│   ├── ProjectManager.tsx         # Project operations
│   └── TemplateGallery.tsx        # Template system
├── store/
│   └── canvasStore.ts             # Zustand state management
├── types/
│   └── index.ts                   # TypeScript interfaces
├── utils/
│   └── canvas.ts                  # Canvas utilities
├── App.tsx                         # Main app layout
├── main.tsx                        # Entry point
└── index.css                       # Global styles
```

## Architecture

### State Management (Zustand)
- EditorStore: Central store with all editor operations
- Shape Management: Add, update, delete, select
- History: Full undo/redo support
- Selection: Single and multi-select
- Pages: Multi-page project support
- Projects: Project creation and management

### Canvas Rendering
- HTML5 Canvas for high-performance rendering
- Sorted rendering by Z-index
- Grid background with 20px spacing
- Selection indicators (blue dashed outline)
- Resize handles on selected shapes

### Type Safety
- Full TypeScript coverage
- Comprehensive interfaces for all objects
- Type-safe state updates

## Roadmap

- Image upload and insertion
- Gradient fills
- Path/Pen tool
- Text formatting (bold, italic, underline)
- Shape groups/components
- Snap to grid/guides
- Artboards support
- Export to PNG/SVG
- Collaboration features
- Design system/component library
- Plugins system
- Animation support

## Known Limitations

- Canvas size fixed at 1200x800 (customizable in code)
- No real-time collaboration
- No cloud storage (localStorage only)
- Single file export format (JSON)
- No image filters or effects

## Tips & Tricks

1. Quick Duplicate: Select shape + Ctrl+D
2. Batch Edit: Select multiple shapes to edit all at once
3. Alignment: Always select 2+ shapes before using align tools
4. Templates: Save frequently used designs as templates
5. Keyboard Shortcuts: Use shortcuts for faster workflow
6. Lock Shapes: Lock background elements to prevent moving them
7. Hide Shapes: Hide elements you're not working on

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

Built with ❤️ using React + TypeScript + Canvas API
