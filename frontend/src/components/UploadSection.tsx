"use client";

import { useRef } from "react";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  uploadFile: () => void;
  loading: boolean;
}

export default function UploadSection({
  file,
  setFile,
  uploadFile,
  loading,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Upload Transactions</h2>

      <div className="flex flex-wrap items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-50"
        >
          Choose File
        </button>

        <div className="min-w-[250px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-600">
          {file ? file.name : "No file selected"}
        </div>

        <button
          onClick={uploadFile}
          disabled={!file || loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>
    </div>
  );
}
