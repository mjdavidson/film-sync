import exifr from 'exifr';
import { useEffect, useMemo, useState } from 'react';
import { MetadataSchema, type Metadata } from '../metadata';

export function useExif({ referenceFile }: { referenceFile: File | null }) {
  const [metadata, setMetadata] = useState<Metadata>();
  useEffect(() => {
    if (referenceFile == null) {
      return;
    }
    let cancel = false;
    const promise = exifr.parse(referenceFile);

    promise
      .then((val) => {
        const parsed = MetadataSchema.parse(val);
        if (!cancel) {
          setMetadata(parsed);
        }
      })
      .catch(console.log);
    return () => {
      cancel = true;
    };
  }, [referenceFile]);

  const gpsCoords = useMemo(() => {
    if (
      metadata?.GPSLatitude == null ||
      metadata.GPSLongitude == null ||
      metadata.GPSLatitudeRef == null ||
      metadata.GPSLongitudeRef == null
    ) {
      return null;
    }
    const latDeg = metadata.GPSLatitude[0].toString();
    const latMin = metadata.GPSLatitude[1].toString();
    const latSec = metadata.GPSLatitude[2].toString();
    const lngDeg = metadata.GPSLongitude[0].toString();
    const lngMin = metadata.GPSLongitude[1].toString();
    const lngSec = metadata.GPSLongitude[2].toString();

    return `${latDeg}°${latMin}'${latSec}"${metadata.GPSLatitudeRef} ${lngDeg}°${lngMin}'${lngSec}"${metadata.GPSLongitudeRef}`;
  }, [metadata]);

  return { gpsCoords, metadata };
}
