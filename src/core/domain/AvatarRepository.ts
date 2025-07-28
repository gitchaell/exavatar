import { Avatar } from './Avatar.ts'
import { AvatarFormatType } from './AvatarFormat.ts'
import { AvatarBuilder } from './AvatarBuilder.ts'
import { ExavatarError } from '../shared/ExavatarError.ts'

/**
 * Result data structure for avatar operations.
 * Contains the raw binary data and content type for HTTP responses.
 *
 * @example
 * ```typescript
 * const result: AvatarResult = {
 *   data: new Uint8Array([...]), // Raw image/SVG bytes
 *   type: 'webp' // or 'svg+xml' for text avatars
 * }
 * ```
 */
export interface AvatarResult {
	/** Raw avatar data as bytes ready for HTTP response */
	data: Uint8Array
	/** MIME type for Content-Type header */
	type: AvatarFormatType | 'svg+xml'
}

/**
 * Repository interface for avatar data operations.
 * Defines the contract for loading static images and building dynamic SVGs.
 *
 * This interface enables the Strategy pattern, allowing different implementations
 * for various storage backends (local files, GitHub, CDN, etc.).
 *
 * @example
 * ```typescript
 * class MyAvatarRepository implements AvatarRepository {
 *   async load(avatar: Avatar): Promise<AvatarResult> {
 *     // Implementation for loading/building avatars
 *   }
 *
 *   async build(avatar: Avatar): Promise<AvatarResult> {
 *     // Implementation for SVG generation
 *   }
 * }
 * ```
 */
export interface AvatarRepository {
	/**
	 * Loads or generates avatar data based on avatar configuration.
	 * This is the main entry point that automatically determines whether to
	 * load a static image or build a dynamic SVG.
	 *
	 * @param avatar - Avatar configuration containing all necessary parameters
	 * @returns Promise resolving to avatar data and content type
	 * @throws {AvatarNotFoundError} When avatar cannot be loaded or generated
	 *
	 * @example
	 * ```typescript
	 * // For image-based avatars
	 * const imageAvatar = Avatar.create({ set: 'animals', id: 'cat' })
	 * const result = await repository.load(imageAvatar)
	 * // Returns: { data: Uint8Array, type: 'webp' }
	 *
	 * // For text-based avatars (auto-builds SVG)
	 * const textAvatar = Avatar.create({ text: 'JD', color: 'blue' })
	 * const result = await repository.load(textAvatar)
	 * // Returns: { data: Uint8Array, type: 'svg+xml' }
	 * ```
	 */
	load(avatar: Avatar): Promise<AvatarResult>

	/**
	 * Builds an SVG avatar for text-based configurations.
	 * This method is typically called internally by load() when needed.
	 *
	 * @param avatar - Avatar configuration for SVG generation
	 * @returns Promise resolving to SVG data as Uint8Array
	 * @throws {AvatarBuilderError} When SVG generation fails
	 *
	 * @example
	 * ```typescript
	 * const avatar = Avatar.create({ text: 'AB', color: '#ff0000' })
	 * const result = await repository.build(avatar)
	 * // Returns: { data: Uint8Array, type: 'svg+xml' }
	 * ```
	 */
	build(avatar: Avatar): Promise<AvatarResult>
}

/**
 * Abstract base repository providing common SVG building functionality.
 * Concrete implementations should extend this class and implement the load() method
 * for their specific storage backend.
 *
 * The build() method is pre-implemented using AvatarBuilder for consistency.
 *
 * @example
 * ```typescript
 * class S3AvatarRepository extends AvatarBaseRepository {
 *   override async load(avatar: Avatar): Promise<AvatarResult> {
 *     if (avatar.needBuild()) return this.build(avatar)
 *
 *     // Custom S3 loading logic
 *     const s3Object = await s3.getObject({ Bucket: 'avatars', Key: avatar.filepath })
 *     return {
 *       data: new Uint8Array(await s3Object.Body.transformToByteArray()),
 *       type: avatar.format.value
 *     }
 *   }
 * }
 * ```
 */
export abstract class AvatarBaseRepository implements AvatarRepository {
	/**
	 * Abstract method that must be implemented by concrete repositories.
	 * Should handle both image loading and SVG building based on avatar configuration.
	 *
	 * @param _avatar - Avatar configuration (parameter prefixed with underscore to avoid lint errors)
	 * @returns Promise resolving to avatar result
	 * @throws {Error} Always throws - must be overridden by subclasses
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	load(_avatar: Avatar): Promise<AvatarResult> {
		throw new Error('Method not implemented')
	}

	/**
	 * Builds an SVG avatar using the shared AvatarBuilder.
	 * This implementation is shared across all repository types for consistency.
	 *
	 * @param avatar - Avatar configuration for SVG generation
	 * @returns Promise resolving to SVG result with 'svg+xml' type
	 *
	 * @example
	 * ```typescript
	 * // Called internally when avatar.needBuild() returns true
	 * const result = await this.build(avatar)
	 * // Always returns: { data: Uint8Array, type: 'svg+xml' }
	 * ```
	 */
	build(avatar: Avatar): Promise<AvatarResult> {
		return Promise.resolve({ data: AvatarBuilder.build(avatar), type: 'svg+xml' })
	}
}

/**
 * Error thrown when an avatar cannot be found or loaded.
 * Used by repository implementations to indicate missing or inaccessible avatars.
 *
 * @example
 * ```typescript
 * try {
 *   const result = await repository.load(avatar)
 * } catch (error) {
 *   if (error instanceof AvatarNotFoundError) {
 *     console.log('Avatar not found:', error.message)
 *     // Handle missing avatar gracefully
 *   }
 * }
 * ```
 */
export class AvatarNotFoundError extends ExavatarError {
	/**
	 * Creates a new AvatarNotFoundError with optional cause information.
	 *
	 * @param cause - Optional additional context about why avatar was not found
	 *
	 * @example
	 * ```typescript
	 * throw new AvatarNotFoundError('File does not exist')
	 * throw new AvatarNotFoundError('HTTP 404: Not Found')
	 * throw new AvatarNotFoundError() // Generic message
	 * ```
	 */
	constructor(cause?: string) {
		super(`Avatar not found. ${cause}`)
		this.cause = cause
	}
}
