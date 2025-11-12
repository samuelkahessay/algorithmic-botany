"use client";

import { RenderMode } from "@/types/lsystem";

interface ViewToggleProps {
  mode: RenderMode;
  onChange: (mode: RenderMode) => void;
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 hidden md:inline">
        View:
      </span>
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-md p-0.5">
        <button
          onClick={() => onChange("2d")}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
            mode === "2d"
              ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          2D
        </button>
        <button
          onClick={() => onChange("3d")}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
            mode === "3d"
              ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          3D
        </button>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 hidden lg:inline">
        {mode === "2d" ? "📐" : "🌳"}
      </div>
    </div>
  );
}
