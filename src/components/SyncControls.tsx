import { addSeconds, format } from 'date-fns';

function SyncControls({
  sourceDate,
  offsetSeconds,
  setOffsetSeconds,
  onSync,
  isSyncing,
  targetFileName,
}: {
  sourceDate: Date;
  offsetSeconds: number;
  setOffsetSeconds: (seconds: number) => void;
  onSync: () => void;
  isSyncing: boolean;
  targetFileName: string;
}) {
  const targetDate = addSeconds(sourceDate, offsetSeconds * -1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
            Reference Time
          </p>
          <p className="font-mono text-slate-700 text-lg">
            {format(sourceDate, 'HH:mm:ss')}
          </p>
        </div>

        <div className="text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
          <span className="text-xs font-medium">
            {offsetSeconds === 0
              ? 'No Offset'
              : `${offsetSeconds > 0 ? '-' : '+'}${Math.abs(offsetSeconds).toString()}s`}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
            New Target Time
          </p>
          <p className="font-mono text-indigo-600 font-bold text-lg">
            {format(targetDate, 'HH:mm:ss')}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700">
          Time Offset (Seconds)
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setOffsetSeconds(offsetSeconds - 1)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-slate-600 hover:bg-gray-50 active:bg-gray-100"
          >
            -1s
          </button>

          <input
            type="number"
            value={offsetSeconds}
            onChange={(e) => setOffsetSeconds(Number(e.target.value))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-center font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />

          <button
            onClick={() => setOffsetSeconds(offsetSeconds + 1)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-slate-600 hover:bg-gray-50 active:bg-gray-100"
          >
            +1s
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Positive values subtract time (Target = Source - Offset).
        </p>
      </div>

      <button
        onClick={onSync}
        disabled={isSyncing}
        className={`w-full py-3 px-4 rounded-lg font-medium shadow-sm text-white transition-all
          ${
            isSyncing
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow active:scale-[0.99]'
          }
        `}
      >
        {isSyncing ? 'Writing Metadata...' : `Sync to ${targetFileName}`}
      </button>
    </div>
  );
}

export default SyncControls;
