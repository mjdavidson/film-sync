# Film Sync

A browser-based tool to synchronize metadata between analog film scans and digital reference photos.

## The Problem

When you get your analog film developed and scanned, the resulting digital files (JPEGs or TIFFs) have metadata that reflects the time of scanning, not the time the photo was actually taken. This makes it difficult to organize them chronologically with photos from your digital cameras or phone.

**Film Sync** solves this by providing a simple, local, in-browser interface to copy the correct metadata (Date, Time, and GPS) from a digital "reference" photo (like one taken on your phone around the same time) to your film scan.

## Features

- **Local First**: All file processing happens in your browser. Your photos are never uploaded to a server.
- **In-Place Editing**: Uses the modern File System Access API to overwrite your scan files directly, so you don't have to deal with downloading copies. A fallback to standard browser downloads is provided.
- **Drag & Drop Interface**: A simple two-column layout to manage your batch of scans and link reference photos.
- **Metadata Extraction**: Reads EXIF data, including Date, Time, and GPS, from reference photos (HEIC, HEIF, JPEG).
- **Metadata Writing**: Writes corrected EXIF data to your target film scans (JPEG, TIFF).
- **Time Offset Correction**: Easily account for the small delay between taking the film shot and the digital reference shot with a "seconds offset" input.
- **Manual Override**: Don't have a reference shot? You can manually enter the date, time, and GPS coordinates.
- **Batch Processing**: Load all your scans at once and work through them one by one.

## How It Works

The user interface is split into two main columns:

1.  **Left Column (The Batch)**: This is where you drag and drop all your scanned JPEGs or TIFFs. They appear as a list of "Target" files to be processed.
2.  **Right Column (The Inspector)**: When you select a target file from the list, this column becomes active. You can then drag a single "Source" (reference) photo into it.

### The Workflow

1.  **Drag Scans**: Drop a batch of scanned `.jpg` or `.tiff` files into the left column.
2.  **Select a Scan**: Click on the first scan in the list you want to edit.
3.  **Drop Reference**: Drop a corresponding `.heic` or `.jpg` reference photo into the right column.
4.  **Verify & Adjust**: The app will display the extracted Date, Time, and a map of the GPS location from the reference photo. You can enter a time offset if needed (e.g., `-3` seconds if you took the reference photo 3 seconds after the film shot).
5.  **Sync**: Click the "Sync Metadata" button. The app will ask for permission to save the changes directly to your original file.
6.  **Repeat**: The item in the list will be marked as "Synced". Select the next scan and repeat the process.

## Technical Stack

- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **EXIF Reading**: `exifr` for its robust handling of HEIC/HEIF and GPS data.
- **EXIF Writing**: `piexifjs` for writing EXIF data to JPEGs.
- **File Handling**: File System Access API for in-place file saving.
- **Date Handling**: `date-fns` for reliable date and time manipulation.

## Getting Started (For Development)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/film-sync.git
    cd film-sync
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

This will start the Vite development server, and you can access the tool at `http://localhost:5173`.

## Known Issues

- **Browser Support**: The File System Access API is only supported in modern Chromium-based browsers (Chrome, Edge, Opera). In other browsers like Firefox and Safari, the tool will fall back to downloading a modified copy of the file.
- **HEIC Previews**: Most browsers cannot display `.heic` or `.heif` images natively. A placeholder icon may be shown for reference files of this type.
