import { nanoid } from 'nanoid';
import type { PhotoFile } from '../types';
import SidebarPhoto from './SidebarPhoto';

function Sidebar({
  files,
  setFiles,
  selectedTargetFile,
  setSelectedTargetFileId,
}: {
  files: PhotoFile[];
  setFiles: React.Dispatch<React.SetStateAction<PhotoFile[]>>;
  selectedTargetFile: string | undefined;
  setSelectedTargetFileId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  const handleOpenFiles = async () => {
    try {
      const handles = await window.showOpenFilePicker({
        multiple: true,
        types: [
          {
            description: 'Images',
            accept: { 'image/*': ['.jpg', '.jpeg', '.tiff'] },
          },
        ],
      });

      const newFiles: PhotoFile[] = await Promise.all(
        handles.map(async (handle: FileSystemFileHandle) => {
          const file = await handle.getFile();
          return {
            id: nanoid(), // Unique ID for React keys
            file,
            handle,
            previewUrl: URL.createObjectURL(file),
            status: 'pending' as const,
          };
        }),
      );

      setFiles((prev) => [...prev, ...newFiles]);
      if (files.length === 0) {
        setSelectedTargetFileId(newFiles[0].id);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error opening files:', err);
      }
    }
  };
  return (
    <aside className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Target Scans (Batch)
        </h2>

        {files.length === 0 && (
          <p className="text-sm text-gray-400 italic">No files selected</p>
        )}

        {files.map((photo) => (
          <SidebarPhoto
            key={photo.id}
            photo={photo}
            isSelected={selectedTargetFile === photo.id}
            setSelectedTargetFileId={setSelectedTargetFileId}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={() => {
            handleOpenFiles().catch(console.error);
          }}
          className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium"
        >
          Select Scans...
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
