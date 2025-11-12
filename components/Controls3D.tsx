"use client";

import { LSystemConfig } from "@/types/lsystem";

interface Controls3DProps {
  config: LSystemConfig;
  onChange: (config: LSystemConfig) => void;
}

export default function Controls3D({ config, onChange }: Controls3DProps) {
  const handleThicknessChange = (value: number) => {
    onChange({
      ...config,
      thickness: value,
    });
  };

  const handleThicknessReductionChange = (value: number) => {
    onChange({
      ...config,
      thicknessReduction: value,
    });
  };

  const handleLeafSizeChange = (value: number) => {
    onChange({
      ...config,
      leafSize: value,
    });
  };

  const handleTropismYChange = (value: number) => {
    onChange({
      ...config,
      tropism: {
        x: config.tropism?.x || 0,
        y: value,
        z: config.tropism?.z || 0,
      },
    });
  };

  const thickness = config.thickness ?? 0.1;
  const thicknessReduction = config.thicknessReduction ?? 0.7;
  const leafSize = config.leafSize ?? 0.2;
  const tropismY = config.tropism?.y ?? -0.2;

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        3D Parameters
      </h3>

      {/* Thickness */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Branch Thickness</span>
          <span className="text-gray-500 dark:text-gray-400">{thickness.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.01"
          value={thickness}
          onChange={(e) => handleThicknessChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Controls the initial thickness of the main trunk
        </p>
      </div>

      {/* Thickness Reduction */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Thickness Taper</span>
          <span className="text-gray-500 dark:text-gray-400">{thicknessReduction.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="0.95"
          step="0.01"
          value={thicknessReduction}
          onChange={(e) => handleThicknessReductionChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          How much branches thin out (lower = more taper)
        </p>
      </div>

      {/* Leaf Size */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Leaf Size</span>
          <span className="text-gray-500 dark:text-gray-400">{leafSize.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.01"
          value={leafSize}
          onChange={(e) => handleLeafSizeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Size of leaves at branch tips
        </p>
      </div>

      {/* Tropism (Gravity) */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>Gravitational Bend</span>
          <span className="text-gray-500 dark:text-gray-400">{tropismY.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="-0.5"
          max="0"
          step="0.01"
          value={tropismY}
          onChange={(e) => handleTropismYChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Simulates gravitational pull on branches
        </p>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          3D Turtle Commands
        </h4>
        <div className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
          <div><code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">^</code> Pitch up | <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">&</code> Pitch down</div>
          <div><code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">/</code> Roll right | <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">\</code> Roll left</div>
          <div><code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">+</code> Turn left | <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">-</code> Turn right</div>
        </div>
      </div>
    </div>
  );
}
