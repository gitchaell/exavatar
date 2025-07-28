import { ExavatarError } from '../shared/ExavatarError.ts'
import { AvatarSetType } from './AvatarSet.ts'

/**
 * Mapping of avatar sets to their available avatar IDs.
 * Each set contains a curated collection of unique avatar identifiers.
 *
 * - **animals**: Collection of 45 animal-themed avatars
 * - **rick_morty**: Collection of 671 Rick and Morty character avatars
 *
 * @example
 * ```typescript
 * // Access animal IDs
 * console.log(avatarIdsMap.animals.length) // 45
 * console.log(avatarIdsMap.animals[0])    // 'ant'
 *
 * // Access Rick and Morty IDs
 * console.log(avatarIdsMap.rick_morty.length) // 671
 * console.log(avatarIdsMap.rick_morty[0])     // '0'
 * ```
 */
export const avatarIdsMap = {
	animals: [
		'ant',
		'bear',
		'bee',
		'bull',
		'camel',
		'cat',
		'chameleon',
		'crab',
		'crocodile',
		'dinosaur',
		'dog',
		'dolphin',
		'duck',
		'eagle',
		'elephant',
		'flamingo',
		'fox',
		'frog',
		'goat',
		'gorilla',
		'hedgehog',
		'horse',
		'kangaroo',
		'koala',
		'ladybug',
		'lion',
		'mammoth',
		'mouse',
		'octopus',
		'owl',
		'panda',
		'parrot',
		'penguin',
		'pig',
		'pufferfish',
		'rabbit',
		'raccoon',
		'rooster',
		'shark',
		'slothbear',
		'snake',
		'tiger',
		'turtle',
		'whale',
		'zebra',
	],
	rick_morty: [
		'ants_in_my_eyes_johnson',
		'arbor_knight',
		'baby_butthole',
		'beau',
		'beth_blocky',
		'beth_child',
		'beth_clone',
		'beth_gunk',
		'beth_inside_out',
		'beth_original',
		'beth',
		'beth_the_destroyer',
		'beth_wasteland',
		'bigfoot',
		'birdperson',
		'bruce_chutback',
		'chucksley',
		'cisco',
		'concerto',
		'diane',
		'dr_wong',
		'dr_xenon_bloom',
		'eyeholeman',
		'flargo',
		'floopy_doops',
		'froopy',
		'froopy_tommy',
		'gearhead',
		'girlfriend',
		'gloop',
		'gobo',
		'gobpa',
		'goobagobaga',
		'gromflamite_general',
		'gromflamite_soldier',
		'hamurai',
		'hemorrhage',
		'humox_5',
		'jaguar',
		'jerry_blocky',
		'jerry_easterclause',
		'jerry_flamingo_dad',
		'jerry_gunk',
		'jerry_hermit',
		'jerry_kimono',
		'jerry_mooch',
		'jerry_moving',
		'jerry_original',
		'jerry_ricklet_king',
		'jerry_teen',
		'jerry_victorian',
		'jerry_wasteland',
		'kiara',
		'leon',
		'little_bits',
		'mom_jerry',
		'morty_ancient',
		'morty_arcade',
		'morty_beard',
		'morty_buff',
		'morty_cop',
		'morty_default',
		'morty_dog',
		'morty_drone',
		'morty_evil',
		'morty_evil_rabbit',
		'morty_geriatric',
		'morty_gunk',
		'morty_hawaiian',
		'morty_hippie',
		'morty_hobo',
		'morty_karate',
		'morty_mascot',
		'morty_miami',
		'morty_no_mercy',
		'morty_old',
		'morty_pickle',
		'morty_rabbit',
		'morty_ronin',
		'morty_santa',
		'morty_scruffy',
		'morty_skeleton',
		'morty_snowman',
		'morty_three_eye',
		'morty_unkempt',
		'morty_wizard',
		'mr_always_wants_to_be_hunter',
		'mr_butthole',
		'mr_goldenfold',
		'mr_jellybean',
		'mr_needful',
		'mr_nimbus',
		'mr_president',
		'mrs_butthole',
		'mrs_president',
		'mr_stealy',
		'nick',
		'noob_noob',
		'observer',
		'paul_fleischman',
		'planetina',
		'prax',
		'priix',
		'princess_poneta',
		'rick_800',
		'rick_alien',
		'rick_aqua',
		'rick_bald',
		'rick_beard',
		'rick_beefcake',
		'rick_blocky',
		'rick_bubblegum',
		'rick_chair',
		'rick_commander',
		'rick_commuter',
		'rick_constellatio',
		'rick_construction',
		'rick_cop',
		'rick_cowboy',
		'rick_crow',
		'rick_cyclops',
		'rick_d99',
		'rick_dandy',
		'rick_deepthroat',
		'rick_default',
		'rick_doofus',
		'rick_dr_whome',
		'rick_dude',
		'rick_evil',
		'rick_fancy',
		'rick_farmer',
		'rick_federation_prison',
		'rick_fisher',
		'rick_flat_top',
		'rick_four_eyes',
		'rick_funnel',
		'rick_general',
		'rick_ghostcatcher',
		'rick_golfer',
		'rick_grandpa',
		'rick_greaser',
		'rick_grunge',
		'rick_guilt_candidate',
		'rick_guilty',
		'rick_gunk',
		'rick_hacker',
		'rick_hawaiian',
		'rick_hippie',
		'rick_homesteader',
		'rick_jar_head',
		'rick_john_rick',
		'rick_junk_yard',
		'rick_karate',
		'rick_lep_rickaun',
		'rick_lion_dancer',
		'rick_lizard',
		'rick_memory',
		'rick_miami',
		'rick_missy',
		'rick_morty',
		'rick_murder_patrol',
		'rick_mustache',
		'rick_ninja',
		'rick_novelist',
		'rick_phantom',
		'rick_pickle',
		'rick_pickle_rat_suit',
		'rick_prime',
		'rick_rader',
		'rick_robot',
		'rick_santa',
		'rick_sash_and_cape',
		'rick_scrooge',
		'rick_sherlock',
		'rick_shibuya',
		'rick_simple',
		'rick_smooth',
		'rick_space_suit',
		'rick_space_trooper',
		'rick_spiritual_leader',
		'rick_star_spangled',
		'rick_super_fan',
		'rick_supreme_guard',
		'rick_surfer_dude',
		'rick_survivor',
		'rick_swap_shop',
		'rick_swimmer',
		'rick_teacher',
		'rick_teddy',
		'rick_the_scientist_known_as',
		'rick_tiny',
		'rick_tournament',
		'rick_turberlent',
		'rick_turkey',
		'rick_tycoon',
		'rick_valentines_day',
		'rick_vapour_wave',
		'rick_victorian',
		'rick_warrior',
		'rick_wasteland',
		'rick_weird',
		'rick_zarchez',
		'rick_zero',
		'risotto_groupon',
		'roy',
		'scary_terry',
		'schleemypants',
		'shmupiedoop',
		'shonoopy_bloopers',
		'sleepy_garry',
		'squanchy',
		'summer_attribute_slider',
		'summer_blocky',
		'summer_day',
		'summer_dragon_rider',
		'summer_fyre_sale',
		'summer_glorzo',
		'summer_gotron_suit',
		'summer_gunk',
		'summer_hawaiian',
		'summer_inside_out',
		'summer_original',
		'summer',
		'summer_tech_ceo',
		'summer_wasteland',
		'tinkles',
		'tommy',
		'truckula',
		'viscount_of_venus',
	],
} as const

/** Type for animal avatar IDs derived from avatarIdsMap */
export type AvatarAnimalIdTypes = (typeof avatarIdsMap)['animals'][number]

/** Type for Rick and Morty avatar IDs derived from avatarIdsMap */
export type AvatarRickAndMortyIdTypes = (typeof avatarIdsMap)['rick_morty'][number]

/** Union type representing all valid avatar IDs across all sets */
export type AvatarIdType = AvatarAnimalIdTypes | AvatarRickAndMortyIdTypes

/**
 * Value object representing a specific avatar identifier within a set.
 * Provides type-safe avatar ID handling with automatic validation and fallback.
 *
 * Avatar IDs are set-specific and must be valid within their respective collections.
 * Invalid IDs automatically fall back to a random valid ID from the same set.
 *
 * @example
 * ```typescript
 * // Create with valid ID
 * const catAvatar = AvatarId.create('cat', 'animals')
 * console.log(catAvatar.value) // 'cat'
 *
 * // Random default from set
 * const randomAnimal = AvatarId.default('animals')
 * console.log(randomAnimal.value) // Random animal ID like 'lion'
 *
 * // Auto-fallback for invalid ID
 * const fallback = AvatarId.create('invalid', 'animals')
 * console.log(fallback.value) // Random valid animal ID
 *
 * // Rick and Morty character
 * const rickMorty = AvatarId.create('1', 'rick_morty')
 * console.log(rickMorty.value) // '1'
 * ```
 */
export class AvatarId {
	/** Private constructor ensures validation through factory methods */
	private constructor(public readonly value: AvatarIdType) {}

	/**
	 * Creates a random avatar ID from the specified set.
	 * Uses cryptographically secure randomness for fair distribution.
	 *
	 * @param set - The avatar set to select from
	 * @returns AvatarId instance with random ID from the set
	 *
	 * @example
	 * ```typescript
	 * // Random animal
	 * const randomAnimal = AvatarId.default('animals')
	 * console.log(randomAnimal.value) // 'tiger', 'bear', etc.
	 *
	 * // Random Rick and Morty character
	 * const randomCharacter = AvatarId.default('rick_morty')
	 * console.log(randomCharacter.value) // '142', '523', etc.
	 * ```
	 */
	static default(set: AvatarSetType): AvatarId {
		const map = avatarIdsMap[set]
		const id = map[Math.floor(Math.random() * map.length)] as AvatarIdType
		return new AvatarId(id)
	}

	/**
	 * Creates AvatarId from input with set-aware validation.
	 * Validates that the ID exists within the specified set.
	 * Falls back to random ID if validation fails.
	 *
	 * @param input - ID string or any value to validate
	 * @param set - The avatar set to validate against
	 * @returns AvatarId instance with valid ID for the set
	 *
	 * @example
	 * ```typescript
	 * // Valid animal ID
	 * const cat = AvatarId.create('cat', 'animals')
	 * console.log(cat.value) // 'cat'
	 *
	 * // Valid Rick and Morty ID
	 * const character = AvatarId.create('100', 'rick_morty')
	 * console.log(character.value) // '100'
	 *
	 * // Invalid ID - auto fallback
	 * const invalid = AvatarId.create('nonexistent', 'animals')
	 * console.log(invalid.value) // Random valid animal ID
	 *
	 * // Cross-set validation
	 * const wrong = AvatarId.create('cat', 'rick_morty') // 'cat' not in rick_morty
	 * console.log(wrong.value) // Random Rick and Morty character ID
	 * ```
	 */
	static create(input: unknown, set: AvatarSetType): AvatarId {
		if (
			typeof input === 'string' &&
			(avatarIdsMap[set] as unknown as AvatarIdType[]).includes(input as AvatarIdType)
		) {
			return new AvatarId(input as AvatarIdType)
		}

		return AvatarId.default(set)
	}
}

/**
 * Error thrown when avatar ID validation fails.
 * Provides comprehensive feedback about valid ID options across all sets.
 *
 * @example
 * ```typescript
 * try {
 *   // This would throw since validation occurs in the repository layer
 *   // AvatarId.create() always falls back gracefully
 *   throw new AvatarIdNotValidError('invalid-id')
 * } catch (error) {
 *   console.log(error.message)
 *   // Lists all valid IDs from all sets
 * }
 * ```
 */
export class AvatarIdNotValidError extends ExavatarError {
	/**
	 * Creates an error for invalid avatar ID.
	 *
	 * @param id - The invalid ID value that caused the error
	 */
	constructor(id: unknown) {
		super(
			`Avatar.id <<${id}>> is not valid. Expected a valid id like: ${Object.values(avatarIdsMap)
				.flatMap((id) => id)
				.join(', ')}.`,
		)
	}
}
