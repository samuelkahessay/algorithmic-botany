import * as THREE from 'three';
import { TurtleState3D } from '@/types/lsystem';

interface Branch {
  start: THREE.Vector3;
  end: THREE.Vector3;
  thickness: number;
}

interface Leaf {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  size: number;
}

export class TurtleGraphics3D {
  private state: TurtleState3D;
  private stack: TurtleState3D[] = [];
  private branches: Branch[] = [];
  private leaves: Leaf[] = [];
  private stepLength: number;
  private angle: number;
  private thickness: number;
  private thicknessReduction: number;
  private leafSize: number;
  private tropism: THREE.Vector3;

  constructor(
    stepLength: number = 1,
    angle: number = 25.7,
    thickness: number = 0.1,
    thicknessReduction: number = 0.7,
    leafSize: number = 0.2,
    tropism: { x: number; y: number; z: number } = { x: 0, y: -0.2, z: 0 }
  ) {
    this.stepLength = stepLength;
    this.angle = angle;
    this.thickness = thickness;
    this.thicknessReduction = thicknessReduction;
    this.leafSize = leafSize;
    this.tropism = new THREE.Vector3(tropism.x, tropism.y, tropism.z);

    // Initialize turtle state
    // Start at origin, pointing up (Y-axis)
    this.state = {
      position: { x: 0, y: 0, z: 0 },
      heading: { x: 0, y: 1, z: 0 },    // Up (Y+)
      left: { x: -1, y: 0, z: 0 },      // Left (X-)
      up: { x: 0, y: 0, z: 1 },         // Forward screen (Z+)
      thickness: this.thickness,
    };
  }

  /**
   * Reset turtle to initial state
   */
  reset() {
    this.state = {
      position: { x: 0, y: 0, z: 0 },
      heading: { x: 0, y: 1, z: 0 },
      left: { x: -1, y: 0, z: 0 },
      up: { x: 0, y: 0, z: 1 },
      thickness: this.thickness,
    };
    this.stack = [];
    this.branches = [];
    this.leaves = [];
  }

  /**
   * Process L-system commands and build 3D geometry
   *
   * 3D Turtle Commands:
   * F, G - Move forward and draw cylinder (branch)
   * f    - Move forward without drawing
   * +    - Turn left (rotate around up axis)
   * -    - Turn right (rotate around up axis)
   * ^    - Pitch up (rotate around left axis)
   * &    - Pitch down (rotate around left axis)
   * \    - Roll left (rotate around heading axis)
   * /    - Roll right (rotate around heading axis)
   * |    - Turn around 180 degrees
   * [    - Push current state onto stack
   * ]    - Pop state from stack
   * !    - Reduce thickness
   * '    - Increase thickness
   */
  interpret(commands: string): { branches: Branch[]; leaves: Leaf[] } {
    this.reset();

    for (const command of commands) {
      this.executeCommand(command);
    }

    return {
      branches: this.branches,
      leaves: this.leaves,
    };
  }

  /**
   * Execute a single turtle command
   */
  private executeCommand(command: string) {
    switch (command) {
      case 'F':
      case 'G':
        // Draw forward (create branch)
        this.drawForward();
        break;

      case 'f':
        // Move forward without drawing
        this.moveForward();
        break;

      case '+':
        // Turn left (yaw left)
        this.rotateAroundAxis(this.getUpVector(), this.angle);
        break;

      case '-':
        // Turn right (yaw right)
        this.rotateAroundAxis(this.getUpVector(), -this.angle);
        break;

      case '^':
        // Pitch up
        this.rotateAroundAxis(this.getLeftVector(), this.angle);
        break;

      case '&':
        // Pitch down
        this.rotateAroundAxis(this.getLeftVector(), -this.angle);
        break;

      case '\\':
        // Roll left
        this.rotateAroundAxis(this.getHeadingVector(), this.angle);
        break;

      case '/':
        // Roll right
        this.rotateAroundAxis(this.getHeadingVector(), -this.angle);
        break;

      case '|':
        // Turn around
        this.rotateAroundAxis(this.getUpVector(), 180);
        break;

      case '[':
        // Push state
        this.stack.push(this.copyState());
        break;

      case ']':
        // Pop state
        if (this.stack.length > 0) {
          const poppedState = this.stack.pop()!;
          this.state = poppedState;

          // Add a leaf at branch tips when returning from a branch
          this.addLeaf();
        }
        break;

      case '!':
        // Reduce thickness
        this.state.thickness *= 0.7;
        break;

      case "'":
        // Increase thickness (rarely used)
        this.state.thickness *= 1.4;
        break;

      default:
        // Ignore unknown characters
        break;
    }
  }

  /**
   * Draw forward and create a branch
   */
  private drawForward() {
    const start = this.getPositionVector();

    // Apply tropism (gravitational bending)
    if (this.tropism.length() > 0) {
      const heading = this.getHeadingVector();
      heading.add(this.tropism.clone().multiplyScalar(0.1));
      heading.normalize();
      this.setHeadingVector(heading);
      this.updateOrthogonalVectors();
    }

    this.moveForward();
    const end = this.getPositionVector();

    // Create branch
    this.branches.push({
      start: start.clone(),
      end: end.clone(),
      thickness: this.state.thickness,
    });
  }

  /**
   * Move forward without drawing
   */
  private moveForward() {
    const heading = this.getHeadingVector();
    const displacement = heading.multiplyScalar(this.stepLength);
    const position = this.getPositionVector();
    position.add(displacement);
    this.setPositionVector(position);
  }

  /**
   * Add a leaf at the current position
   */
  private addLeaf() {
    const position = this.getPositionVector();
    const normal = this.getHeadingVector();

    this.leaves.push({
      position: position.clone(),
      normal: normal.clone(),
      size: this.leafSize,
    });
  }

  /**
   * Rotate heading, left, and up vectors around an arbitrary axis
   */
  private rotateAroundAxis(axis: THREE.Vector3, angleDegrees: number) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angleRadians);

    const heading = this.getHeadingVector();
    const left = this.getLeftVector();
    const up = this.getUpVector();

    heading.applyQuaternion(quaternion);
    left.applyQuaternion(quaternion);
    up.applyQuaternion(quaternion);

    this.setHeadingVector(heading);
    this.setLeftVector(left);
    this.setUpVector(up);
  }

  /**
   * Update left and up vectors to maintain orthogonality with heading
   */
  private updateOrthogonalVectors() {
    const heading = this.getHeadingVector();
    const up = this.getUpVector();

    // Recompute left = heading × up
    const left = new THREE.Vector3().crossVectors(heading, up).normalize();

    // Recompute up = left × heading to ensure orthogonality
    const newUp = new THREE.Vector3().crossVectors(left, heading).normalize();

    this.setLeftVector(left);
    this.setUpVector(newUp);
  }

  /**
   * Copy current state
   */
  private copyState(): TurtleState3D {
    return {
      position: { ...this.state.position },
      heading: { ...this.state.heading },
      left: { ...this.state.left },
      up: { ...this.state.up },
      thickness: this.state.thickness,
    };
  }

  // Helper methods to convert between plain objects and THREE.Vector3

  private getPositionVector(): THREE.Vector3 {
    return new THREE.Vector3(
      this.state.position.x,
      this.state.position.y,
      this.state.position.z
    );
  }

  private setPositionVector(v: THREE.Vector3) {
    this.state.position.x = v.x;
    this.state.position.y = v.y;
    this.state.position.z = v.z;
  }

  private getHeadingVector(): THREE.Vector3 {
    return new THREE.Vector3(
      this.state.heading.x,
      this.state.heading.y,
      this.state.heading.z
    ).normalize();
  }

  private setHeadingVector(v: THREE.Vector3) {
    v.normalize();
    this.state.heading.x = v.x;
    this.state.heading.y = v.y;
    this.state.heading.z = v.z;
  }

  private getLeftVector(): THREE.Vector3 {
    return new THREE.Vector3(
      this.state.left.x,
      this.state.left.y,
      this.state.left.z
    ).normalize();
  }

  private setLeftVector(v: THREE.Vector3) {
    v.normalize();
    this.state.left.x = v.x;
    this.state.left.y = v.y;
    this.state.left.z = v.z;
  }

  private getUpVector(): THREE.Vector3 {
    return new THREE.Vector3(
      this.state.up.x,
      this.state.up.y,
      this.state.up.z
    ).normalize();
  }

  private setUpVector(v: THREE.Vector3) {
    v.normalize();
    this.state.up.x = v.x;
    this.state.up.y = v.y;
    this.state.up.z = v.z;
  }

  /**
   * Build Three.js geometry from branches and leaves
   */
  buildGeometry(): { branchGeometry: THREE.BufferGeometry; leafGeometry: THREE.BufferGeometry } {
    const branchGeometry = this.buildBranchGeometry();
    const leafGeometry = this.buildLeafGeometry();

    return { branchGeometry, leafGeometry };
  }

  /**
   * Build branch geometry as cylinders
   */
  private buildBranchGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];

    const segments = 8; // Radial segments for cylinder
    let vertexIndex = 0;

    for (const branch of this.branches) {
      const direction = new THREE.Vector3()
        .subVectors(branch.end, branch.start)
        .normalize();

      // Create perpendicular vectors for cylinder
      const perpendicular1 = new THREE.Vector3();
      if (Math.abs(direction.y) < 0.9) {
        perpendicular1.set(0, 1, 0).cross(direction).normalize();
      } else {
        perpendicular1.set(1, 0, 0).cross(direction).normalize();
      }
      const perpendicular2 = new THREE.Vector3().crossVectors(direction, perpendicular1);

      const radius = branch.thickness;

      // Create cylinder vertices
      const startVertices: THREE.Vector3[] = [];
      const endVertices: THREE.Vector3[] = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const offset = perpendicular1.clone().multiplyScalar(cos * radius)
          .add(perpendicular2.clone().multiplyScalar(sin * radius));

        startVertices.push(branch.start.clone().add(offset));
        endVertices.push(branch.end.clone().add(offset.multiplyScalar(0.7))); // Taper
      }

      // Add vertices and indices
      const baseIndex = vertexIndex;

      for (let i = 0; i <= segments; i++) {
        // Start cap
        positions.push(startVertices[i].x, startVertices[i].y, startVertices[i].z);
        const normal1 = startVertices[i].clone().sub(branch.start).normalize();
        normals.push(normal1.x, normal1.y, normal1.z);

        // End cap
        positions.push(endVertices[i].x, endVertices[i].y, endVertices[i].z);
        const normal2 = endVertices[i].clone().sub(branch.end).normalize();
        normals.push(normal2.x, normal2.y, normal2.z);

        if (i < segments) {
          const current = baseIndex + i * 2;
          const next = baseIndex + (i + 1) * 2;

          // Two triangles per quad
          indices.push(current, next, current + 1);
          indices.push(current + 1, next, next + 1);
        }
      }

      vertexIndex += (segments + 1) * 2;
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);

    return geometry;
  }

  /**
   * Build leaf geometry as simple billboards or small spheres
   */
  private buildLeafGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (const leaf of this.leaves) {
      positions.push(leaf.position.x, leaf.position.y, leaf.position.z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    return geometry;
  }
}
