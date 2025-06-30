import parse from 'color-parse'

export function parseColor(input: string): string {
	if (input.startsWith('gradient(')) return input

	// Use color-parse to validate the color
	const result = parse(input)
	if (!result || result.space === undefined) {
		throw new Error('Invalid color')
	}

	return input
}
