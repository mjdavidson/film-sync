export interface ExifData {
  dateTimeOriginal: Date | null;
  gps: {
    latitude: number;
    longitude: number;
  } | null;
  timezoneOffset?: string; // Derived if possible, or manual
}

export interface PhotoFile {
  id: string;
  file: File;
  // We keep the handle so we can save back to disk later!
  handle?: FileSystemFileHandle;
  previewUrl: string;

  referenceFile?: File; // The iPhone Photo (Source)
  referenceData?: ExifData; // The parsed metadata from the Source

  status: 'pending' | 'ready_to_sync' | 'synced' | 'error';
}
