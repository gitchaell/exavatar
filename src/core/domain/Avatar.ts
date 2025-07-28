import { AvatarSize, AvatarSizeType } from './AvatarSize.ts'
import { AvatarFormat, AvatarFormatType } from './AvatarFormat.ts'
import { AvatarColor } from './AvatarColor.ts'
import { AvatarText } from './AvatarText.ts'
import { AvatarId, AvatarIdType } from './AvatarId.ts'
import { AvatarSet, AvatarSetType } from './AvatarSet.ts'

/**
 * Configuration properties for creating an Avatar.
 * All properties are optional and will fall back to sensible defaults.
 *
 * @example
 * ```typescript
 * // Image-based avatar
 * const imageProps: AvatarProps = {
 *   set: 'animals',
 *   id: 'cat',
 *   size: '256',
 *   format: 'webp'
 * }
 *
 * // Text-based avatar
 * const textProps: AvatarProps = {
 *   text: 'JD',
 *   color: '#3b82f6',
 *   size: '128'
 * }
 * ```
 */
export interface AvatarProps {
	/** Avatar set/collection (e.g., 'animals', 'rick_morty') */
	set?: AvatarSetType
	/** Specific avatar ID within the set */
	id?: AvatarIdType
	/** Avatar size in pixels */
	size?: AvatarSizeType
	/** Image format for static avatars */
	format?: AvatarFormatType
	/** Color for background/text styling */
	color?: string
	/** Text content for generated avatars */
	text?: string
}

/**
 * Core Avatar entity representing a complete avatar configuration.
 * This is the main domain entity that encapsulates all avatar properties and behavior.
 *
 * The Avatar class serves as an aggregate root that coordinates multiple value objects
 * and provides methods for URL generation, file path construction, and avatar type detection.
 *
 * @example
 * ```typescript
 * // Create from URL parameters
 * const url = new URL('http://localhost/api/avatar?text=JD&color=blue')
 * const avatar = Avatar.fromUrl(url)
 *
 * // Create programmatically
 * const avatar = Avatar.create({
 *   set: 'animals',
 *   id: 'cat',
 *   size: '256',
 *   format: 'webp'
 * })
 *
 * // Use avatar properties
 * console.log(avatar.filepath)  // 'animals/256/cat.webp'
 * console.log(avatar.needBuild()) // false (image-based)
 * ```
 */
export class Avatar {
	/** Avatar set/collection configuration */
	readonly set: AvatarSet
	/** Specific avatar identifier within the set */
	readonly id: AvatarId
	/** Avatar dimensions configuration */
	readonly size: AvatarSize
	/** Image format configuration */
	readonly format: AvatarFormat
	/** Color configuration with auto-contrast */
	readonly color: AvatarColor
	/** Text configuration for generated avatars */
	readonly text: AvatarText

	/** Relative file path for image-based avatars (e.g., 'animals/256/cat.webp') */
	readonly filepath: string
	/** Filename with extension (e.g., 'cat.webp') */
	readonly filename: string

	/** API endpoint URL for this avatar */
	readonly imagesrc: string
	/** Full public URL for sharing/embedding */
	readonly codeurl: string

	/**
	 * Creates a default Avatar with random configurations.
	 * Uses sensible defaults for all properties.
	 *
	 * @returns Avatar instance with random set, ID, and default settings
	 *
	 * @example
	 * ```typescript
	 * const avatar = Avatar.default()
	 * // Returns avatar with random animal, default size 256, webp format
	 * ```
	 */
	static default() {
		const set = AvatarSet.default()

		return new Avatar({
			set: set.value,
			id: AvatarId.default(set.value).value,
			size: AvatarSize.default().value,
			format: AvatarFormat.default().value,
			color: AvatarColor.default().value,
			text: AvatarText.default().value,
		})
	}

	/**
	 * Creates an Avatar from configuration properties.
	 * Factory method for programmatic avatar creation.
	 *
	 * @param props - Avatar configuration properties
	 * @returns Avatar instance with specified configuration
	 *
	 * @example
	 * ```typescript
	 * // Image-based avatar
	 * const avatar = Avatar.create({
	 *   set: 'animals',
	 *   id: 'cat',
	 *   size: '256',
	 *   format: 'webp'
	 * })
	 *
	 * // Text-based avatar
	 * const textAvatar = Avatar.create({
	 *   text: 'JD',
	 *   color: '#3b82f6',
	 *   size: '128'
	 * })
	 * ```
	 */
	static create(props: AvatarProps): Avatar {
		return new Avatar(props)
	}

	/**
	 * Creates an Avatar from URL query parameters.
	 * Parses URL search params to extract avatar configuration.
	 *
	 * @param url - URL containing avatar parameters as query string
	 * @returns Avatar instance based on URL parameters, or default if no params
	 *
	 * @example
	 * ```typescript
	 * // From API endpoint URL
	 * const url = new URL('http://localhost/api/avatar?text=JD&color=blue&size=256')
	 * const avatar = Avatar.fromUrl(url)
	 *
	 * // From image URL
	 * const imageUrl = new URL('http://localhost/api/avatar?set=animals&id=cat')
	 * const imageAvatar = Avatar.fromUrl(imageUrl)
	 *
	 * // Empty URL returns default
	 * const emptyUrl = new URL('http://localhost/api/avatar')
	 * const defaultAvatar = Avatar.fromUrl(emptyUrl)
	 * ```
	 */
	static fromUrl(url: URL): Avatar {
		if (url?.searchParams?.size > 0) {
			return new Avatar({
				set: url.searchParams.get('set') as AvatarSetType,
				id: url.searchParams.get('id') as AvatarIdType,
				size: url.searchParams.get('size') as AvatarSizeType,
				format: url.searchParams.get('format') as AvatarFormatType,
				color: url.searchParams.get('color') as string,
				text: url.searchParams.get('text') as string,
			})
		}

		return Avatar.default()
	}

	/**
	 * Creates an Avatar instance with validated properties.
	 * Initializes all value objects and computes derived properties.
	 *
	 * @param props - Avatar configuration properties
	 *
	 * @example
	 * ```typescript
	 * const avatar = new Avatar({
	 *   set: 'animals',
	 *   id: 'cat',
	 *   size: '256'
	 * })
	 *
	 * // Computed properties are available
	 * console.log(avatar.filepath)   // 'animals/256/cat.webp'
	 * console.log(avatar.imagesrc)   // '/api/avatar?set=animals&id=cat&size=256&format=webp'
	 * console.log(avatar.needBuild()) // false
	 * ```
	 */
	constructor(props: AvatarProps) {
		this.set = AvatarSet.create(props.set)
		this.id = AvatarId.create(props.id, this.set.value)
		this.size = AvatarSize.create(props.size)
		this.format = AvatarFormat.create(props.format)
		this.color = AvatarColor.create(props.color)
		this.text = AvatarText.create(props.text)

		this.filename = `${this.id.value}.${this.format.value}`
		this.filepath = `${this.set.value}/${this.size.value}/${this.filename}`

		this.imagesrc = this.getImageSrc()
		this.codeurl = `https://exavatar.deno.dev${this.imagesrc}`
	}

	/**
	 * Generates the API endpoint URL with query parameters.
	 * Constructs the relative URL path for avatar API requests.
	 *
	 * @returns Relative URL path with encoded query parameters
	 *
	 * @private
	 *
	 * @example
	 * ```typescript
	 * // Image-based avatar
	 * // Returns: '/api/avatar?set=animals&id=cat&size=256&format=webp'
	 *
	 * // Text-based avatar
	 * // Returns: '/api/avatar?text=JD&color=%233b82f6&size=128'
	 *
	 * // Default/minimal
	 * // Returns: '/api/avatar'
	 * ```
	 */
	private getImageSrc(): string {
		const path = `/api/avatar`
		const params = []
		if (this.set.value) params.push(`set=${encodeURIComponent(this.set.value)}`)
		if (this.id.value) params.push(`id=${encodeURIComponent(this.id.value)}`)
		if (this.size.value) params.push(`size=${encodeURIComponent(this.size.value)}`)
		if (this.format.value) params.push(`format=${encodeURIComponent(this.format.value)}`)
		if (this.color.value) params.push(`color=${encodeURIComponent(this.color.value)}`)
		if (this.text.value) params.push(`text=${encodeURIComponent(this.text.value)}`)
		return params?.length > 0 ? `${path}?${params.join('&')}` : path
	}

	/**
	 * Determines if this avatar requires SVG generation.
	 * Returns true for text-based avatars, false for image-based avatars.
	 *
	 * @returns True if avatar needs to be built (has text), false if it's a static image
	 *
	 * @example
	 * ```typescript
	 * const imageAvatar = Avatar.create({ set: 'animals', id: 'cat' })
	 * console.log(imageAvatar.needBuild()) // false
	 *
	 * const textAvatar = Avatar.create({ text: 'JD' })
	 * console.log(textAvatar.needBuild()) // true
	 * ```
	 */
	needBuild(): boolean {
		return this.text.hasText()
	}
}
