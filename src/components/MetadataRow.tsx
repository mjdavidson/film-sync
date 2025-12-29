function MetadataRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{title}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export default MetadataRow;
