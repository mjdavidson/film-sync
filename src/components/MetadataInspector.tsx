import { formatISO } from 'date-fns';
import { useMemo } from 'react';
import { useExif } from '../hooks/useExif';
import Map from './Map';
import MetadataRow from './MetadataRow';

function MetadataInspector({
  referenceFile,
}: {
  referenceFile: File | undefined;
}) {
  const imgSrc = useMemo(
    () =>
      referenceFile != null ? URL.createObjectURL(referenceFile) : undefined,
    [referenceFile],
  );

  const { gpsCoords, metadata } = useExif({ referenceFile });

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
          {metadata != null ? (
            <>
              <h3 className="font-semibold text-slate-900 mb-4">
                Metadata Inspector
              </h3>
              <div className="space-y-4">
                {metadata.CreateDate != null ? (
                  <MetadataRow
                    title="Originally created at"
                    value={formatISO(metadata.CreateDate)}
                  />
                ) : null}
                {gpsCoords != null ? (
                  <MetadataRow title="GPS co-ords" value={gpsCoords} />
                ) : null}
                {metadata.latitude != null && metadata.longitude != null ? (
                  <Map
                    coords={{
                      lat: metadata.latitude,
                      lng: metadata.longitude,
                      alt: metadata.GPSAltitude,
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
