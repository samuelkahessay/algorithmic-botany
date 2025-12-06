"use client";

// Force dynamic rendering to prevent static generation attempts
export const dynamic = 'force-dynamic';

import { useState, useRef } from "react";
import { LSystemConfig, RenderMode } from "@/types/lsystem";
import LSystemVisualizer, { LSystemVisualizerRef } from "@/components/LSystemVisualizer";
import LSystemEditor from "@/components/LSystemEditor";
import PresetSelector from "@/components/PresetSelector";
import ViewToggle from "@/components/ViewToggle";
import Controls3D from "@/components/Controls3D";
import ColorPaletteSelector from "@/components/ColorPaletteSelector";
import { presets } from "@/lib/presets";
import { getPaletteById } from "@/lib/colorPalettes";

export default function Home() {
  const [config, setConfig] = useState<LSystemConfig>(presets[0].config);
  const [currentPreset, setCurrentPreset] = useState(presets[0].name);
  const [renderMode, setRenderMode] = useState<RenderMode>("2d");
  const [paletteId, setPaletteId] = useState("classic");
  const [activeTab, setActiveTab] = useState<"presets" | "editor" | "3d-controls" | "colors">("presets");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const visualizerRef = useRef<LSystemVisualizerRef>(null);

  const currentPalette = getPaletteById(paletteId);

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setConfig(preset.config);
    setCurrentPreset(preset.name);
    // Switch to preset's preferred render mode if specified
    if (preset.renderMode) {
      setRenderMode(preset.renderMode);
    }
  };

  const handleConfigChange = (newConfig: LSystemConfig) => {
    setConfig(newConfig);
    setCurrentPreset("Custom");
  };

  const handleRenderModeChange = (mode: RenderMode) => {
    setRenderMode(mode);
    // Auto-switch to 3D controls tab when switching to 3D mode
    if (mode === "3d" && activeTab !== "3d-controls") {
      setActiveTab("3d-controls");
    }
  };

  const handleExportPNG = async () => {
    if (visualizerRef.current) {
      const dataUrl = await visualizerRef.current.exportPNG();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `lsystem-${renderMode}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    }
  };

  const handleReset = () => {
    setConfig(presets[0].config);
    setCurrentPreset(presets[0].name);
    setRenderMode("2d");
    setActiveTab("presets");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-[2000px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Title */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                🌿 Biological Modelling Visualizer
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 hidden sm:block">
                Interactive L-System Editor • University of Calgary Research (2018)
              </p>
            </div>

            {/* View Toggle - Centered */}
            <div className="flex-shrink-0">
              <ViewToggle mode={renderMode} onChange={handleRenderModeChange} />
            </div>

            {/* Current Preset & Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-medium text-green-800 dark:text-green-200">
                  {currentPreset}
                </span>
              </div>

              <button
                onClick={handleExportPNG}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <span>📥</span>
                Export
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Reset
              </button>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors"
              >
                {sidebarOpen ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
          <div className="w-full max-w-5xl">
            {/* Visualizer */}
            <LSystemVisualizer
              ref={visualizerRef}
              config={config}
              palette={currentPalette}
              mode={renderMode}
              width={900}
              height={700}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } fixed lg:relative right-0 top-[120px] lg:top-0 h-[calc(100vh-120px)] w-full sm:w-96 lg:w-[420px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 z-20 overflow-hidden flex flex-col`}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 px-3 py-3 font-medium transition-colors text-xs ${
                activeTab === "presets"
                  ? "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              📚 Presets
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 px-3 py-3 font-medium transition-colors text-xs ${
                activeTab === "editor"
                  ? "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              ⚙️ Editor
            </button>
            <button
              onClick={() => setActiveTab("colors")}
              className={`flex-1 px-3 py-3 font-medium transition-colors text-xs ${
                activeTab === "colors"
                  ? "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              🎨 Colors
            </button>
            {renderMode === "3d" && (
              <button
                onClick={() => setActiveTab("3d-controls")}
                className={`flex-1 px-3 py-3 font-medium transition-colors text-xs ${
                  activeTab === "3d-controls"
                    ? "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                🌳 3D
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "presets" ? (
              <PresetSelector onSelect={handlePresetSelect} />
            ) : activeTab === "editor" ? (
              <LSystemEditor config={config} onChange={handleConfigChange} />
            ) : activeTab === "colors" ? (
              <div className="p-4">
                <ColorPaletteSelector
                  selectedPaletteId={paletteId}
                  onChange={setPaletteId}
                />
              </div>
            ) : (
              <div className="p-4">
                <Controls3D config={config} onChange={handleConfigChange} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10 top-[120px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </main>
  );
}
