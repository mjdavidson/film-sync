import { useCallback, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import type { PhotoFile } from './types';

function App() {
  const [targetFiles, setTargetFiles] = useState<PhotoFile[]>([]);
  const [selectedTargetFileId, setSelectedTargetFileId] = useState<string>();

  const updateTargetFile = useCallback(
    (
      targetFileId: string,
      patch: { referenceFile?: File | null; offsetSeconds?: number },
    ) => {
      const targetFile = targetFiles.find((file) => file.id === targetFileId);
      if (targetFile == null) {
        throw new Error(`Target file with ID ${targetFileId} not found`);
      }
      setTargetFiles((prev) =>
        prev.map((file) =>
          file.id === targetFileId
            ? {
                ...file,
                ...('referenceFile' in patch
                  ? {
                      referenceFile: patch.referenceFile,
                      status:
                        patch.referenceFile !== null
                          ? 'ready_to_sync'
                          : 'pending',
                    }
                  : {}),
                ...('offsetSeconds' in patch
                  ? { offsetSeconds: patch.offsetSeconds }
                  : {}),
              }
            : file,
        ),
      );
    },
    [targetFiles],
  );

  const selectedTargetFile = useMemo(
    () => targetFiles.find((file) => file.id === selectedTargetFileId) ?? null,
    [targetFiles, selectedTargetFileId],
  );

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
          selectedTargetFile={selectedTargetFileId}
          setSelectedTargetFileId={setSelectedTargetFileId}
        />

        <Workspace
          key={selectedTargetFile?.id ?? 'none'}
          isBatchEmpty={targetFiles.length === 0}
          updateTargetFile={updateTargetFile}
          selectedTargetFile={selectedTargetFile}
        />
      </div>
    </div>
  );
}

export default App;
