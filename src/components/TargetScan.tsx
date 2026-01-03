import type { PhotoFile } from '../types';

function TargetScan({ selectedTargetFile }: { selectedTargetFile: PhotoFile }) {
  return (
    <section>
      <header className="mb-3 px-1 flex justify-between items-end">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Target Scan
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          {selectedTargetFile.file.name}
        </span>
      </header>
      <div className="bg-slate-100 rounded-xl border border-gray-200 overflow-hidden flex justify-center p-4">
        <img
          src={selectedTargetFile.previewUrl}
          className="w-auto h-auto max-h-[60vh] object-contain shadow-sm rounded"
          alt="Target"
        />
      </div>
    </section>
  );
}

export default TargetScan;
