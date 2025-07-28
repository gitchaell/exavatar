import { ExavatarError } from '../shared/ExavatarError.ts'
import { colord, extend, random, Plugin } from 'colord'
import namesPlugin from 'colord/plugins/names'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'

extend([namesPlugin, mixPlugin, harmoniesPlugin] as unknown as Plugin[])

/**
 * Value Object representing avatar color with smart foreground/background contrast.
 * Handles color validation, generation, and automatic contrast calculation.
 *
 * @example
 * ```typescript
 * const color = AvatarColor.create('#3b82f6')
 * console.log(color.background()) // '#3b82f6'
 * console.log(color.foreground()) // '#ffffff' (auto-calculated contrast)
 * ```
 */
export class AvatarColor {
	/**
	 * Creates a default AvatarColor with a random color
	 *
	 * @returns AvatarColor instance with a random hex color
	 */
	static default() {
		return new AvatarColor(random().toHex())
	}

	/**
	 * Creates an AvatarColor from user input with validation
	 * Falls back to default random color if input is invalid
	 *
	 * @param input - Color input (hex, rgb, hsl, named colors, etc.)
	 * @returns AvatarColor instance with validated color
	 *
	 * @example
	 * ```typescript
	 * AvatarColor.create('#ff0000')     // Valid hex
	 * AvatarColor.create('rgb(255,0,0)') // Valid RGB
	 * AvatarColor.create('red')          // Valid named color
	 * AvatarColor.create('invalid')      // Returns random color
	 * ```
	 */
	static create(input: unknown): AvatarColor {
		if (typeof input === 'string' && colord(input).isValid()) {
			return new AvatarColor(input)
		}

		return AvatarColor.default()
	}

	/**
	 * Private constructor - use static factory methods instead
	 *
	 * @param value - Validated color string
	 */
	private constructor(public readonly value: string) {}

	/**
	 * Gets the background color for the avatar
	 *
	 * @returns Color string suitable for CSS background
	 */
	background() {
		return this.value
	}

	/**
	 * Calculates optimal foreground color for maximum contrast
	 * Uses intelligent color theory to ensure text readability
	 *
	 * @returns Hex color string optimized for text contrast
	 *
	 * @example
	 * ```typescript
	 * const darkColor = AvatarColor.create('#000000')
	 * darkColor.foreground() // Returns light color for contrast
	 *
	 * const lightColor = AvatarColor.create('#ffffff')
	 * lightColor.foreground() // Returns dark color for contrast
	 * ```
	 */
	foreground() {
		const c = colord(this.value)
		if (!c.isValid()) return '#000000'

		if (c.isLight()) {
			return c.shades(3)[1].toHex()
		}

		if (c.isDark()) {
			return c.tints(3)[1].toHex()
		}

		const tint = c.tints(3)[1]
		const shade = c.shades(3)[1]

		return c.brightness() > 0.5 ? shade.toHex() : tint.toHex()
	}
}

export class AvatarColorNotValidError extends ExavatarError {
	constructor(color: unknown) {
		super(`Avatar.color <<${color}>> is not valid. Expected a valid CSS color.`)
	}
}
