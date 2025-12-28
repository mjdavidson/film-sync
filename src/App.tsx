function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-slate-900">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Film Sync
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Target Scans (Batch)
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium">scan_001.jpg</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Source Drop Zone Placeholder */}
            <section className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500">
              <p>Drag iPhone Reference Photo Here (HEIC/JPG)</p>
            </section>

            {/* Metadata Inspector Placeholder */}
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">
                Metadata Inspector
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date/Time</span>
                  <span className="font-mono">--</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GPS</span>
                  <span className="font-mono">--</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
