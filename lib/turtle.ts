import { TurtleState } from "@/types/lsystem";

export class TurtleGraphics {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: TurtleState;
  private stack: TurtleState[] = [];
  private stepLength: number;
  private angle: number;
  private bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

  constructor(
    canvas: HTMLCanvasElement,
    stepLength: number = 10,
    angle: number = 90,
    startAngle: number = 0
  ) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get canvas context");
    }
    this.ctx = context;
    this.stepLength = stepLength;
    this.angle = angle;

    // Start in the middle of the canvas
    this.state = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: startAngle,
    };
  }

  /**
   * Clear the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  }

  /**
   * Reset turtle to initial position
   */
  reset(startAngle: number = 0) {
    this.state = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      angle: startAngle,
    };
    this.stack = [];
  }

  /**
   * Draw the L-system by interpreting commands
   *
   * Standard turtle commands:
   * F - Move forward and draw a line
   * f - Move forward without drawing
   * + - Turn right by angle
   * - - Turn left by angle
   * [ - Push current state onto stack
   * ] - Pop state from stack
   * Other characters are ignored
   */
  draw(commands: string, color: string = "#2d5016") {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    // First pass: calculate bounds
    this.calculateBounds(commands);

    // Reset and adjust for centering
    const centerX = (this.bounds.minX + this.bounds.maxX) / 2;
    const centerY = (this.bounds.minY + this.bounds.maxY) / 2;
    const width = this.bounds.maxX - this.bounds.minX;
    const height = this.bounds.maxY - this.bounds.minY;

    // Calculate scale to fit in canvas with padding
    const padding = 40;
    const scaleX = (this.canvas.width - padding * 2) / Math.max(width, 1);
    const scaleY = (this.canvas.height - padding * 2) / Math.max(height, 1);
    const scale = Math.min(scaleX, scaleY, 5); // Cap scale at 5x

    // Reset turtle
    this.reset();
    this.stepLength = this.stepLength * scale;

    // Offset to center the drawing
    const offsetX = this.canvas.width / 2 - centerX * scale;
    const offsetY = this.canvas.height / 2 - centerY * scale;

    this.state.x = this.canvas.width / 2 - (centerX - this.canvas.width / 2) * scale;
    this.state.y = this.canvas.height / 2 - (centerY - this.canvas.height / 2) * scale;

    // Second pass: actually draw
    this.ctx.beginPath();

    for (const command of commands) {
      this.executeCommand(command);
    }

    this.ctx.stroke();
  }

  /**
   * Calculate bounds without drawing
   */
  private calculateBounds(commands: string) {
    const originalState = { ...this.state };
    const originalStepLength = this.stepLength;

    this.reset();

    for (const command of commands) {
      switch (command) {
        case "F":
        case "G":
        case "f":
          this.updatePosition();
          this.updateBounds();
          break;
        case "+":
          this.state.angle += this.angle;
          break;
        case "-":
          this.state.angle -= this.angle;
          break;
        case "[":
          this.stack.push({ ...this.state });
          break;
        case "]":
          if (this.stack.length > 0) {
            this.state = this.stack.pop()!;
          }
          break;
      }
    }

    this.state = originalState;
    this.stepLength = originalStepLength;
  }

  /**
   * Execute a single turtle command
   */
  private executeCommand(command: string) {
    switch (command) {
      case "F":
      case "G":
        // Draw forward (both F and G draw)
        this.ctx.moveTo(this.state.x, this.state.y);
        this.updatePosition();
        this.ctx.lineTo(this.state.x, this.state.y);
        break;

      case "f":
        // Move forward without drawing
        this.updatePosition();
        break;

      case "+":
        // Turn right
        this.state.angle += this.angle;
        break;

      case "-":
        // Turn left
        this.state.angle -= this.angle;
        break;

      case "[":
        // Push state
        this.stack.push({ ...this.state });
        break;

      case "]":
        // Pop state
        if (this.stack.length > 0) {
          this.state = this.stack.pop()!;
          this.ctx.moveTo(this.state.x, this.state.y);
        }
        break;

      // Ignore other characters
      default:
        break;
    }
  }

  /**
   * Update turtle position based on current angle
   */
  private updatePosition() {
    const radians = (this.state.angle * Math.PI) / 180;
    this.state.x += Math.cos(radians) * this.stepLength;
    this.state.y += Math.sin(radians) * this.stepLength;
  }

  /**
   * Update bounds tracking
   */
  private updateBounds() {
    this.bounds.minX = Math.min(this.bounds.minX, this.state.x);
    this.bounds.minY = Math.min(this.bounds.minY, this.state.y);
    this.bounds.maxX = Math.max(this.bounds.maxX, this.state.x);
    this.bounds.maxY = Math.max(this.bounds.maxY, this.state.y);
  }

  /**
   * Export canvas as PNG
   */
  exportPNG(): string {
    return this.canvas.toDataURL("image/png");
  }

  /**
   * Export canvas as SVG (simplified version)
   */
  exportSVG(): string {
    // Note: This is a simplified implementation
    // For production, consider using a library like canvas2svg
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.canvas.width}" height="${this.canvas.height}">
      <!-- SVG export would require re-drawing with SVG commands -->
      <text x="10" y="20">SVG export requires additional implementation</text>
    </svg>`;
  }
}
