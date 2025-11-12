import { LSystemConfig, LSystemRule } from "@/types/lsystem";

export class LSystem {
  private axiom: string;
  private rules: Map<string, string>;
  private angle: number;
  private iterations: number;

  constructor(config: LSystemConfig) {
    this.axiom = config.axiom;
    this.rules = new Map(config.rules.map((rule) => [rule.from, rule.to]));
    this.angle = config.angle;
    this.iterations = config.iterations;
  }

  /**
   * Generate the L-system string by applying production rules iteratively
   */
  generate(): string {
    let current = this.axiom;

    for (let i = 0; i < this.iterations; i++) {
      current = this.applyRules(current);
    }

    return current;
  }

  /**
   * Apply production rules to a string
   */
  private applyRules(input: string): string {
    let result = "";

    for (const char of input) {
      // If there's a rule for this character, use it; otherwise keep the character
      result += this.rules.get(char) ?? char;
    }

    return result;
  }

  getAngle(): number {
    return this.angle;
  }

  getIterations(): number {
    return this.iterations;
  }
}

/**
 * Parse an L-system string and extract meaningful statistics
 */
export function analyzeLSystem(lsystemString: string): {
  length: number;
  commands: Record<string, number>;
} {
  const commands: Record<string, number> = {};

  for (const char of lsystemString) {
    commands[char] = (commands[char] || 0) + 1;
  }

  return {
    length: lsystemString.length,
    commands,
  };
}
