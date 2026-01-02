import DropZone from './DropZone';
import MetadataInspector from './MetadataInspector';

function Workspace({
  setReferencePhoto,
  referencePhoto,
}: {
  setReferencePhoto: React.Dispatch<React.SetStateAction<File | undefined>>;
  referencePhoto: File | undefined;
}) {
  return (
    <main className="flex-1 bg-white overflow-y-auto p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <DropZone setReferencePhoto={setReferencePhoto} />

        <MetadataInspector referenceFile={referencePhoto} />
      </div>
    </main>
  );
}

export default Workspace;
