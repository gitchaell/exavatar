export type AvatarShape = 'square' | 'circle' | 'rounded';

export class Shape {
  private constructor(public readonly value: AvatarShape) {}

  static create(input?: string | null): Shape {
    const shape = (input || 'square').toLowerCase();
    if (!['square', 'circle', 'rounded'].includes(shape)) {
      throw new Error('Invalid shape');
    }
    return new Shape(shape as AvatarShape);
  }
}
