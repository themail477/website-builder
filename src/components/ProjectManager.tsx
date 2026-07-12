import React, { useState } from 'react';
import { useEditorStore } from '../store/canvasStore';
import { Save, Download, Upload, Plus } from 'lucide-react';

const ProjectManager: React.FC = () => {
  const store = useEditorStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleCreateProject = () => {
    if (projectName.trim()) {
      store.createProject(projectName);
      setProjectName('');
      setShowNewProject(false);
    }
  };

  const handleSaveProject = () => {
    store.saveProject();
    alert('Project saved!');
  };

  const handleExportProject = () => {
    const json = store.exportProject();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${store.currentProject?.name || 'project'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        store.importProject(json);
        alert('Project imported!');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {store.currentProject?.name || 'Untitled Project'}
          </h2>
          <p className="text-sm text-gray-600">
            {store.currentProject ? 'Project loaded' : 'No project'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!store.currentProject ? (
          <>
            {showNewProject ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowNewProject(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Plus size={20} />
                  New Project
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                  <Upload size={20} />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportProject}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleSaveProject}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Save size={20} />
              Save
            </button>
            <button
              onClick={handleExportProject}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <Download size={20} />
              Export
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
