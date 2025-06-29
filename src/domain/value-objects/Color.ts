import { parseColor } from '../../shared/colorParser.ts'
export class Color {
	private constructor(public readonly value: string) {}

	static create(input?: string | null): Color {
		const color = parseColor(input || '#ccc')
		// Very naive validation: non-empty string
		if (color.length === 0) throw new Error('Invalid color')
		return new Color(color)
	}
}
