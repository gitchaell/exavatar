import { ExavatarError } from '../shared/ExavatarError.ts'

/**
 * Required text length for generated avatars.
 * Ensures consistent display and optimal readability in avatar format.
 *
 * @example
 * ```typescript
 * console.log(TEXT_LENGTH) // 2
 * // Valid: 'JD', 'AB', 'XY'
 * // Invalid: 'J', 'John', '123'
 * ```
 */
export const TEXT_LENGTH = 2

/**
 * Value object representing text content for generated avatars.
 * Encapsulates text validation, formatting, and sanitization for SVG avatar generation.
 *
 * Text avatars display initials or short text as styled SVG graphics.
 * Only exactly 2-character strings are accepted for optimal visual balance.
 *
 * @example
 * ```typescript
 * // Create initials avatar
 * const initials = AvatarText.create('JD')
 * console.log(initials.value) // 'JD'
 * console.log(initials.hasText()) // true
 *
 * // Auto-formatting
 * const formatted = AvatarText.create(' ab ')
 * console.log(formatted.value) // 'AB' (trimmed and uppercase)
 *
 * // Empty for image-based avatars
 * const empty = AvatarText.default()
 * console.log(empty.hasText()) // false
 *
 * // Auto-fallback for invalid length
 * const invalid = AvatarText.create('John')
 * console.log(invalid.hasText()) // false (falls back to empty)
 * ```
 */
export class AvatarText {
	/** Private constructor ensures validation through factory methods */
	private constructor(public readonly value: string) {}

	/**
	 * Creates empty avatar text for image-based avatars.
	 * Used when no text generation is needed.
	 *
	 * @returns AvatarText instance with empty value
	 *
	 * @example
	 * ```typescript
	 * const empty = AvatarText.default()
	 * console.log(empty.value) // ''
	 * console.log(empty.hasText()) // false
	 *
	 * // Use for image-based avatars
	 * const avatar = Avatar.create({ set: 'animals', id: 'cat' })
	 * console.log(avatar.text.hasText()) // false
	 * ```
	 */
	static default() {
		return new AvatarText('')
	}

	/**
	 * Creates AvatarText from input with strict validation.
	 * Validates text length and applies automatic formatting.
	 * Falls back to empty for invalid input.
	 *
	 * @param input - Text string or any value to validate
	 * @returns AvatarText instance with validated and formatted text
	 *
	 * @example
	 * ```typescript
	 * // Valid 2-character text
	 * const initials = AvatarText.create('JD')
	 * console.log(initials.value) // 'JD'
	 *
	 * // Auto-formatting applied
	 * const formatted = AvatarText.create(' ab ')
	 * console.log(formatted.value) // 'AB' (trimmed and uppercase)
	 *
	 * const lowercase = AvatarText.create('xy')
	 * console.log(lowercase.value) // 'XY'
	 *
	 * // Auto-fallback for invalid length
	 * const tooShort = AvatarText.create('J')    // Returns empty
	 * const tooLong = AvatarText.create('John')  // Returns empty
	 * const empty = AvatarText.create('')       // Returns empty
	 * const nullInput = AvatarText.create(null) // Returns empty
	 *
	 * // Special characters handled
	 * const symbols = AvatarText.create('A1')   // 'A1'
	 * const unicode = AvatarText.create('АБ')   // 'АБ' (Cyrillic)
	 * ```
	 */
	static create(input: unknown): AvatarText {
		if (typeof input === 'string' && input.trim().length === TEXT_LENGTH) {
			return new AvatarText(input.trim().toUpperCase())
		}

		return AvatarText.default()
	}

	/**
	 * Checks if this instance contains text for generation.
	 * Determines whether SVG generation is needed vs. image loading.
	 *
	 * @returns True if text is present, false for empty text
	 *
	 * @example
	 * ```typescript
	 * const textAvatar = AvatarText.create('JD')
	 * console.log(textAvatar.hasText()) // true
	 *
	 * const imageAvatar = AvatarText.default()
	 * console.log(imageAvatar.hasText()) // false
	 *
	 * // Used in avatar processing
	 * if (avatar.text.hasText()) {
	 *   // Generate SVG with text
	 * } else {
	 *   // Load image from repository
	 * }
	 * ```
	 */
	hasText(): boolean {
		return this.value.length > 0
	}

	/**
	 * Returns HTML/XML-escaped text safe for SVG embedding.
	 * Sanitizes special characters and removes whitespace/newlines.
	 *
	 * @returns Escaped text string safe for SVG content
	 *
	 * @example
	 * ```typescript
	 * const text = AvatarText.create('A&')
	 * console.log(text.escaped()) // 'A&amp;'
	 *
	 * const htmlText = AvatarText.create('<>')
	 * console.log(htmlText.escaped()) // '&lt;&gt;'
	 *
	 * const quotedText = AvatarText.create('"\'')
	 * console.log(quotedText.escaped()) // '&quot;&#039;'
	 *
	 * // Used in SVG generation
	 * const svgContent = `<text>${avatar.text.escaped()}</text>`
	 * ```
	 */
	escaped(): string {
		return this.value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
			.replace(/\n/g, '')
			.replace(/\s+/g, '')
			.trim()
	}
}

/**
 * Error thrown when avatar text validation fails.
 * Provides clear feedback about text length requirements.
 *
 * @example
 * ```typescript
 * try {
 *   // This would throw in strict validation scenarios
 *   // AvatarText.create() always falls back gracefully
 *   throw new AvatarTextNotValidError('John')
 * } catch (error) {
 *   console.log(error.message)
 *   // 'Avatar.text <<John>> is not valid. Expected a valid text with length 2.'
 * }
 * ```
 */
export class AvatarTextNotValidError extends ExavatarError {
	/**
	 * Creates an error for invalid avatar text.
	 *
	 * @param text - The invalid text value that caused the error
	 */
	constructor(text: unknown) {
		super(`Avatar.text <<${text}>> is not valid. Expected a valid text with length ${TEXT_LENGTH}.`)
	}
}
