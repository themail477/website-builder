import React, { useState } from 'react';
import { useEditorStore } from '../store/canvasStore';
import { Download, Save } from 'lucide-react';
import { Template } from '../types';

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: 'landing-1',
    name: 'Landing Page',
    preview: '🎯',
    category: 'landing',
    shapes: [],
  },
  {
    id: 'portfolio-1',
    name: 'Portfolio',
    preview: '🎨',
    category: 'portfolio',
    shapes: [],
  },
  {
    id: 'ecommerce-1',
    name: 'E-Commerce',
    preview: '🛍️',
    category: 'ecommerce',
    shapes: [],
  },
  {
    id: 'blog-1',
    name: 'Blog',
    preview: '📝',
    category: 'blog',
    shapes: [],
  },
  {
    id: 'agency-1',
    name: 'Agency',
    preview: '🏢',
    category: 'agency',
    shapes: [],
  },
];

const TemplateGallery: React.FC = () => {
  const store = useEditorStore();
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleApplyTemplate = (template: Template) => {
    store.applyTemplate(template);
    setShowGallery(false);
  };

  const handleSaveTemplate = () => {
    const name = prompt('Template name:');
    if (name) {
      const category = prompt('Category (landing/portfolio/ecommerce/blog/agency):');
      if (category) {
        store.saveAsTemplate(name, category);
        alert('Template saved!');
      }
    }
  };

  const filteredTemplates = selectedCategory
    ? SAMPLE_TEMPLATES.filter((t) => t.category === selectedCategory)
    : SAMPLE_TEMPLATES;

  return (
    <>
      <button
        onClick={() => setShowGallery(!showGallery)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Templates
      </button>

      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Template Gallery</h2>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 mb-4 pb-4 border-b">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  All
                </button>
                {['landing', 'portfolio', 'ecommerce', 'blog', 'agency'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded capitalize ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-600 transition-colors"
                  >
                    <div className="text-4xl mb-2 text-center">{template.preview}</div>
                    <h3 className="font-semibold text-center mb-2">{template.name}</h3>
                    <button
                      onClick={() => handleApplyTemplate(template)}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      <Download size={16} className="inline mr-2" />
                      Use
                    </button>
                  </div>
                ))}
              </div>

              {/* Save Current as Template */}
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={handleSaveTemplate}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Current Design as Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateGallery;
