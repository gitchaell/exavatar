import { Avatar } from '../../domain/Avatar.ts'
import { AvatarRepository, AvatarResult } from '../../domain/AvatarRepository.ts'

/**
 * Application service for avatar generation and management.
 * Orchestrates the avatar creation process using dependency injection pattern.
 *
 * This service acts as the main entry point for avatar operations, abstracting the
 * complexity of avatar creation from the presentation layer. It coordinates between
 * domain entities and infrastructure repositories.
 *
 * **Key Features:**
 * - Environment-aware repository selection
 * - Automatic avatar type detection (image vs SVG)
 * - Unified interface for different avatar sources
 * - Error handling and logging
 *
 * @example
 * ```typescript
 * // Production setup with GitHub repository
 * const githubRepo = new GitHubAvatarRepository()
 * const service = new AvatarService(githubRepo)
 *
 * // Development setup with local repository
 * const localRepo = new LocalAvatarRepository()
 * const devService = new AvatarService(localRepo)
 *
 * // Generate avatar from URL
 * const url = new URL('http://localhost/api/avatar?text=JD&color=blue')
 * const result = await service.generate(url)
 * console.log(result.type) // 'svg'
 * console.log(result.data) // SVG string or image buffer
 * ```
 */
export class AvatarService {
	/**
	 * Creates an AvatarService with the specified repository.
	 * Uses dependency injection to allow different storage backends.
	 *
	 * @param repository - Avatar repository implementation for data access
	 *
	 * @example
	 * ```typescript
	 * // GitHub repository for production
	 * const service = new AvatarService(new GitHubAvatarRepository())
	 *
	 * // Local repository for development
	 * const devService = new AvatarService(new LocalAvatarRepository())
	 *
	 * // Mock repository for testing
	 * const testService = new AvatarService(new MockAvatarRepository())
	 * ```
	 */
	constructor(private readonly repository: AvatarRepository) {}

	/**
	 * Generates an avatar from URL parameters.
	 * Parses URL to create Avatar entity and delegates to repository for processing.
	 *
	 * The method automatically determines whether to load an existing image or
	 * generate an SVG based on the presence of text parameters.
	 *
	 * @param url - URL containing avatar parameters as query string
	 * @returns Promise resolving to avatar data and metadata
	 *
	 * @example
	 * ```typescript
	 * // Image-based avatar
	 * const imageUrl = new URL('http://localhost/api/avatar?set=animals&id=cat&size=256')
	 * const imageResult = await service.generate(imageUrl)
	 * console.log(imageResult.type) // 'webp'
	 * console.log(imageResult.data instanceof Uint8Array) // true
	 *
	 * // Text-based avatar (SVG generation)
	 * const textUrl = new URL('http://localhost/api/avatar?text=JD&color=%233b82f6&size=128')
	 * const svgResult = await service.generate(textUrl)
	 * console.log(svgResult.type) // 'svg'
	 * console.log(typeof svgResult.data) // 'string'
	 *
	 * // Default avatar (random)
	 * const defaultUrl = new URL('http://localhost/api/avatar')
	 * const defaultResult = await service.generate(defaultUrl)
	 * console.log(defaultResult.type) // 'webp' (random animal)
	 * ```
	 *
	 * @throws {AvatarNotFoundError} When image-based avatar cannot be loaded
	 * @throws {InternalError} When SVG generation fails or other system errors occur
	 */
	async generate(url: URL): Promise<AvatarResult> {
		return await this.repository.load(Avatar.fromUrl(url))
	}
}
