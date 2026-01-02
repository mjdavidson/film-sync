import { formatISO } from 'date-fns';
import exifr from 'exifr';
import { useEffect, useMemo, useState } from 'react';
import type { Metadata } from '../metadata';
import { MetadataSchema } from '../metadata';
import Map from './Map';
import MetadataRow from './MetadataRow';

function MetadataInspector({
  referenceFile,
}: {
  referenceFile: File | undefined;
}) {
  const [val, setVal] = useState<Metadata>();
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
          setVal(parsed);
        }
      })
      .catch(console.log);
    return () => {
      cancel = true;
    };
  }, [referenceFile]);
  console.log({ referenceFile, val });

  const imgSrc = useMemo(
    () =>
      referenceFile != null ? URL.createObjectURL(referenceFile) : undefined,
    [referenceFile],
  );

  const gpsCoords = useMemo(() => {
    if (
      val?.GPSLatitude == null ||
      val.GPSLongitude == null ||
      val.GPSLatitudeRef == null ||
      val.GPSLongitudeRef == null
    ) {
      return null;
    }
    const latDeg = val.GPSLatitude[0].toString();
    const latMin = val.GPSLatitude[1].toString();
    const latSec = val.GPSLatitude[2].toString();
    const lngDeg = val.GPSLongitude[0].toString();
    const lngMin = val.GPSLongitude[1].toString();
    const lngSec = val.GPSLongitude[2].toString();

    return `${latDeg}°${latMin}'${latSec}"${val.GPSLatitudeRef} ${lngDeg}°${lngMin}'${lngSec}"${val.GPSLongitudeRef}`;
  }, [val]);

  if (referenceFile == null) {
    return null;
  }

  return (
    <>
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <img src={imgSrc} />
        </div>
        <div>
          {val != null ? (
            <>
              <h3 className="font-semibold text-slate-900 mb-4">
                Metadata Inspector
              </h3>
              <div className="space-y-4">
                {val.CreateDate != null ? (
                  <MetadataRow
                    title="Originally created at"
                    value={formatISO(val.CreateDate)}
                  />
                ) : null}
                {gpsCoords != null ? (
                  <MetadataRow title="GPS co-ords" value={gpsCoords} />
                ) : null}
                {val.latitude != null && val.longitude != null ? (
                  <Map
                    coords={{
                      lat: val.latitude,
                      lng: val.longitude,
                      alt: val.GPSAltitude,
                    }}
                  />
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default MetadataInspector;
