import { Color } from '../shared/Color.ts'
import { ExavatarError } from '../shared/ExavatarError.ts'

export class AvatarColor {
	private constructor(public readonly value: string) {}

	static default() {
		return new AvatarColor(Color.random())
	}

	static create(input: unknown): AvatarColor {
		if (typeof input === 'string' && Color.isValid(input)) {
			return new AvatarColor(input)
		}

		return AvatarColor.default()
	}
}

export class AvatarColorNotValidError extends ExavatarError {
	constructor(color: unknown) {
		super(`Avatar.color <<${color}>> is not valid. Expected a valid CSS color.`)
	}
}
