# Biological Modelling Visualizer

> Interactive L-System Editor and Turtle Graphics Renderer - Modern recreation of University of Calgary Algorithmic Botany research project (May 2018 – Sept. 2018)

## Overview

The Biological Modelling Visualizer is an interactive web application that enables users to view, interact with, and edit biological models based on Lindenmayer Systems (L-systems), fractals, and plant structures. This modern recreation brings the power of algorithmic botany to the browser using contemporary web technologies.

## Original Research Project (2018)

During my Research Assistant position at the University of Calgary's Algorithmic Botany group, I contributed to:

- ✅ **Major research project** based on a Java web application for viewing, interacting, and editing biological models
- ✅ **Implemented four features** which furthered the University of Calgary Computer Science Department's educational web application initiatives
- ✅ **Focus areas**: Lindenmayer Systems, Fractals, and Plant morphology
- ✅ **Supervised by**: Dr. Przemysław Prusinkiewicz (founder of Algorithmic Botany field)

## This Modern Rebuild

This repository contains a fully functional, modernized web application that recreates and extends the original functionality using 2025 best practices.

### Live Demo

![L-System Visualizer](https://via.placeholder.com/800x400/22c55e/ffffff?text=L-System+Visualizer)

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **2D Graphics**: HTML5 Canvas API with custom Turtle Graphics engine
- **🆕 3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS with responsive design
- **L-System Engine**: Custom TypeScript implementation
- **Architecture**: Modern App Router, client-side rendering for interactive graphics

## Features

### 1. 🆕 3D Visualization System
- **Full 3D rendering** using Three.js and React Three Fiber
- **Interactive 3D navigation**: Rotate, pan, and zoom with mouse controls
- **3D turtle graphics engine**: Supports pitch, roll, and yaw rotations
- **Realistic plant modeling**: Branch thickness tapering and gravitational tropism
- **Toggle between 2D and 3D**: Seamlessly switch rendering modes
- **6 new 3D-optimized presets**: Trees and plants designed for 3D space

### 2. Interactive L-System Editor
- **Real-time editing** of axiom and production rules
- **Live preview** that updates instantly as you type
- **Parameter controls**: Adjust angle and iteration depth with sliders
- **Rule management**: Add/remove production rules dynamically
- **Syntax helpers**: Built-in reference for turtle graphics commands
- **3D parameters**: Control thickness, taper, leaf size, and gravitational bending

### 3. Comprehensive Preset Library

**19 Pre-configured L-Systems** across three categories (13 original + 6 new 3D presets):

#### Fractals
- Koch Curve
- Koch Snowflake
- Sierpinski Triangle
- Dragon Curve
- Hilbert Curve

#### Plants
- Simple Plant
- Bushy Plant
- Weed
- Algae

#### Trees
- Binary Tree
- Realistic Tree
- Pine Tree
- Sakura Tree

#### 🆕 3D-Optimized Trees & Plants
- 3D Bush (multi-directional branching)
- 3D Realistic Tree (with gravitational bending)
- 3D Conifer (spiral phyllotaxis)
- 3D Spiral Tree (helical growth)
- 3D Fractal Tree (symmetric 3D branching)
- 3D Hilbert Curve (3D space-filling pattern)

### 4. Advanced Turtle Graphics Renderer
- **2D Mode**: Canvas-based rendering with automatic centering and scaling
- **3D Mode**: WebGL-based rendering with Three.js
- **Stack-based state management** for branching structures
- **Optimized rendering** for complex patterns
- **Interactive controls**: Zoom, pan (2D) and orbit (3D)
- **Dark mode support** for comfortable viewing

### 5. Export Capabilities
- **PNG Export**: Download high-quality images from both 2D and 3D views
- **One-click export** with automatic filename generation
- **Full resolution** preserves all detail

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/samuelkahessay/algorithmic-botany.git
cd algorithmic-botany

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3001` to use the application (runs on port 3001 to avoid conflicts).

## How It Works

### L-Systems Fundamentals

**Lindenmayer Systems** (L-systems) are a mathematical formalism for modeling the growth processes of plants and other organisms. They consist of:

1. **Axiom**: Starting string (e.g., "F")
2. **Production Rules**: Transformation rules (e.g., F → F[+F][-F])
3. **Iterations**: Number of times to apply rules

### Turtle Graphics Interpretation

#### 2D Turtle Commands

The L-system string is interpreted using **turtle graphics commands**:

| Command | Action |
|---------|--------|
| `F` | Move forward and draw a line |
| `f` | Move forward without drawing |
| `+` | Turn right by specified angle |
| `-` | Turn left by specified angle |
| `[` | Push current state onto stack (for branching) |
| `]` | Pop state from stack (return to branch point) |

#### 🆕 3D Turtle Commands

For 3D visualization, additional commands control movement in 3D space:

| Command | Action | Axis |
|---------|--------|------|
| `F`, `G` | Move forward and draw cylinder (branch) | Heading |
| `f` | Move forward without drawing | Heading |
| `+` | Turn left (yaw) | Up axis |
| `-` | Turn right (yaw) | Up axis |
| `^` | Pitch up | Left axis |
| `&` | Pitch down | Left axis |
| `/` | Roll right | Heading axis |
| `\` | Roll left | Heading axis |
| `\|` | Turn around 180° | Up axis |
| `[` | Push state (position + orientation + thickness) | - |
| `]` | Pop state and add leaf at branch tip | - |
| `!` | Reduce branch thickness | - |

**3D Parameters:**
- **Thickness**: Initial branch diameter
- **Thickness Taper**: How much branches thin out (0.5-0.95)
- **Leaf Size**: Size of leaf markers at branch tips
- **Gravitational Tropism**: Simulates gravity pulling branches downward

### Example: Simple Plant

```
Axiom: F
Rule: F → F[+F]F[-F]F
Angle: 25.7°
Iterations: 4
```

**Generation Process:**
```
n=0: F
n=1: F[+F]F[-F]F
n=2: F[+F]F[-F]F[+F[+F]F[-F]F]F[+F]F[-F]F[-F[+F]F[-F]F]F[+F]F[-F]F
... (exponential growth)
```

This creates a realistic branching plant structure!

## Architecture

```
algorithmic-botany/
├── app/
│   ├── page.tsx                    # Main application page with 2D/3D toggle
│   ├── layout.tsx                  # Root layout with metadata
│   └── globals.css                 # Global styles
├── components/
│   ├── LSystemCanvas.tsx           # 2D Canvas renderer component
│   ├── LSystem3DCanvas.tsx         # 🆕 3D WebGL renderer with Three.js
│   ├── LSystemVisualizer.tsx       # 🆕 Unified 2D/3D visualizer
│   ├── ViewToggle.tsx              # 🆕 2D/3D mode switcher
│   ├── Controls3D.tsx              # 🆕 3D parameter controls
│   ├── LSystemEditor.tsx           # Interactive parameter editor
│   └── PresetSelector.tsx          # Preset gallery
├── lib/
│   ├── lsystem.ts                  # L-system parser and generator
│   ├── turtle.ts                   # 2D Turtle graphics engine
│   ├── turtle3d.ts                 # 🆕 3D Turtle graphics engine
│   └── presets.ts                  # Preset configurations (13 2D + 6 3D)
├── types/
│   └── lsystem.ts                  # TypeScript interfaces (with 3D types)
└── public/                         # Static assets
```

## Technical Highlights

### Custom L-System Engine

```typescript
class LSystem {
  generate(): string {
    let current = this.axiom;
    for (let i = 0; i < this.iterations; i++) {
      current = this.applyRules(current);
    }
    return current;
  }
}
```

### Intelligent Turtle Graphics

#### 2D Turtle Graphics
Features include:
- **Two-pass rendering**: First calculates bounds, then centers and scales
- **Stack-based branching**: Maintains state stack for complex structures
- **Automatic fitting**: Scales drawing to fill canvas optimally
- **Performance optimization**: Handles strings with 10,000+ commands

#### 🆕 3D Turtle Graphics
Advanced 3D implementation:
- **Quaternion-based rotations**: Smooth 3D orientation using Three.js
- **Triple-vector system**: Maintains heading, left, and up vectors for full 3D orientation
- **Procedural geometry generation**: Builds Three.js meshes from L-system commands
- **Cylindrical branches**: Realistic branch geometry with thickness tapering
- **Tropism simulation**: Gravitational bending for natural plant appearance
- **Dynamic leaf placement**: Automatic leaf markers at branch tips
- **Optimized rendering**: Efficient BufferGeometry for complex 3D structures

```typescript
// 3D Turtle State
interface TurtleState3D {
  position: Vector3;
  heading: Vector3;  // Forward direction
  left: Vector3;     // Left direction
  up: Vector3;       // Up direction
  thickness: number; // Current branch thickness
}
```

### Responsive Design

- **Desktop**: Three-column layout (presets | canvas | editor)
- **Tablet**: Stacked layout with scrolling
- **Mobile**: Single-column responsive design
- **Dark Mode**: Full support with system preference detection

## Educational Value

This project demonstrates:

### Computer Science Concepts
- **Formal Grammars**: String rewriting systems
- **Recursion**: Self-similar patterns
- **Stack Data Structures**: State management in turtle graphics
- **Computational Geometry**: 2D transformations and rendering

### Biological Modeling
- **Morphogenesis**: How simple rules create complex forms
- **Self-similarity**: Fractal structures in nature
- **Growth Patterns**: Algorithmic representation of development
- **Branching Structures**: Tree and plant topology

### Software Engineering
- **Component Architecture**: Reusable React components
- **Type Safety**: Full TypeScript implementation
- **Performance Optimization**: Efficient rendering algorithms
- **User Experience**: Real-time interactive feedback

## Future Enhancements

To match advanced research capabilities:

### Advanced Features
- [x] ✅ **3D Rendering**: Three.js integration for 3D plant structures (COMPLETED!)
- [ ] **Parametric L-systems**: Context-sensitive rules with variables
- [ ] **Stochastic L-systems**: Probabilistic rule selection
- [ ] **Animation**: Growth animations showing iterative development
- [ ] **🆕 OBJ/GLTF Export**: Export 3D models for use in other software

### Sharing & Collaboration
- [ ] **URL State**: Share configurations via URL parameters
- [ ] **Gallery**: Community-submitted L-systems
- [ ] **Code Generation**: Export as code for other platforms
- [ ] **Documentation**: Interactive tutorials for learning

### Advanced Visualization
- [ ] **Color Mapping**: Age-based or rule-based coloring (e.g., season-based, age gradient)
- [ ] **Enhanced Leaf Rendering**: Polygonal leaves with realistic shapes
- [ ] **Textures**: Realistic bark and leaf textures using texture maps
- [ ] **SVG Export**: Vector graphics for scalable 2D output
- [ ] **🆕 Lighting Controls**: Adjustable lighting for 3D scenes
- [ ] **🆕 Material Editor**: Custom materials (bark, leaves, flowers)

## Research Context

### About Algorithmic Botany

The Algorithmic Botany research group at the University of Calgary, founded by **Dr. Przemysław Prusinkiewicz**, is internationally renowned for:

- Pioneering the application of L-systems to plant modeling
- Publishing *"The Algorithmic Beauty of Plants"* (1990) - foundational textbook
- Developing software tools (vlab, lpfg) used worldwide
- Contributing to computer graphics, biology, and mathematics

### Applications

L-systems and algorithmic botany have practical applications in:

- **Computer Graphics**: Movies and video games (realistic vegetation)
- **Architecture**: Procedural building and city generation
- **Biology**: Understanding plant development and morphology
- **Art**: Generative art and design
- **Education**: Teaching recursion, fractals, and formal systems

## Development

### Project Structure

The codebase follows best practices:
- **TypeScript**: Full type safety throughout
- **Modular Design**: Separated concerns (rendering, logic, UI)
- **Clean Code**: Well-documented, readable, maintainable
- **Performance**: Optimized for real-time rendering

### Running Tests

```bash
# Type checking
npm run build

# Linting
npm run lint
```

## Resources & References

### Essential Reading
- [The Algorithmic Beauty of Plants](http://algorithmicbotany.org/papers/#abop) - Free online version
- [L-systems on Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [Algorithmic Botany at UofC](http://algorithmicbotany.org/)

### Interactive Tutorials
- [Paul Bourke's L-Systems](http://paulbourke.net/fractals/lsys/)
- [Fractal Foundation](https://fractalfoundation.org/)

### Research Papers
- Prusinkiewicz & Lindenmayer (1990). *The Algorithmic Beauty of Plants*
- Prusinkiewicz (1986). "Graphical applications of L-systems"

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samuelkahessay/algorithmic-botany)

Or deploy to:
- Netlify
- AWS Amplify
- GitHub Pages (with static export)
- Any Node.js hosting

## License

This project is for educational and portfolio demonstration purposes.

## Acknowledgments

- **Dr. Przemysław Prusinkiewicz** - Founder of Algorithmic Botany
- **University of Calgary CS Department** - Research opportunity
- **Original vlab team** - Inspiration for interface design
- *The Algorithmic Beauty of Plants* - Foundational knowledge

---

**Built with 🌿 by Samuel Kahessay**

Research experience: May 2018 – September 2018
Modern rebuild: 2025

[Portfolio](https://samuelkahessay.github.io) | [LinkedIn](https://linkedin.com/in/samuelkahessay) | [GitHub](https://github.com/samuelkahessay)
