import type { PhotoFile } from '../types';

interface SidebarPhotoProps {
  photo: PhotoFile;
  isSelected: boolean;
  setSelectedTargetFileId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

function SidebarPhoto({
  photo,
  isSelected,
  setSelectedTargetFileId,
}: SidebarPhotoProps) {
  return (
    <div
      onClick={() => setSelectedTargetFileId(photo.id)}
      className={`
        p-3 rounded-lg border shadow-sm flex items-center gap-3 transition cursor-pointer
        ${
          isSelected
            ? 'bg-slate-50 border-slate-600 ring-1 ring-slate-600 shadow-md'
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
          className="text-sm font-medium truncate text-slate-700"
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
