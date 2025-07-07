import { ColorParser } from '../shared/ColorParser.ts'
import { ExavatarError } from '../shared/ExavatarError.ts'

const defaultColor: string = '#00EEDB'

export class AvatarColor {
	private constructor(public readonly value: string) {}

	static create(input: unknown): AvatarColor {
		if (input === null || input === undefined) {
			return new AvatarColor(defaultColor)
		}

		if (typeof input !== 'string') {
			throw new AvatarColorNotValidError(input)
		}

		const parsed = ColorParser.parse(input)

		if (parsed === null) {
			throw new AvatarColorNotValidError(input)
		}

		return new AvatarColor(input)
	}
}

export class AvatarColorNotValidError extends ExavatarError {
	constructor(color: unknown) {
		super(`Avatar.color <<${color}>> is not valid. Expected a valid CSS color.`)
	}
}
