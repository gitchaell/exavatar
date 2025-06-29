import parse from 'npm:color-parse'

export function parseColor(input: string): string {
	if (input.startsWith('gradient(')) return input
	try {
		parse(input)
		return input
	} catch {
		throw new Error('Invalid color')
	}
}
