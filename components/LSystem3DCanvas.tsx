"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { LSystem } from "@/lib/lsystem";
import { TurtleGraphics3D } from "@/lib/turtle3d";
import { LSystemConfig, ColorPalette } from "@/types/lsystem";

interface LSystem3DCanvasProps {
  config: LSystemConfig;
  palette: ColorPalette;
  width?: number;
  height?: number;
}

export interface LSystem3DCanvasRef {
  exportPNG: () => Promise<string>;
}

/**
 * Inner component that has access to Three.js context
 */
function Scene({ config, palette }: { config: LSystemConfig; palette: ColorPalette }) {
  const { gl, scene, camera } = useThree();
  const [geometry, setGeometry] = useState<{
    branchGeometry: THREE.BufferGeometry;
    leafGeometry: THREE.BufferGeometry;
  } | null>(null);

  // Set background color
  useEffect(() => {
    if (palette.background) {
      scene.background = new THREE.Color(palette.background);
    }
  }, [palette, scene]);

  useEffect(() => {
    try {
      // Generate L-system string
      const lsystem = new LSystem(config);
      const commands = lsystem.generate();

      // Create 3D turtle graphics
      const turtle = new TurtleGraphics3D(
        config.stepLength || 1,
        config.angle,
        config.thickness || 0.1,
        config.thicknessReduction || 0.7,
        config.leafSize || 0.2,
        config.tropism
      );

      // Interpret commands
      turtle.interpret(commands);

      // Build geometry
      const geometryData = turtle.buildGeometry();
      setGeometry(geometryData);
    } catch (error) {
      console.error("Error generating 3D L-system:", error);
    }
  }, [config]);

  if (!geometry) {
    return null;
  }

  return (
    <group>
      {/* Branches */}
      <mesh geometry={geometry.branchGeometry}>
        <meshStandardMaterial
          color={palette.branch}
          roughness={0.8}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Leaves */}
      <points geometry={geometry.leafGeometry}>
        <pointsMaterial
          color={palette.leaf}
          size={0.3}
          sizeAttenuation={true}
        />
      </points>

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      {/* OrbitControls for camera interaction */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={1.0}
        panSpeed={0.5}
        minDistance={0.5}
        maxDistance={500}
      />
    </group>
  );
}

const LSystem3DCanvas = forwardRef<LSystem3DCanvasRef, LSystem3DCanvasProps>(
  function LSystem3DCanvas({ config, palette, width = 800, height = 600 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      exportPNG: async () => {
        if (canvasRef.current) {
          return canvasRef.current.toDataURL("image/png");
        }
        return "";
      },
    }));

    return (
      <div className="relative" style={{ width, height }}>
        <Canvas
          ref={canvasRef}
          camera={{
            position: [0, 5, 10],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <Scene config={config} palette={palette} />
        </Canvas>

        {/* Controls hint */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
          🖱️ Left: Rotate | 🖱️ Right: Pan | Scroll: Zoom
        </div>
      </div>
    );
  }
);

export default LSystem3DCanvas;
