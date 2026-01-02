import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import type { PhotoFile } from './types';

function App() {
  const [referencePhoto, setReferencePhoto] = useState<File>();
  const [targetFiles, setTargetFiles] = useState<PhotoFile[]>([]);
  const [selectedTargetFile, setSelectedTargetFile] = useState<string>();

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-slate-900">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Film Sync
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={targetFiles}
          setFiles={setTargetFiles}
          selectedTargetFile={selectedTargetFile}
          setSelectedTargetFile={setSelectedTargetFile}
        />

        <Workspace
          setReferencePhoto={setReferencePhoto}
          referencePhoto={referencePhoto}
        />
      </div>
    </div>
  );
}

export default App;
