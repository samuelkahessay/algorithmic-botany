export interface LSystemRule {
  from: string;
  to: string;
}

export interface LSystemConfig {
  axiom: string;
  rules: LSystemRule[];
  angle: number;
  iterations: number;
  stepLength?: number;
  startAngle?: number;
  // 3D-specific parameters
  thickness?: number;           // Initial branch thickness (default: 0.1)
  thicknessReduction?: number;  // Thickness reduction per branching (default: 0.7)
  leafSize?: number;            // Size of leaves at branch ends (default: 0.2)
  tropism?: { x: number; y: number; z: number };  // Gravitational tropism vector
}

export interface TurtleState {
  x: number;
  y: number;
  angle: number;
}

export interface TurtleState3D {
  position: { x: number; y: number; z: number };
  heading: { x: number; y: number; z: number };  // Forward direction
  left: { x: number; y: number; z: number };      // Left direction
  up: { x: number; y: number; z: number };        // Up direction
  thickness: number;                              // Current branch thickness
}

export interface DrawCommand {
  type: 'forward' | 'turn' | 'push' | 'pop';
  value?: number;
}

export type RenderMode = '2d' | '3d';

export interface ColorPalette {
  id: string;
  name: string;
  branch: string;        // Primary branch color
  branchDark?: string;   // Darker shade for depth (3D)
  leaf: string;          // Leaf/tip color
  background?: string;   // Optional background override
  description: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  category: 'fractal' | 'plant' | 'tree';
  config: LSystemConfig;
  renderMode?: RenderMode;  // Preferred render mode for this preset
}
