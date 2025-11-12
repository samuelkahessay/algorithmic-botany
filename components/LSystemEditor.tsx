"use client";

import { LSystemConfig, LSystemRule } from "@/types/lsystem";
import { useState } from "react";

interface LSystemEditorProps {
  config: LSystemConfig;
  onChange: (config: LSystemConfig) => void;
}

export default function LSystemEditor({ config, onChange }: LSystemEditorProps) {
  const [axiom, setAxiom] = useState(config.axiom);
  const [angle, setAngle] = useState(config.angle);
  const [iterations, setIterations] = useState(config.iterations);
  const [rules, setRules] = useState<LSystemRule[]>(config.rules);

  const handleUpdate = (updates: Partial<LSystemConfig>) => {
    const newConfig = { ...config, ...updates };
    onChange(newConfig);
  };

  const handleAxiomChange = (value: string) => {
    setAxiom(value);
    handleUpdate({ axiom: value });
  };

  const handleAngleChange = (value: number) => {
    setAngle(value);
    handleUpdate({ angle: value });
  };

  const handleIterationsChange = (value: number) => {
    setIterations(value);
    handleUpdate({ iterations: value });
  };

  const handleRuleChange = (index: number, field: "from" | "to", value: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
    handleUpdate({ rules: newRules });
  };

  const addRule = () => {
    const newRules = [...rules, { from: "X", to: "F" }];
    setRules(newRules);
    handleUpdate({ rules: newRules });
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
    handleUpdate({ rules: newRules });
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        L-System Editor
      </h2>

      {/* Axiom */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Axiom (Starting String)
        </label>
        <input
          type="text"
          value={axiom}
          onChange={(e) => handleAxiomChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
          placeholder="F"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          The initial string to start the L-system
        </p>
      </div>

      {/* Production Rules */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Production Rules
        </label>
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={rule.from}
                onChange={(e) => handleRuleChange(index, "from", e.target.value)}
                className="w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center"
                maxLength={1}
              />
              <span className="text-gray-500 dark:text-gray-400">→</span>
              <input
                type="text"
                value={rule.to}
                onChange={(e) => handleRuleChange(index, "to", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
              />
              {rules.length > 1 && (
                <button
                  onClick={() => removeRule(index)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addRule}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            + Add Rule
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Define how each character transforms. E.g., F → F[+F][-F]
        </p>
      </div>

      {/* Angle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Angle: {angle}°
        </label>
        <input
          type="range"
          min="0"
          max="180"
          step="0.1"
          value={angle}
          onChange={(e) => handleAngleChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0°</span>
          <span>180°</span>
        </div>
      </div>

      {/* Iterations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Iterations: {iterations}
        </label>
        <input
          type="range"
          min="1"
          max="8"
          step="1"
          value={iterations}
          onChange={(e) => handleIterationsChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1</span>
          <span>8</span>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          ⚠️ Higher iterations may be slow to render
        </p>
      </div>

      {/* Turtle Commands Reference */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Turtle Graphics Commands
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
          <div><span className="font-bold">F</span> - Draw forward</div>
          <div><span className="font-bold">f</span> - Move forward</div>
          <div><span className="font-bold">+</span> - Turn right</div>
          <div><span className="font-bold">-</span> - Turn left</div>
          <div><span className="font-bold">[</span> - Push state</div>
          <div><span className="font-bold">]</span> - Pop state</div>
        </div>
      </div>
    </div>
  );
}
