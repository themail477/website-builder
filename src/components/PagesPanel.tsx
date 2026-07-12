import React, { useState } from 'react';
import { useEditorStore } from '../store/canvasStore';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

const PagesPanel: React.FC = () => {
  const store = useEditorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddPage = () => {
    store.addPage(`Page ${store.pages.length + 1}`);
  };

  const handleDeletePage = (id: string) => {
    if (store.pages.length > 1 && confirm('Delete this page?')) {
      store.deletePage(id);
    }
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      store.renamePage(id, editingName);
    }
    setEditingId(null);
  };

  return (
    <div className="w-56 bg-gray-50 border-l border-gray-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Pages</h3>
        <button
          onClick={handleAddPage}
          className="p-1 hover:bg-gray-200 rounded"
          title="Add Page"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {store.pages.map((page) => (
          <div
            key={page.id}
            onClick={() => store.switchPage(page.id)}
            className={`p-3 rounded cursor-pointer group transition-colors ${
              store.currentPageId === page.id
                ? 'bg-blue-200 border-2 border-blue-600'
                : 'bg-white border-2 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {editingId === page.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                  autoFocus
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit(page.id);
                  }}
                  className="p-1 hover:bg-green-200 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(null);
                  }}
                  className="p-1 hover:bg-red-200 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium truncate">{page.name}</p>
                  <p className="text-xs text-gray-500">{page.shapes.length} shapes</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(page.id, page.name);
                    }}
                    className="p-1 hover:bg-gray-300 rounded"
                    title="Rename"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                    disabled={store.pages.length === 1}
                    className="p-1 hover:bg-red-300 rounded disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesPanel;
