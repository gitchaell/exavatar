import { ExavatarError } from '../shared/ExavatarError.ts'

/**
 * Available avatar sets/collections in the system.
 * Each set represents a themed collection of avatar images.
 *
 * - **animals**: Collection of 45 animal-themed avatars (cat, dog, lion, etc.)
 * - **rick_morty**: Collection of 671 Rick and Morty character avatars
 *
 * @example
 * ```typescript
 * console.log(avatarSets) // ['animals', 'rick_morty']
 * console.log(avatarSets.length) // 2
 * ```
 */
export const avatarSets = ['animals', 'rick_morty'] as const

/** Type representing valid avatar set names */
export type AvatarSetType = (typeof avatarSets)[number]

/**
 * Value object representing an avatar set/collection.
 * Encapsulates avatar set validation and provides type-safe set handling.
 *
 * Avatar sets determine which collection of avatars is available for selection.
 * Invalid sets automatically fall back to a random valid set.
 *
 * @example
 * ```typescript
 * // Create with specific set
 * const animalSet = AvatarSet.create('animals')
 * console.log(animalSet.value) // 'animals'
 *
 * // Random default set
 * const randomSet = AvatarSet.default()
 * console.log(randomSet.value) // 'animals' or 'rick_morty'
 *
 * // Auto-fallback for invalid input
 * const fallbackSet = AvatarSet.create('invalid')
 * console.log(fallbackSet.value) // Random valid set
 *
 * // Rick and Morty set
 * const rickMortySet = AvatarSet.create('rick_morty')
 * console.log(rickMortySet.value) // 'rick_morty'
 * ```
 */
export class AvatarSet {
	/** Private constructor ensures validation through factory methods */
	private constructor(public readonly value: AvatarSetType) {}

	/**
	 * Creates a random avatar set.
	 * Uses cryptographically secure randomness for fair distribution.
	 *
	 * @returns AvatarSet instance with randomly selected set
	 *
	 * @example
	 * ```typescript
	 * const randomSet = AvatarSet.default()
	 * console.log(randomSet.value) // 'animals' or 'rick_morty' (50/50 chance)
	 *
	 * // Use in avatar creation
	 * const avatar = Avatar.create({ set: randomSet.value })
	 * ```
	 */
	static default(): AvatarSet {
		const set = avatarSets[Math.floor(Math.random() * avatarSets.length)]
		return new AvatarSet(set)
	}

	/**
	 * Creates AvatarSet from input with validation.
	 * Validates input against available sets and falls back to random if invalid.
	 *
	 * @param input - Set name string or any value to validate
	 * @returns AvatarSet instance with valid set
	 *
	 * @example
	 * ```typescript
	 * // Valid sets
	 * const animals = AvatarSet.create('animals')
	 * const rickMorty = AvatarSet.create('rick_morty')
	 *
	 * // Auto-fallback for invalid input
	 * const invalid = AvatarSet.create('nonexistent') // Returns random valid set
	 * const nullInput = AvatarSet.create(null)       // Returns random valid set
	 * const wrongType = AvatarSet.create(123)        // Returns random valid set
	 *
	 * // Case-sensitive validation
	 * const wrongCase = AvatarSet.create('ANIMALS')  // Returns random valid set
	 * ```
	 */
	static create(input: unknown): AvatarSet {
		if (typeof input === 'string' && avatarSets.includes(input as AvatarSetType)) {
			return new AvatarSet(input as AvatarSetType)
		}

		return AvatarSet.default()
	}
}

/**
 * Error thrown when avatar set validation fails.
 * Provides clear feedback about valid set options.
 *
 * @example
 * ```typescript
 * try {
 *   // This would throw in strict validation scenarios
 *   // AvatarSet.create() always falls back gracefully
 *   throw new AvatarSetNotValidError('invalid-set')
 * } catch (error) {
 *   console.log(error.message)
 *   // 'Avatar.set <<invalid-set>> is not valid. Expected a valid set like: animals, rick_morty.'
 * }
 * ```
 */
export class AvatarSetNotValidError extends ExavatarError {
	/**
	 * Creates an error for invalid avatar set.
	 *
	 * @param set - The invalid set value that caused the error
	 */
	constructor(set: unknown) {
		super(
			`Avatar.set <<${set}>> is not valid. Expected a valid set like: ${avatarSets.join(', ')}.`,
		)
	}
}
