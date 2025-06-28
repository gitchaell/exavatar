import { Size } from './value-objects/Size.ts';
import { Format } from './value-objects/Format.ts';
import { Shape } from './value-objects/Shape.ts';
import { Color } from './value-objects/Color.ts';

export interface AvatarProps {
  id?: string | null;
  set?: string | null;
  size?: string | null;
  format?: string | null;
  text?: string | null;
  bg?: string | null;
  shape?: string | null;
  fg?: string | null;
}

export class Avatar {
  readonly size: Size;
  readonly format: Format;
  readonly shape: Shape;
  readonly bg: Color;
  readonly fg: Color;

  constructor(public readonly set: string, public readonly id: string, props: AvatarProps) {
    this.size = Size.create(props.size);
    this.format = Format.create(props.format);
    this.shape = Shape.create(props.shape);
    this.bg = Color.create(props.bg);
    this.fg = Color.create(props.fg);
    this.text = props.text || '';
  }

  text: string;

  get fileName() {
    return `${this.id}.${this.format.value}`;
  }
}
