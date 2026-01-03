import { nanoid } from 'nanoid';
import { useState } from 'react';
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
            id: nanoid(),
            file,
            handle,
            previewUrl: URL.createObjectURL(file),
            status: 'pending' as const,
          };
        }),
      );

      setFiles((prev) => [...prev, ...newFiles]);

      // Auto-select first file if none selected
      if (files.length === 0 && newFiles.length > 0) {
        setSelectedTargetFileId(newFiles[0].id);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error opening files:', err);
      }
    }
  };

  const handleSort = () => {
    const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(nextOrder);

    setFiles((prev) => {
      return [...prev].sort((a, b) => {
        // "Smart" sort handles "Scan 1" vs "Scan 10" correctly
        const comparison = a.file.name.localeCompare(b.file.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        });

        // Return comparison for Ascending, or negative comparison for Descending
        return nextOrder === 'asc' ? comparison : -comparison;
      });
    });
  };

  return (
    <aside className="w-1/3 min-w-[300px] bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between p-4 pb-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Batch ({files.length})
        </h2>

        <div id="actions" className="flex items-center gap-1">
          <button
            onClick={handleSort}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition"
            title={`Sort ${sortOrder === 'asc' ? 'Z-A' : 'A-Z'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              // Flip the icon visually if descending
              className={`w-5 h-5 transition-transform ${sortOrder === 'desc' ? 'scale-y-[-1]' : ''}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition"
            title="Toggle View"
          >
            {viewMode === 'list' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {files.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-sm text-gray-400 italic mb-4">No scans loaded</p>
          </div>
        )}

        <div
          className={
            viewMode === 'list' ? 'space-y-3' : 'grid grid-cols-3 gap-2'
          }
        >
          {files.map((photo) => (
            <SidebarPhoto
              key={photo.id}
              photo={photo}
              viewMode={viewMode}
              isSelected={selectedTargetFile === photo.id}
              setSelectedTargetFileId={setSelectedTargetFileId}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={() => {
            handleOpenFiles().catch(console.error);
          }}
          className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium shadow-sm"
        >
          {files.length === 0 ? 'Select Scans...' : 'Add More...'}
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
