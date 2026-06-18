"use client";

import { useRef } from "react";

interface Props {
  rulesFile: File | null;
  setRulesFile: (file: File | null) => void;
  uploadRules: () => void;
}

export default function RulesUploadSection({
  rulesFile,
  setRulesFile,
  uploadRules,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Upload Category Rules</h2>

      <div className="flex flex-wrap items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => setRulesFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-50"
        >
          Choose File
        </button>

        <div className="min-w-[250px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-600">
          {rulesFile ? rulesFile.name : "No file selected"}
        </div>

        <button
          onClick={uploadRules}
          disabled={!rulesFile}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          Upload Rules
        </button>
      </div>
    </div>
  );
}
