import { AvatarBaseRepository, AvatarRepository } from '../domain/AvatarRepository.ts'
import { Avatar } from '../domain/Avatar.ts'
import { AvatarResult } from '../domain/AvatarRepository.ts'
import { AvatarNotFoundError } from '../domain/AvatarRepository.ts'

/**
 * Base path for local avatar files relative to project root.
 * Points to the avatars directory for development and testing.
 *
 * @example
 * ```typescript
 * // Constructed paths:
 * // 'avatars/animals/256/cat.webp'
 * // 'avatars/rick_morty/128/1.webp'
 * ```
 */
const BASE_URL = 'avatars/'

/**
 * Development avatar repository implementation using local filesystem.
 * Loads avatar images from local file system and generates SVG for text-based avatars.
 *
 * This implementation is optimized for development and testing environments where
 * avatar images are served directly from the local filesystem, enabling fast
 * iteration and offline development.
 *
 * **Features:**
 * - Direct filesystem access using Deno's native file API
 * - Fast local development with no network dependencies
 * - Automatic fallback to SVG generation for text avatars
 * - Comprehensive error handling with file system debugging
 * - Hot reload support for avatar file changes
 *
 * **Path Structure:**
 * ```
 * {BASE_URL}{set}/{size}/{id}.{format}
 * ```
 *
 * **Development Setup:**
 * Ensure avatar files are available in the `avatars/` directory relative to project root.
 *
 * @example
 * ```typescript
 * // Development usage
 * const repository = new LocalAvatarRepository()
 * const service = new AvatarService(repository)
 *
 * // Load animal avatar from local file
 * const animalUrl = new URL('http://localhost/api/avatar?set=animals&id=cat&size=256')
 * const result = await repository.load(Avatar.fromUrl(animalUrl))
 * console.log(result.type) // 'webp'
 * console.log(result.data instanceof Uint8Array) // true
 *
 * // Generate text avatar
 * const textUrl = new URL('http://localhost/api/avatar?text=JD&color=blue')
 * const svgResult = await repository.load(Avatar.fromUrl(textUrl))
 * console.log(svgResult.type) // 'svg'
 *
 * // File system path resolution
 * // Input: Avatar { set: 'animals', id: 'cat', size: '256', format: 'webp' }
 * // Resolves to: 'avatars/animals/256/cat.webp'
 * ```
 */
export class LocalAvatarRepository extends AvatarBaseRepository implements AvatarRepository {
	/**
	 * Loads avatar data from local filesystem or generates SVG for text avatars.
	 * Automatically determines processing method based on avatar configuration.
	 *
	 * For image-based avatars, reads directly from local filesystem using Deno.readFile().
	 * For text-based avatars, delegates to inherited SVG generation from AvatarBaseRepository.
	 *
	 * @param avatar - Avatar entity containing loading configuration
	 * @returns Promise resolving to avatar data and type metadata
	 *
	 * @throws {AvatarNotFoundError} When local file read fails or file not found
	 *
	 * @example
	 * ```typescript
	 * const repository = new LocalAvatarRepository()
	 *
	 * // Load existing image from filesystem
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
	 * // Error handling for missing files
	 * try {
	 *   const missingAvatar = Avatar.create({ set: 'animals', id: 'nonexistent' })
	 *   await repository.load(missingAvatar)
	 * } catch (error) {
	 *   console.log(error instanceof AvatarNotFoundError) // true
	 *   console.log(error.message) // Contains Deno file system error details
	 * }
	 * ```
	 */
	override async load(avatar: Avatar): Promise<AvatarResult> {
		try {
			if (avatar.needBuild()) return this.build(avatar)

			return {
				data: await Deno.readFile(`${BASE_URL}${avatar.filepath}`),
				type: avatar.format.value,
			}
		} catch (cause) {
			throw new AvatarNotFoundError(cause instanceof Error ? cause.message : undefined)
		}
	}
}
