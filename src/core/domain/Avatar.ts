import { AvatarSize, AvatarSizeType } from './AvatarSize.ts'
import { AvatarFormat, AvatarFormatType } from './AvatarFormat.ts'
import { AvatarColor } from './AvatarColor.ts'
import { AvatarText } from './AvatarText.ts'
import { AvatarId, AvatarIdType } from './AvatarId.ts'
import { AvatarSet, AvatarSetType } from './AvatarSet.ts'

export interface AvatarProps {
	set?: AvatarSetType
	id?: AvatarIdType
	size?: AvatarSizeType
	format?: AvatarFormatType
	color?: string
	text?: string
}

export class Avatar {
	readonly set: AvatarSet
	readonly id: AvatarId
	readonly size: AvatarSize
	readonly format: AvatarFormat
	readonly color: AvatarColor
	readonly text: AvatarText

	readonly filepath: string
	readonly filename: string

	readonly imagesrc: string
	readonly codeurl: string

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

	static create(props: AvatarProps): Avatar {
		return new Avatar(props)
	}

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

	hasText(): boolean {
		return this.text.hasText()
	}
}
