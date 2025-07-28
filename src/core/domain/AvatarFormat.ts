import { ExavatarError } from '../shared/ExavatarError.ts'

/** Supported image formats for avatar output */
export const avatarFormats = ['png', 'jpeg', 'webp'] as const

/** Type representing valid avatar image formats */
export type AvatarFormatType = (typeof avatarFormats)[number]

/**
 * Value object representing avatar image format.
 * Encapsulates image format validation and provides type-safe format handling.
 *
 * Supports modern web formats with WebP as the default for optimal performance.
 * Automatically falls back to WebP for invalid or missing format specifications.
 *
 * @example
 * ```typescript
 * // Create with specific format
 * const webpFormat = AvatarFormat.create('webp')
 * const pngFormat = AvatarFormat.create('png')
 *
 * // Default format (WebP)
 * const defaultFormat = AvatarFormat.default()
 * console.log(defaultFormat.value) // 'webp'
 *
 * // Auto-fallback for invalid input
 * const autoFormat = AvatarFormat.create('')
 * console.log(autoFormat.value) // 'webp'
 * ```
 */
export class AvatarFormat {
	/** Private constructor ensures validation through factory methods */
	private constructor(public readonly value: AvatarFormatType) {}

	/**
	 * Creates default avatar format (WebP).
	 * WebP provides superior compression and quality compared to PNG/JPEG.
	 *
	 * @returns AvatarFormat instance with WebP format
	 *
	 * @example
	 * ```typescript
	 * const format = AvatarFormat.default()
	 * console.log(format.value) // 'webp'
	 * ```
	 */
	static default() {
		return new AvatarFormat('webp')
	}

	/**
	 * Creates AvatarFormat from input with validation.
	 * Validates input format and falls back to default for invalid values.
	 *
	 * @param input - Format string or any value to validate
	 * @returns AvatarFormat instance with validated format
	 * @throws {AvatarFormatNotValidError} When input is invalid and non-empty
	 *
	 * @example
	 * ```typescript
	 * // Valid formats
	 * const webp = AvatarFormat.create('webp')
	 * const png = AvatarFormat.create('png')
	 * const jpeg = AvatarFormat.create('jpeg')
	 *
	 * // Auto-fallback for empty/null
	 * const fallback = AvatarFormat.create('')    // Returns WebP
	 * const nullFallback = AvatarFormat.create(null) // Returns WebP
	 *
	 * // Error for invalid format
	 * AvatarFormat.create('gif') // Throws AvatarFormatNotValidError
	 * ```
	 */
	static create(input: unknown): AvatarFormat {
		if (input === null || input === undefined || input === '') {
			return AvatarFormat.default()
		}

		if (typeof input !== 'string') {
			throw new AvatarFormatNotValidError(input)
		}

		if (!avatarFormats.includes(input as AvatarFormatType)) {
			throw new AvatarFormatNotValidError(input)
		}

		return new AvatarFormat(input as AvatarFormatType)
	}
}

/**
 * Error thrown when avatar format validation fails.
 * Provides clear feedback about valid format options.
 *
 * @example
 * ```typescript
 * try {
 *   AvatarFormat.create('invalid')
 * } catch (error) {
 *   console.log(error.message)
 *   // 'Avatar.format <<invalid>> is not valid. Expected a valid image format like: png, jpeg, webp'
 * }
 * ```
 */
export class AvatarFormatNotValidError extends ExavatarError {
	/**
	 * Creates an error for invalid avatar format.
	 *
	 * @param format - The invalid format value that caused the error
	 */
	constructor(format: unknown) {
		super(
			`Avatar.format <<${format}>> is not valid. Expected a valid image format like: ${avatarFormats.join(
				', ',
			)}`,
		)
	}
}
