export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'gif';

export class Format {
  private constructor(public readonly value: ImageFormat) {}

  static create(input?: string | null): Format {
    const fmt = (input || 'png').toLowerCase();
    if (!['png', 'jpeg', 'webp', 'gif'].includes(fmt)) {
      throw new Error('Invalid format');
    }
    return new Format(fmt as ImageFormat);
  }
}
