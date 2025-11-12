"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { LSystemConfig, RenderMode, ColorPalette } from "@/types/lsystem";
import LSystemCanvas, { LSystemCanvasRef } from "./LSystemCanvas";
import LSystem3DCanvas, { LSystem3DCanvasRef } from "./LSystem3DCanvas";

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
