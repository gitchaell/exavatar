import { Avatar } from './Avatar.ts'
import { ColorParser } from '../shared/ColorParser.ts'

export class AvatarSvgBuilder {
	private static readonly DEFAULT_TEXT_COLOR = '#FFFFFF'
	private static readonly DEFAULT_BACKGROUND_COLOR = '#000000'
	private static readonly DEFAULT_FONT_WEIGHT = 'bold'
	private static readonly DEFAULT_FONT_FAMILY = 'sans-serif'

	/**
	 * Builds a square SVG avatar based on the provided avatar configuration
	 * @param avatar The avatar configuration
	 * @returns Uint8Array containing the SVG data
	 * @throws {Error} If the avatar configuration is invalid
	 */
	static build(avatar: Avatar): Uint8Array {
		try {
			const size = avatar.size.value
			const backgroundColor = this.normalizeColor(avatar.color.value)
			const text = avatar.text.value
			const textColor = this.getContrastColor(backgroundColor)

			const svgParts: string[] = [
				`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" `,
				'xmlns="http://www.w3.org/2000/svg" ',
				'role="img" ',
				'aria-label="Generated avatar"',
				'>',
			]

			svgParts.push(`<rect width="100%" height="100%" fill="${backgroundColor}" />`)

			svgParts.push(this.createTextElement(text, size, textColor))

			svgParts.push('</svg>')

			return new TextEncoder().encode(svgParts.join(''))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
			throw new Error(`Failed to generate SVG avatar: ${errorMessage}`)
		}
	}

	private static createTextElement(text: string, size: number, color: string): string {
		const fontSize = Math.floor((size * 0.5) / (text.length > 1 ? 1.5 : 1))
		const yOffset = size * 0.55

		return `
      <text
        x="50%"
        y="${yOffset}"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="${fontSize}"
        font-weight="${this.DEFAULT_FONT_WEIGHT}"
        font-family="${this.DEFAULT_FONT_FAMILY}"
        fill="${color}"
        stroke="${this.adjustColorContrast(color, 0.3)}"
        stroke-width="${Math.max(1, size * 0.01)}"
        paint-order="stroke"
      >${this.escapeHtml(text)}</text>
    `
	}

	private static normalizeColor(color: string): string {
		const parsed = ColorParser.parse(color)

		if (!parsed) {
			console.warn(`Invalid color: ${color}, using default`)
			return this.DEFAULT_BACKGROUND_COLOR
		}

		switch (parsed.space) {
			case 'rgb':
				return `rgb(${parsed.values?.join(',')}${parsed.alpha !== 1 ? `,${parsed.alpha}` : ''})`
			case 'hsl':
				return `hsl(${parsed.values?.[0]}, ${parsed.values?.[1]}%, ${parsed.values?.[2]}%${
					parsed.alpha !== 1 ? `, ${parsed.alpha}` : ''
				})`
			default:
				return color
		}
	}

	private static getContrastColor(backgroundColor: string): string {
		try {
			const rgb = this.hexToRgb(backgroundColor)

			if (!rgb) return this.DEFAULT_TEXT_COLOR

			const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

			return brightness > 128 ? '#000000' : this.DEFAULT_TEXT_COLOR
		} catch (_error) {
			return this.DEFAULT_TEXT_COLOR
		}
	}

	private static hexToRgb(hex: string): [number, number, number] | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ?
				[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
			:	null
	}

	private static adjustColorContrast(color: string, factor: number): string {
		return color === '#FFFFFF' ? this.darkenColor(color, factor) : this.lightenColor(color, factor)
	}

	private static darkenColor(color: string, factor: number): string {
		const rgb = this.hexToRgb(color) || [0, 0, 0]
		return `rgb(${rgb.map((c) => Math.floor(c * (1 - factor))).join(',')})`
	}

	private static lightenColor(color: string, factor: number): string {
		const rgb = this.hexToRgb(color) || [0, 0, 0]
		return `rgb(${rgb.map((c) => Math.floor(c + (255 - c) * factor)).join(',')})`
	}

	private static escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	}
}
