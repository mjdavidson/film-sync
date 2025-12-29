function SidebarPhoto() {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
      <div>
        <p className="text-sm font-medium">scan_001.jpg</p>
        <p className="text-xs text-gray-400">Pending</p>
      </div>
    </div>
  );
}

export default SidebarPhoto;
