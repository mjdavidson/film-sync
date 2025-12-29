# Design Document: "Film Sync" Metadata Tool

## 1. Executive Summary

**Project Name:** Film Sync
**Objective:** A browser-based local tool to streamline the synchronization of analog film scans with digital "reference" photos (taken on iPhone/HEIF). The app extracts EXIF metadata (Time, Date, GPS) from the reference photo and writes it to the film scan.
**Primary User Goal:** Fix film scan metadata to reflect the actual moment of capture, not the moment of scanning.

## 2. Technical Stack

- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (for rapid, clean UI)
- **State Management:** React Context or Zustand (for managing the batch list)
- **File Handling:** File System Access API (specifically `window.showOpenFilePicker` and `FileSystemFileHandle`) to allow in-place editing where supported.
- **EXIF Libraries:**
  - **Reading (HEIF/JPEG):** `exifr` (Fast, handles HEIC/HEIF and GPS well).
  - **Writing (JPEG/TIFF):** `piexifjs` or `exif-js` (Note: Writing to HEIC is difficult in browser; we assume Scanned Photos are JPEGs or TIFFs).
- **Date Handling:** `date-fns` (for easier time subtraction/formatting).

## 3. System Architecture & Data Flow

### 3.1. The "Source" vs. "Target" Concept

- **Source (Reference):** usually an HEIF/HEIC from iPhone. Read-only. Used to extract data.
- **Target (Scan):** usually a JPEG/TIFF from the lab. Read-Write. Receives the data.

### 3.2. Data Model (TypeScript Interfaces)

```typescript
interface ExifData {
  dateTimeOriginal: Date | null;
  gps: {
    latitude: number;
    longitude: number;
  } | null;
  timezoneOffset?: string; // Derived if possible, or manual
}

interface PhotoFile {
  id: string;
  file: File;
  handle?: FileSystemFileHandle; // For saving back to disk
  previewUrl: string;
  currentExif: ExifData;
  status: 'pending' | 'synced' | 'error';
}
```

## 4. Feature Requirements

---

### 4.1. Drag & Drop Zones

- **Zone A (Source):** Accepts HEIC/HEIF/JPG. Parses metadata immediately upon drop. Displays "Captured At" time and Map pin (if GPS exists).

- **Zone B (Target Batch):** Accepts multiple JPG/TIFF files. Lists them in a grid or list view.

- **Logic:** Users can drop a specific Source photo onto a specific Target photo to link them 1:1, or select a Target and drop a Source globally.

### 4.2. Metadata Visualization

- **Panel:** When a Source is loaded, show a clear summary:
  - **Date/Time:** YYYY-MM-DD HH:MM:SS

  - **GPS:** Lat/Long (link to Google Maps for verification).

- **Visual Feedback:** Green checkmarks when data is valid. Red warnings if GPS is missing.

### 4.3. Time Offset (The "Film Delay")

- **Input:** A number input field for "Seconds Offset" (Default: 0).

- **Logic:** `TargetTime = SourceTime - Offset`.

- **Use Case:** If the iPhone photo was taken 5 seconds after the film shutter fired, user sets offset to `5`.

### 4.4. Manual Override

- If no Source photo exists, the user must be able to manually input:
  - Date/Time picker.

  - Manual GPS coordinates (Paste lat,long).

### 4.5. Writing the Data (The "Sync" Action)

- **Action:** Button "Sync Metadata".

- **Process:**
  1.  Read Target binary.

  2.  Construct new EXIF buffer using Source data (minus offset).

  3.  Insert EXIF into Target binary.

  4.  **Save:**
      - _If FileHandle exists:_ `writable.write(blob)` (In-place edit).

      - _Fallback:_ Trigger browser download of modified file.

## 5. UI/UX Design

---

### 5.1. Layout (Split Screen)

- **Left Column (The Batch / Targets):**
  - List of scanned photos.

  - Status indicators (Unsynced / Synced).

  - Thumbnail view.

- **Right Column (The Reference / Source):**
  - Large drop zone for the iPhone photo.

  - Metadata inspector.

  - "Sync to Selected" button.

  - Manual entry toggle.

### 5.2. Interaction Flow

1.  User drags 5 scanned JPGs into Left Column.

2.  User selects Scan #1.

3.  User drags `IMG_3021.HEIC` into Right Column.

4.  App extracts time `12:00:05`.

5.  User sets offset `-3s`. Calculated time: `12:00:02`.

6.  User clicks "Apply".

7.  Scan #1 updates in place (or prompts save).

8.  User selects Scan #2... repeat.

## 6\. Implementation Steps (Prompt Chain for LLM)

When feeding this to an LLM, break the task down into these prompts:

**Prompt 1: Project Setup**

> Initialize a Vite + React + TypeScript project with Tailwind CSS. Create a basic layout with two columns: a 'Target List' on the left and a 'Source Inspector' on the right. Set up the basic Drag and Drop handlers using `react-dropzone`.

**Prompt 2: EXIF Reading**

> Integrate `exifr`. Create a utility function `extractMetadata(file)` that returns DateTimeOriginal and GPS coordinates. Handle HEIC files specifically. Display this data in the 'Source Inspector' when a file is dropped.

**Prompt 3: File System Access**

> Implement the `window.showOpenFilePicker` logic for the Target list. Ensure we store the `FileSystemFileHandle` so we can write back to the file later. Create a `PhotoFile` interface as defined in the design doc.

**Prompt 4: EXIF Writing**

> Integrate `piexifjs`. Create a function `writeMetadata(targetFile, sourceData, offsetSeconds)`. It should take the Source metadata, apply the time offset, convert it to the EXIF format required by `piexifjs`, and overwrite the Target file using the file handle.

**Prompt 5: Manual Override & Polish**

> Add a form in the Source Inspector that allows manual entry of Date/Time and GPS if no Source photo is provided. Add visual indicators (green checks) to the Target list when a file has been successfully synced.

## 7. Edge Cases & Known Issues

---

- **HEIC Support:** Browsers cannot natively display HEIC. Use a library to convert the HEIC thumbnail to a blob for preview, or just display a generic icon.

- **Date Formats:** EXIF date format is strict (`YYYY:MM:DD HH:MM:SS`). Ensure conversion from JS Date object is perfect.

- **Permissions:** The browser will ask for permission to "View files" and again to "Save changes". Handle the rejection of permission gracefully.
