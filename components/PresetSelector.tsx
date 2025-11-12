"use client";

import { presets } from "@/lib/presets";
import { Preset } from "@/types/lsystem";

interface PresetSelectorProps {
  onSelect: (preset: Preset) => void;
}

export default function PresetSelector({ onSelect }: PresetSelectorProps) {
  const categories = [
    { id: "fractal", name: "Fractals", emoji: "❄️" },
    { id: "plant", name: "Plants", emoji: "🌿" },
    { id: "tree", name: "Trees", emoji: "🌳" },
  ] as const;

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Presets
      </h2>

      {categories.map((category) => {
        const categoryPresets = presets.filter(
          (p) => p.category === category.id
        );

        return (
          <div key={category.id}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {categoryPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onSelect(preset)}
                  className="text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors group"
                >
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Click any preset to load it, then customize the parameters in the editor!
        </p>
      </div>
    </div>
  );
}
