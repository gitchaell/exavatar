interface ColorParseResult {
	space?: string
	values?: number[]
	alpha?: number
}

export class ColorParser {
	private static hexToRgb(hex: string): number[] | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ?
				[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
			:	null
	}

	private static parseRgb(input: string): ColorParseResult | null {
		let match = input.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*([\d.]+))?\s*\)$/i)

		if (!match) {
			match = input.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i)
		}

		if (!match) {
			match = input.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)(?:\s+\/\s*([\d.]+))?\s*\)$/i)
		}

		if (!match) {
			match = input.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\)$/i)
		}

		if (!match) return null

		return {
			space: 'rgb',
			values: [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)],
			alpha: match[4] ? parseFloat(match[4]) : 1,
		}
	}

	private static parseHsl(input: string): ColorParseResult | null {
		const match = input.match(/^hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)$/i)
		if (!match) return null

		return {
			space: 'hsl',
			values: [parseInt(match[1], 10), parseFloat(match[2]), parseFloat(match[3])],
			alpha: match[4] ? parseFloat(match[4]) : 1,
		}
	}

	static parse(input: string): ColorParseResult | null {
		if (!input) return null

		if (/^#?([a-f\d]{3,4}|[a-f\d]{6,8})$/i.test(input)) {
			const hex = input.startsWith('#') ? input.slice(1) : input

			if (hex.length === 3 || hex.length === 4) {
				const expanded = hex
					.split('')
					.map((c) => c + c)
					.join('')

				const rgb = ColorParser.hexToRgb(expanded)

				return rgb ? { space: 'rgb', values: rgb } : null
			}

			const rgb = ColorParser.hexToRgb(hex)

			return rgb ? { space: 'rgb', values: rgb } : null
		}

		if (input.startsWith('rgb')) {
			return ColorParser.parseRgb(input)
		}

		if (input.startsWith('hsl')) {
			return ColorParser.parseHsl(input)
		}

		const namedColors: Record<string, string> = {
			black: '#000000',
			white: '#ffffff',
			red: '#ff0000',
			green: '#008000',
			blue: '#0000ff',
		}

		const lowerInput = input.toLowerCase()

		if (namedColors[lowerInput]) {
			return ColorParser.parse(namedColors[lowerInput])
		}

		return null
	}
}
