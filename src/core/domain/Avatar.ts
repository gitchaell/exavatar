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
	fileblob?: Uint8Array

	constructor(props: AvatarProps) {
		this.set = AvatarSet.create(props.set)
		this.id = AvatarId.create(props.id, this.set.value)
		this.size = AvatarSize.create(props.size)
		this.format = AvatarFormat.create(props.format)
		this.color = AvatarColor.create(props.color)
		this.text = AvatarText.create(props.text)

		this.filename = `${this.id.value}.${this.format.value}`
		this.filepath = `${this.set.value}/${this.size.value}/${this.filename}`
	}

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

	hasText(): boolean {
		return this.text.hasText()
	}
}
