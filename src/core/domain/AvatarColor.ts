import { ColorParser } from '../shared/ColorParser.ts'
import { ExavatarError } from '../shared/ExavatarError.ts'

export const defaultAvatarColor: string = '#000'

export class AvatarColor {
	private constructor(public readonly value: string) {}

	static create(input: unknown): AvatarColor {
		if (input === null || input === undefined || input === '') {
			return new AvatarColor(defaultAvatarColor)
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
