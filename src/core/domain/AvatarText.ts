import { ExavatarError } from '../shared/ExavatarError.ts'

export const TEXT_LENGTH = 2

export const defaultAvatarText: string = ''

export class AvatarText {
	private constructor(public readonly value: string) {}

	static create(input: unknown): AvatarText {
		if (input === null || input === undefined || input === '') {
			return new AvatarText(defaultAvatarText)
		}

		if (typeof input !== 'string') {
			throw new AvatarTextNotValidError(input)
		}

		if (input.length !== TEXT_LENGTH) {
			throw new AvatarTextNotValidError(input)
		}

		return new AvatarText(input)
	}
}

export class AvatarTextNotValidError extends ExavatarError {
	constructor(text: unknown) {
		super(`Avatar.text <<${text}>> is not valid. Expected a valid text with length ${TEXT_LENGTH}.`)
	}
}
