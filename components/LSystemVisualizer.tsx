"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import dynamic from "next/dynamic";
import { LSystemConfig, RenderMode, ColorPalette } from "@/types/lsystem";
import LSystemCanvas, { LSystemCanvasRef } from "./LSystemCanvas";
import type { LSystem3DCanvasRef } from "./LSystem3DCanvas";

// Dynamically import 3D canvas with SSR disabled to prevent build-time Three.js evaluation
const LSystem3DCanvas = dynamic(
  () => import("./LSystem3DCanvas"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600"
        style={{ width: 800, height: 600 }}
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading 3D renderer...</p>
        </div>
      </div>
    )
  }
);

interface LSystemVisualizerProps {
  config: LSystemConfig;
  palette: ColorPalette;
  mode: RenderMode;
  width?: number;
  height?: number;
}

export interface LSystemVisualizerRef {
  exportPNG: () => Promise<string>;
}

const LSystemVisualizer = forwardRef<LSystemVisualizerRef, LSystemVisualizerProps>(
  function LSystemVisualizer({ config, palette, mode, width = 800, height = 600 }, ref) {
    const canvas2DRef = useRef<LSystemCanvasRef>(null);
    const canvas3DRef = useRef<LSystem3DCanvasRef>(null);

    useImperativeHandle(ref, () => ({
      exportPNG: async () => {
        if (mode === "2d" && canvas2DRef.current) {
          return canvas2DRef.current.exportPNG();
        } else if (mode === "3d" && canvas3DRef.current) {
          return await canvas3DRef.current.exportPNG();
        }
        return "";
      },
    }));

    return (
      <div>
        {mode === "2d" ? (
          <LSystemCanvas
            ref={canvas2DRef}
            config={config}
            palette={palette}
            width={width}
            height={height}
          />
        ) : (
          <LSystem3DCanvas
            ref={canvas3DRef}
            config={config}
            palette={palette}
            width={width}
            height={height}
          />
        )}
      </div>
    );
  }
);

export default LSystemVisualizer;
