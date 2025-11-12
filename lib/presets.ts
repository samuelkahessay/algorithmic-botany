import { Preset } from "@/types/lsystem";

export const presets: Preset[] = [
  // Fractals
  {
    id: "koch-curve",
    name: "Koch Curve",
    description: "Classic fractal snowflake pattern discovered by Helge von Koch",
    category: "fractal",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F+F-F-F+F" }],
      angle: 90,
      iterations: 4,
      stepLength: 5,
      startAngle: 0,
    },
  },
  {
    id: "koch-snowflake",
    name: "Koch Snowflake",
    description: "Triangular variant of the Koch curve forming a snowflake",
    category: "fractal",
    config: {
      axiom: "F++F++F",
      rules: [{ from: "F", to: "F-F++F-F" }],
      angle: 60,
      iterations: 4,
      stepLength: 5,
      startAngle: 0,
    },
  },
  {
    id: "sierpinski-triangle",
    name: "Sierpinski Triangle",
    description: "Famous fractal triangle with self-similar structure",
    category: "fractal",
    config: {
      axiom: "F-G-G",
      rules: [
        { from: "F", to: "F-G+F+G-F" },
        { from: "G", to: "GG" },
      ],
      angle: 120,
      iterations: 6,
      stepLength: 5,
      startAngle: 0,
    },
  },
  {
    id: "dragon-curve",
    name: "Dragon Curve",
    description: "Fractal curve that never crosses itself, resembling a dragon",
    category: "fractal",
    config: {
      axiom: "F",
      rules: [
        { from: "F", to: "F+G" },
        { from: "G", to: "F-G" },
      ],
      angle: 90,
      iterations: 10,
      stepLength: 5,
      startAngle: 0,
    },
  },
  {
    id: "hilbert-curve",
    name: "Hilbert Curve",
    description: "Space-filling curve that visits every point in a square",
    category: "fractal",
    config: {
      axiom: "A",
      rules: [
        { from: "A", to: "-BF+AFA+FB-" },
        { from: "B", to: "+AF-BFB-FA+" },
      ],
      angle: 90,
      iterations: 5,
      stepLength: 5,
      startAngle: 0,
    },
  },

  // Plants
  {
    id: "simple-plant",
    name: "Simple Plant",
    description: "Basic branching plant structure",
    category: "plant",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[+F]F[-F]F" }],
      angle: 25.7,
      iterations: 4,
      stepLength: 8,
      startAngle: -90,
    },
  },
  {
    id: "bushy-plant",
    name: "Bushy Plant",
    description: "Dense, bushy plant with multiple branches",
    category: "plant",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "FF-[-F+F+F]+[+F-F-F]" }],
      angle: 22.5,
      iterations: 4,
      stepLength: 6,
      startAngle: -90,
    },
  },
  {
    id: "weed",
    name: "Weed",
    description: "Asymmetric plant resembling a common weed",
    category: "plant",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[+F]F[-F][F]" }],
      angle: 20,
      iterations: 5,
      stepLength: 6,
      startAngle: -90,
    },
  },
  {
    id: "algae",
    name: "Algae",
    description: "Simple algae-like branching structure",
    category: "plant",
    config: {
      axiom: "F",
      rules: [
        { from: "F", to: "F[+F][-F]" },
      ],
      angle: 30,
      iterations: 5,
      stepLength: 8,
      startAngle: -90,
    },
  },

  // Trees
  {
    id: "binary-tree",
    name: "Binary Tree",
    description: "Symmetric binary branching tree",
    category: "tree",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[+F][-F]" }],
      angle: 30,
      iterations: 6,
      stepLength: 6,
      startAngle: -90,
    },
  },
  {
    id: "realistic-tree",
    name: "Realistic Tree",
    description: "More complex tree with natural-looking branches",
    category: "tree",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "FF+[+F-F-F]-[-F+F+F]" }],
      angle: 22.5,
      iterations: 4,
      stepLength: 5,
      startAngle: -90,
    },
  },
  {
    id: "pine-tree",
    name: "Pine Tree",
    description: "Coniferous tree with downward-sloping branches",
    category: "tree",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[-F][+F]F" }],
      angle: 35,
      iterations: 5,
      stepLength: 7,
      startAngle: -90,
    },
  },
  {
    id: "sakura-tree",
    name: "Sakura Tree",
    description: "Cherry blossom tree with delicate branches",
    category: "tree",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[++F][-F-F]" }],
      angle: 25,
      iterations: 5,
      stepLength: 6,
      startAngle: -90,
    },
  },

  // 3D-Specific Presets (optimized for 3D rendering)
  {
    id: "3d-bush",
    name: "3D Bush",
    description: "Full 3D bushy plant with pitch and roll",
    category: "plant",
    renderMode: "3d",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[&+F][&-F][^+F][^-F]" }],
      angle: 30,
      iterations: 4,
      stepLength: 1.2,
      thickness: 0.15,
      thicknessReduction: 0.65,
      leafSize: 0.3,
      tropism: { x: 0, y: -0.15, z: 0 },
    },
  },
  {
    id: "3d-realistic-tree",
    name: "3D Realistic Tree",
    description: "Natural-looking 3D tree with gravitational bending",
    category: "tree",
    renderMode: "3d",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[&+F]F[&-F][^F]" }],
      angle: 25,
      iterations: 5,
      stepLength: 1.0,
      thickness: 0.2,
      thicknessReduction: 0.7,
      leafSize: 0.25,
      tropism: { x: 0, y: -0.2, z: 0 },
    },
  },
  {
    id: "3d-conifer",
    name: "3D Conifer",
    description: "Coniferous tree with spiral phyllotaxis",
    category: "tree",
    renderMode: "3d",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[/&F][\\&F]F" }],
      angle: 35,
      iterations: 6,
      stepLength: 0.8,
      thickness: 0.15,
      thicknessReduction: 0.75,
      leafSize: 0.2,
      tropism: { x: 0, y: -0.1, z: 0 },
    },
  },
  {
    id: "3d-spiral-tree",
    name: "3D Spiral Tree",
    description: "Tree with spiral growth pattern using roll commands",
    category: "tree",
    renderMode: "3d",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[/+F][\\-F]F" }],
      angle: 20,
      iterations: 5,
      stepLength: 1.0,
      thickness: 0.12,
      thicknessReduction: 0.7,
      leafSize: 0.22,
      tropism: { x: 0, y: -0.18, z: 0 },
    },
  },
  {
    id: "3d-fractal-tree",
    name: "3D Fractal Tree",
    description: "Symmetric fractal tree in 3D space",
    category: "tree",
    renderMode: "3d",
    config: {
      axiom: "F",
      rules: [{ from: "F", to: "F[^+F][^-F][&+F][&-F]" }],
      angle: 30,
      iterations: 4,
      stepLength: 1.5,
      thickness: 0.18,
      thicknessReduction: 0.68,
      leafSize: 0.28,
    },
  },
  {
    id: "3d-hilbert",
    name: "3D Hilbert Curve",
    description: "3D space-filling Hilbert curve",
    category: "fractal",
    renderMode: "3d",
    config: {
      axiom: "X",
      rules: [
        { from: "X", to: "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->" },
      ],
      angle: 90,
      iterations: 2,
      stepLength: 1.0,
      thickness: 0.08,
      thicknessReduction: 1.0,
    },
  },
];

export function getPresetById(id: string): Preset | undefined {
  return presets.find((preset) => preset.id === id);
}

export function getPresetsByCategory(category: "fractal" | "plant" | "tree"): Preset[] {
  return presets.filter((preset) => preset.category === category);
}

export function get3DPresets(): Preset[] {
  return presets.filter((preset) => preset.renderMode === "3d");
}

export function get2DPresets(): Preset[] {
  return presets.filter((preset) => !preset.renderMode || preset.renderMode === "2d");
}
