import { formatISO } from 'date-fns';
import exifr from 'exifr';
import { useEffect, useMemo, useState } from 'react';
import type { Metadata } from '../metadata';
import { MetadataSchema } from '../metadata';
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

  if (referenceFile == null) {
    return null;
  }

  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
      <img style={{ maxHeight: '100px' }} src={imgSrc} />
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
            {val.GPSLatitude != null && val.GPSLongitude != null ? (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">GPS</span>
                <span className="font-mono">
                  {val.GPSLatitude} / {val.GPSLongitude}
                </span>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}

export default MetadataInspector;
