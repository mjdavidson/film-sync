import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function DropZone({
  setReferencePhoto,
}: {
  setReferencePhoto: (file: File) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      console.log({
        acceptedFiles,
        file,
        acceptedFilesLength: acceptedFiles.length,
      });
      if (acceptedFiles.length !== 1) {
        throw new Error('Only 1 file accepted');
      }
      setReferencePhoto(file);
    },
    [setReferencePhoto],
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <section
      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here …</p>
      ) : (
        <p>Drag iPhone Reference Photo Here (HEIC/JPG)</p>
      )}
    </section>
  );
}

export default DropZone;
