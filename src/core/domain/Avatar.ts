import { AvatarSize } from './AvatarSize.ts'
import { AvatarFormat } from './AvatarFormat.ts'
import { AvatarColor } from './AvatarColor.ts'
import { AvatarText } from './AvatarText.ts'
import { AvatarId } from './AvatarId.ts'
import { AvatarSet } from './AvatarSet.ts'

export interface AvatarProps {
	set?: unknown
	id?: unknown
	size?: unknown
	format?: unknown
	color?: unknown
	text?: unknown
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
		this.id = AvatarId.create(props.id)
		this.size = AvatarSize.create(props.size)
		this.format = AvatarFormat.create(props.format)
		this.color = AvatarColor.create(props.color)
		this.text = AvatarText.create(props.text)

		this.filename = `${this.id.value}.${this.format.value}`
		this.filepath = `${this.set.value}/${this.size.value}/${this.filename}`
	}

	onlyText(): boolean {
		return this.text.value.length > 0
	}
}
