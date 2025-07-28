import { ExavatarError } from '../shared/ExavatarError.ts'
import { Avatar } from './Avatar.ts'

/**
 * Configuration object for SVG generation.
 * Contains all parameters needed to generate a text-based avatar.
 *
 * @internal This interface is used internally by AvatarBuilder
 */
interface SvgConfig {
	/** Avatar size in pixels (width and height) */
	size: number
	/** Background color in CSS format */
	backgroundColor: string
	/** Text color in CSS format */
	foregroundColor: string
	/** Text content to display */
	text: string
	/** Font size in pixels */
	fontSize: number
	/** CSS font-weight value */
	fontWeight: string
	/** Vertical offset for text positioning */
	yOffset: number
	/** Stroke width for text outline */
	strokeWidth: number
}

/**
 * Builder class for generating SVG avatars from text and color configurations.
 * Handles the conversion of Avatar entities into valid SVG markup.
 *
 * This class uses intelligent typography and color theory to generate
 * aesthetically pleasing text-based avatars with proper contrast and sizing.
 *
 * @example
 * ```typescript
 * const avatar = Avatar.create({ text: 'JD', color: '#3b82f6', size: '256' })
 * const svgData = AvatarBuilder.build(avatar)
 * // Returns Uint8Array containing SVG markup
 * ```
 */
export class AvatarBuilder {
	/**
	 * Main entry point for building SVG avatars.
	 * Converts an Avatar entity into SVG binary data.
	 *
	 * @param avatar - Avatar configuration containing text, colors, and size
	 * @returns SVG data as Uint8Array ready for HTTP response
	 * @throws {AvatarBuilderError} When SVG generation fails
	 *
	 * @example
	 * ```typescript
	 * const avatar = Avatar.create({
	 *   text: 'AB',
	 *   color: '#ef4444',
	 *   size: '128'
	 * })
	 *
	 * const svgBytes = AvatarBuilder.build(avatar)
	 * const svgString = new TextDecoder().decode(svgBytes)
	 * // Results in: <svg xmlns="http://www.w3.org/2000/svg"...>AB</text></svg>
	 * ```
	 */
	static build(avatar: Avatar): Uint8Array {
		const builder = new AvatarBuilder()
		return builder.process(AvatarBuilder.config(avatar))
	}

	/**
	 * Creates SVG configuration from Avatar entity.
	 * Calculates optimal typography settings based on avatar properties.
	 *
	 * @param avatar - Avatar entity with text, color, and size data
	 * @returns SvgConfig with calculated typography and positioning
	 *
	 * @private
	 * @example
	 * ```typescript
	 * const config = AvatarBuilder.config(avatar)
	 * // Returns: {
	 * //   size: 256,
	 * //   backgroundColor: '#3b82f6',
	 * //   foregroundColor: '#ffffff',
	 * //   text: 'JD',
	 * //   fontSize: 85,
	 * //   fontWeight: '600',
	 * //   yOffset: 140.8,
	 * //   strokeWidth: 2.56
	 * // }
	 * ```
	 */
	private static config(avatar: Avatar): SvgConfig {
		const size = +avatar.size.value
		const text = avatar.text.escaped()

		// Calculate font size based on text length and avatar size
		// Shorter text gets larger font, longer text gets smaller font
		const fontSize = Math.floor((size * 0.5) / (text.length > 1 ? 1.5 : 1))

		// Font weight mapping based on avatar size for optimal readability
		const fontWeightMap: Record<number, string> = {
			16: '400', // Regular weight for tiny avatars
			32: '400', // Regular weight for small avatars
			64: '500', // Medium weight for medium avatars
			128: '500', // Medium weight for large avatars
			256: '600', // Semi-bold for extra large avatars
			512: '600', // Semi-bold for huge avatars
			1024: '600', // Semi-bold for massive avatars
		}

		// Calculate stroke width as 1% of size, minimum 1px for visibility
		const strokeWidth = Math.max(1, size * 0.01)

		return {
			size,
			backgroundColor: avatar.color.background(),
			foregroundColor: avatar.color.foreground(),
			text,
			fontSize,
			fontWeight: fontWeightMap[size] ?? '400',
			yOffset: size * 0.55, // Position text slightly below center
			strokeWidth,
		}
	}

	/**
	 * Processes SVG configuration into binary SVG data.
	 * Generates the actual SVG markup and encodes it as Uint8Array.
	 *
	 * @param config - SVG configuration with all calculated parameters
	 * @returns SVG markup encoded as Uint8Array
	 * @throws {AvatarBuilderError} When SVG generation or encoding fails
	 *
	 * @example
	 * ```typescript
	 * const config = {
	 *   size: 256,
	 *   backgroundColor: '#3b82f6',
	 *   foregroundColor: '#ffffff',
	 *   text: 'JD',
	 *   fontSize: 85,
	 *   fontWeight: '600',
	 *   yOffset: 140.8,
	 *   strokeWidth: 2.56
	 * }
	 *
	 * const svgData = builder.process(config)
	 * // Returns encoded SVG with proper accessibility attributes
	 * ```
	 */
	process(config: SvgConfig): Uint8Array {
		try {
			const {
				size,
				backgroundColor,
				foregroundColor,
				text,
				fontSize,
				fontWeight,
				yOffset,
				strokeWidth,
			} = config

			// Build SVG markup with proper accessibility attributes
			const svg = [
				`<svg xmlns="http://www.w3.org/2000/svg"`,
				`width="${size}" height="${size}"`,
				`viewBox="0 0 ${size} ${size}"`,
				`role="img" aria-label="Generated avatar">`,
				`<rect width="100%" height="100%" fill="${backgroundColor}" />`,
				`<text x="50%" y="${yOffset}"`,
				`dominant-baseline="middle" text-anchor="middle"`,
				`font-size="${fontSize}" font-weight="${fontWeight}"`,
				`font-family="sans-serif" fill="${foregroundColor}"`,
				`stroke="${foregroundColor}" stroke-width="${strokeWidth}"`,
				`paint-order="stroke">${text}</text>`,
				`</svg>`,
			].join(' ')

			// Encode SVG string as UTF-8 bytes
			return new TextEncoder().encode(svg)
		} catch (error) {
			throw new AvatarBuilderError(error instanceof Error ? error.message : undefined)
		}
	}
}

/**
 * Error thrown when SVG avatar building fails.
 * Indicates issues with SVG generation, encoding, or configuration processing.
 *
 * @example
 * ```typescript
 * try {
 *   const svgData = AvatarBuilder.build(avatar)
 * } catch (error) {
 *   if (error instanceof AvatarBuilderError) {
 *     console.error('SVG generation failed:', error.message)
 *     // Fallback to default avatar or error image
 *   }
 * }
 * ```
 */
export class AvatarBuilderError extends ExavatarError {
	/**
	 * Creates a new AvatarBuilderError with optional cause information.
	 *
	 * @param cause - Optional details about what caused the build failure
	 *
	 * @example
	 * ```typescript
	 * throw new AvatarBuilderError('Invalid text configuration')
	 * throw new AvatarBuilderError('Text encoding failed')
	 * throw new AvatarBuilderError() // Generic failure message
	 * ```
	 */
	constructor(cause?: string) {
		super(`Avatar builder failed. ${cause}`)
		this.cause = cause
	}
}
