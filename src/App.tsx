import { useState } from 'react';
import DropZone from './components/DropZone';
import MetadataInspector from './components/MetadataInspector';
import Sidebar from './components/Sidebar';

function App() {
  const [referencePhoto, setReferencePhoto] = useState<File>();
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-slate-900">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Film Sync
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 bg-white overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Source Drop Zone Placeholder */}
            <DropZone setReferencePhoto={setReferencePhoto} />

            {/* Metadata Inspector Placeholder */}
            <MetadataInspector referenceFile={referencePhoto} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
