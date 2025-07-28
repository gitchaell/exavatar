import {
	AvatarBaseRepository,
	AvatarResult,
	AvatarRepository,
	AvatarNotFoundError,
} from '../domain/AvatarRepository.ts'
import { Avatar } from '../domain/Avatar.ts'

/**
 * Base URL for GitHub raw content serving avatar images.
 * Points to the main branch avatars directory for production deployment.
 *
 * @example
 * ```typescript
 * // Constructed URLs:
 * // 'https://raw.githubusercontent.com/gitchaell/exavatar/refs/heads/main/avatars/animals/256/cat.webp'
 * // 'https://raw.githubusercontent.com/gitchaell/exavatar/refs/heads/main/avatars/rick_morty/128/1.webp'
 * ```
 */
const BASE_URL = 'https://raw.githubusercontent.com/gitchaell/exavatar/refs/heads/main/avatars/'

/**
 * Production avatar repository implementation using GitHub raw URLs.
 * Loads avatar images from GitHub repository and generates SVG for text-based avatars.
 *
 * This implementation is optimized for production deployment where avatar images
 * are served directly from GitHub's raw content CDN, providing global distribution
 * and caching benefits.
 *
 * **Features:**
 * - Direct GitHub raw URL access for optimal performance
 * - Global CDN distribution through GitHub's infrastructure
 * - Automatic fallback to SVG generation for text avatars
 * - Comprehensive error handling with detailed debugging info
 * - Zero local storage requirements
 *
 * **URL Structure:**
 * ```
 * {BASE_URL}/{set}/{size}/{id}.{format}
 * ```
 *
 * @example
 * ```typescript
 * // Production usage
 * const repository = new GitHubAvatarRepository()
 * const service = new AvatarService(repository)
 *
 * // Load animal avatar
 * const animalUrl = new URL('http://localhost/api/avatar?set=animals&id=cat&size=256')
 * const result = await repository.load(Avatar.fromUrl(animalUrl))
 * console.log(result.type) // 'webp'
 * console.log(result.data instanceof Uint8Array) // true
 *
 * // Generate text avatar
 * const textUrl = new URL('http://localhost/api/avatar?text=JD&color=blue')
 * const svgResult = await repository.load(Avatar.fromUrl(textUrl))
 * console.log(svgResult.type) // 'svg'
 * ```
 */
export class GitHubAvatarRepository extends AvatarBaseRepository implements AvatarRepository {
	/**
	 * Loads avatar data from GitHub or generates SVG for text avatars.
	 * Automatically determines processing method based on avatar configuration.
	 *
	 * For image-based avatars, fetches from GitHub raw URLs with built-in CDN caching.
	 * For text-based avatars, delegates to inherited SVG generation from AvatarBaseRepository.
	 *
	 * @param avatar - Avatar entity containing loading configuration
	 * @returns Promise resolving to avatar data and type metadata
	 *
	 * @throws {AvatarNotFoundError} When GitHub request fails or image not found
	 *
	 * @example
	 * ```typescript
	 * const repository = new GitHubAvatarRepository()
	 *
	 * // Load existing image from GitHub
	 * const imageAvatar = Avatar.create({ set: 'animals', id: 'cat', size: '256' })
	 * const imageResult = await repository.load(imageAvatar)
	 * console.log(imageResult.type) // 'webp'
	 * console.log(imageResult.data instanceof Uint8Array) // true
	 *
	 * // Generate SVG for text
	 * const textAvatar = Avatar.create({ text: 'JD', color: '#3b82f6' })
	 * const svgResult = await repository.load(textAvatar)
	 * console.log(svgResult.type) // 'svg'
	 * console.log(typeof svgResult.data) // 'string'
	 *
	 * // Error handling
	 * try {
	 *   const invalidAvatar = Avatar.create({ set: 'animals', id: 'nonexistent' })
	 *   await repository.load(invalidAvatar)
	 * } catch (error) {
	 *   console.log(error instanceof AvatarNotFoundError) // true
	 * }
	 * ```
	 */
	override async load(avatar: Avatar): Promise<AvatarResult> {
		try {
			if (avatar.needBuild()) return this.build(avatar)

			const response = await fetch(`${BASE_URL}${avatar.filepath}`)

			if (!response.ok) throw new AvatarNotFoundError(response.statusText)

			return {
				data: new Uint8Array(await response.arrayBuffer()),
				type: avatar.format.value,
			}
		} catch (cause) {
			throw new AvatarNotFoundError(cause instanceof Error ? cause.message : undefined)
		}
	}
}
