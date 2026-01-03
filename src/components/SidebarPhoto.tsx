import type { PhotoFile } from '../types';

interface SidebarPhotoProps {
  photo: PhotoFile;
  isSelected: boolean;
  viewMode: 'list' | 'grid'; // <--- New Prop
  setSelectedTargetFileId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

function SidebarPhoto({
  photo,
  isSelected,
  viewMode,
  setSelectedTargetFileId,
}: SidebarPhotoProps) {
  if (viewMode === 'grid') {
    return (
      <div
        onClick={() => setSelectedTargetFileId(photo.id)}
        title={photo.file.name}
        className={`
          aspect-square rounded-lg border overflow-hidden cursor-pointer relative group transition-all
          ${
            isSelected
              ? 'border-indigo-600 ring-2 ring-indigo-600 ring-offset-1 z-10'
              : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        {photo.previewUrl ? (
          <img
            src={photo.previewUrl}
            alt={photo.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            ?
          </div>
        )}

        {photo.status === 'synced' && (
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => setSelectedTargetFileId(photo.id)}
      className={`
        p-2 rounded-lg border shadow-sm flex items-center gap-3 transition cursor-pointer
        ${
          isSelected
            ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0 overflow-hidden flex items-center justify-center">
        {photo.previewUrl ? (
          <img
            src={photo.previewUrl}
            alt={photo.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">wk</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium truncate ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}
          title={photo.file.name}
        >
          {photo.file.name}
        </p>

        <p
          className={`text-xs ${
            photo.status === 'synced'
              ? 'text-green-600 font-medium'
              : photo.status === 'error'
                ? 'text-red-500'
                : 'text-gray-400'
          }`}
        >
          {photo.status === 'synced'
            ? 'Synced'
            : photo.status === 'error'
              ? 'Error'
              : 'Pending'}
        </p>
      </div>
    </div>
  );
}

export default SidebarPhoto;
