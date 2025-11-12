"use client";

import { ColorPalette } from "@/types/lsystem";
import { colorPalettes } from "@/lib/colorPalettes";

interface ColorPaletteSelectorProps {
  selectedPaletteId: string;
  onChange: (paletteId: string) => void;
}

export default function ColorPaletteSelector({
  selectedPaletteId,
  onChange,
}: ColorPaletteSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Color Palette
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {colorPalettes.map((palette) => (
          <button
            key={palette.id}
            onClick={() => onChange(palette.id)}
            className={`relative p-3 rounded-lg border-2 transition-all text-left ${
              selectedPaletteId === palette.id
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {/* Color preview */}
            <div className="flex gap-1.5 mb-2">
              <div
                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: palette.branch }}
                title="Branch color"
              />
              <div
                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: palette.leaf }}
                title="Leaf color"
              />
            </div>

            {/* Palette name */}
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {palette.name}
            </div>

            {/* Selected indicator */}
            {selectedPaletteId === palette.id && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Description of selected palette */}
      <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs text-gray-600 dark:text-gray-400">
        {colorPalettes.find((p) => p.id === selectedPaletteId)?.description ||
          "Select a color palette"}
      </div>
    </div>
  );
}
