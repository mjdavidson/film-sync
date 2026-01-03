import { useState } from 'react';
import { useExif } from '../hooks/useExif';
import type { PhotoFile } from '../types';
import DropZone from './DropZone';
import MetadataInspector from './MetadataInspector';
import SyncControls from './SyncControls';
import TargetScan from './TargetScan';

interface WorkspaceProps {
  selectedTargetFile: PhotoFile | undefined;
  setReferenceFile: (
    targetFileId: string,
    referenceFile: File | undefined,
  ) => void;
  isBatchEmpty: boolean;
}

function Workspace({
  selectedTargetFile,
  setReferenceFile,
  isBatchEmpty,
}: WorkspaceProps) {
  const referenceFile = selectedTargetFile?.referenceFile;
  const { metadata } = useExif({ referenceFile });

  // State for the "pending" sync operation
  const [offsetSeconds, setOffsetSeconds] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Helper function for the "Sync" button (Phase 3 placeholder)
  const handleSync = async () => {
    if (!selectedTargetFile || !metadata) return;

    setIsSyncing(true);
    console.log(
      `Syncing ${selectedTargetFile.file.name} with offset ${offsetSeconds.toString()}s`,
    );

    // Simulate a delay for now
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSyncing(false);
  };

  // no target photos
  if (isBatchEmpty || selectedTargetFile == null) {
    return (
      <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <div className="max-w-md border-2 border-dashed border-gray-200 rounded-2xl p-12 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-slate-600">
            No Scans Loaded
          </h2>
          <p className="mt-2 text-sm">
            Click{' '}
            <span className="font-bold text-slate-600">"Select Scans..."</span>{' '}
            in the sidebar to load your film photos.
          </p>
        </div>
      </main>
    );
  }
  // Empty state
  if (referenceFile == null) {
    return (
      <main className="flex-1 bg-gray-50/50 p-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto p-8 space-y-6">
          <TargetScan selectedTargetFile={selectedTargetFile} />
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Start by dropping a Reference
            </h2>
            <p className="text-slate-500 mb-6 text-sm">
              Upload the iPhone photo (HEIC/JPG) that contains the correct
              location and time data.
            </p>
            <DropZone
              setReferencePhoto={(file) =>
                setReferenceFile(selectedTargetFile.id, file)
              }
            />
          </div>
        </div>
      </main>
    );
  }

  const sourceDate = metadata?.DateTimeOriginal ?? metadata?.CreateDate;

  // Active Workspace
  return (
    <main className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <TargetScan selectedTargetFile={selectedTargetFile} />

        <section>
          <header className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Source (Reference Photo)
            </h2>
            <button
              onClick={() => setReferenceFile(selectedTargetFile.id, undefined)}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Replace Reference
            </button>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <MetadataInspector referenceFile={referenceFile} />
          </div>
        </section>
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="mb-3 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sync Settings
            </h2>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {sourceDate ? (
              <SyncControls
                sourceDate={sourceDate}
                offsetSeconds={offsetSeconds}
                setOffsetSeconds={setOffsetSeconds}
                isSyncing={isSyncing}
                onSync={() => {
                  void handleSync();
                }}
                targetFileName={selectedTargetFile.file.name}
              />
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                Waiting for valid time data from reference photo...
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Workspace;
