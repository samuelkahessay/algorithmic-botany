"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { LSystem } from "@/lib/lsystem";
import { TurtleGraphics } from "@/lib/turtle";
import { LSystemConfig, ColorPalette } from "@/types/lsystem";

interface LSystemCanvasProps {
  config: LSystemConfig;
  palette: ColorPalette;
  width?: number;
  height?: number;
}

export interface LSystemCanvasRef {
  exportPNG: () => string;
  getCanvas: () => HTMLCanvasElement | null;
}

const LSystemCanvas = forwardRef<LSystemCanvasRef, LSystemCanvasProps>(
  function LSystemCanvas({ config, palette, width = 800, height = 600 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
      exportPNG: () => {
        if (canvasRef.current) {
          return canvasRef.current.toDataURL("image/png");
        }
        return "";
      },
      getCanvas: () => canvasRef.current,
    }));

    // Handle wheel for zoom
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom((prev) => Math.min(Math.max(0.1, prev * delta), 10));
      };

      canvas.addEventListener("wheel", handleWheel, { passive: false });
      return () => canvas.removeEventListener("wheel", handleWheel);
    }, []);

    // Handle mouse events for pan
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging) return;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    // Reset zoom and pan
    const handleDoubleClick = () => {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      // Clear canvas and fill with background color
      ctx.fillStyle = palette.background || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply transformations: translate to center, apply zoom and pan, translate back
      ctx.save();

      // Move to center of canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Apply zoom
      ctx.scale(zoom, zoom);

      // Apply pan (scaled by zoom for proper movement)
      ctx.translate(pan.x / zoom, pan.y / zoom);

      // Move back so turtle can draw from center
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Generate L-system string
      const lsystem = new LSystem(config);
      const commands = lsystem.generate();

      // Create turtle graphics renderer at normal size
      const turtle = new TurtleGraphics(
        canvas,
        config.stepLength || 10,
        config.angle,
        config.startAngle || 0
      );

      // Draw (turtle handles its own centering/scaling) with palette color
      turtle.draw(commands, palette.branch);

      // Restore context
      ctx.restore();
    } catch (error) {
      console.error("Error rendering L-system:", error);
      // Clear canvas on error
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ef4444";
      ctx.font = "14px monospace";
      ctx.fillText("Error rendering L-system", 20, 30);
    }
  }, [config, palette, zoom, pan]);

    return (
      <div ref={containerRef} className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
          className={`border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "none" }}
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
          Zoom: {(zoom * 100).toFixed(0)}% | 🖱️ Drag to pan | 🖱️ Scroll to zoom | Double-click to reset
        </div>
      </div>
    );
  }
);

export default LSystemCanvas;
