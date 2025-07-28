import { ExavatarError } from '../shared/ExavatarError.ts'

/**
 * Available avatar sizes in pixels (width and height).
 * Provides a range of standard image sizes optimized for different use cases.
 *
 * Sizes range from 16px (icon) to 1024px (high-resolution display).
 * All sizes maintain square aspect ratio (width = height).
 *
 * @example
 * ```typescript
 * console.log(avatarSizes) // ['16', '32', '64', '128', '256', '512', '1024']
 * console.log(avatarSizes.length) // 7 different size options
 * ```
 */
export const avatarSizes = ['16', '32', '64', '128', '256', '512', '1024'] as const

/** Type representing valid avatar size values in pixels */
export type AvatarSizeType = (typeof avatarSizes)[number]

/**
 * Value object representing avatar dimensions.
 * Encapsulates avatar size validation and provides type-safe size handling.
 *
 * Avatar sizes are square dimensions in pixels, optimized for web display.
 * Invalid sizes automatically fall back to the standard 256px default.
 *
 * **Size Guidelines:**
 * - **16px**: Favicons, tiny UI elements
 * - **32px**: Small icons, navigation elements
 * - **64px**: Profile thumbnails, compact lists
 * - **128px**: Standard profile images
 * - **256px**: Default size, ideal for most applications
 * - **512px**: High-quality displays, detailed viewing
 * - **1024px**: Maximum resolution, print quality
 *
 * @example
 * ```typescript
 * // Standard size for most use cases
 * const defaultSize = AvatarSize.default()
 * console.log(defaultSize.value) // '256'
 *
 * // Small size for thumbnails
 * const thumbnail = AvatarSize.create('64')
 * console.log(thumbnail.value) // '64'
 *
 * // High resolution for detailed view
 * const highRes = AvatarSize.create('512')
 * console.log(highRes.value) // '512'
 *
 * // Auto-fallback for invalid input
 * const fallback = AvatarSize.create('999')
 * console.log(fallback.value) // '256' (default)
 * ```
 */
export class AvatarSize {
	/** Private constructor ensures validation through factory methods */
	private constructor(public readonly value: AvatarSizeType) {}

	/**
	 * Creates default avatar size (256px).
	 * 256px provides optimal balance between quality and performance.
	 *
	 * @returns AvatarSize instance with 256px dimensions
	 *
	 * @example
	 * ```typescript
	 * const size = AvatarSize.default()
	 * console.log(size.value) // '256'
	 *
	 * // Perfect for most web applications
	 * const avatar = Avatar.create({ size: size.value })
	 * ```
	 */
	static default() {
		// const size = avatarSizes[Math.floor(Math.random() * avatarSizes.length)]
		return new AvatarSize('256')
	}

	/**
	 * Creates AvatarSize from input with validation.
	 * Validates input against available sizes and falls back to default if invalid.
	 *
	 * @param input - Size string or any value to validate
	 * @returns AvatarSize instance with valid size
	 *
	 * @example
	 * ```typescript
	 * // Valid sizes
	 * const small = AvatarSize.create('64')     // Thumbnail
	 * const medium = AvatarSize.create('128')   // Standard profile
	 * const large = AvatarSize.create('512')    // High resolution
	 *
	 * // Auto-fallback for invalid input
	 * const invalid = AvatarSize.create('999')  // Returns '256'
	 * const nullInput = AvatarSize.create(null) // Returns '256'
	 * const wrongType = AvatarSize.create(128)  // Returns '256' (number, not string)
	 *
	 * // Edge cases
	 * const empty = AvatarSize.create('')       // Returns '256'
	 * const negative = AvatarSize.create('-64') // Returns '256'
	 * ```
	 */
	static create(input: unknown): AvatarSize {
		if (typeof input === 'string' && avatarSizes.includes(input as AvatarSizeType)) {
			return new AvatarSize(input as AvatarSizeType)
		}

		return AvatarSize.default()
	}
}

/**
 * Error thrown when avatar size validation fails.
 * Provides clear feedback about valid size options.
 *
 * @example
 * ```typescript
 * try {
 *   // This would throw in strict validation scenarios
 *   // AvatarSize.create() always falls back gracefully
 *   throw new AvatarSizeNotValidError('999')
 * } catch (error) {
 *   console.log(error.message)
 *   // 'Avatar.size <<999>> is not valid. Expected a valid size like: 16, 32, 64, 128, 256, 512, 1024'
 * }
 * ```
 */
export class AvatarSizeNotValidError extends ExavatarError {
	/**
	 * Creates an error for invalid avatar size.
	 *
	 * @param size - The invalid size value that caused the error
	 */
	constructor(size: unknown) {
		super(
			`Avatar.size <<${size}>> is not valid. Expected a valid size like: ${avatarSizes.join(', ')}`,
		)
	}
}
