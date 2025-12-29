import SidebarPhoto from './SidebarPhoto';

function Sidebar() {
  return (
    <aside className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Target Scans (Batch)
      </h2>

      <div className="space-y-3">
        <SidebarPhoto />
      </div>
    </aside>
  );
}

export default Sidebar;
