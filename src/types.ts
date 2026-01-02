export interface PhotoFile {
  id: string;
  file: File;
  // We keep the handle so we can save back to disk later!
  handle?: FileSystemFileHandle;
  previewUrl: string;
  status: "pending" | "synced" | "error";
}
