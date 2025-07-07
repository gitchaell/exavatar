import { ExavatarError } from '@/shared/ExavatarError.ts'

const MIN_TEXT_LENGTH = 1
const MAX_TEXT_LENGTH = 2

const defaultText: string = ''

export class AvatarText {
	private constructor(public readonly value: string) {}

	static create(input: unknown): AvatarText {
		if (input === null || input === undefined) {
			return new AvatarText(defaultText)
		}

		if (typeof input !== 'string') {
			throw new AvatarTextNotValidError(input)
		}

		if (input.length < MIN_TEXT_LENGTH || input.length > MAX_TEXT_LENGTH) {
			throw new AvatarTextNotValidError(input)
		}

		return new AvatarText(input)
	}
}

export class AvatarTextNotValidError extends ExavatarError {
	constructor(text: unknown) {
		super(
			`Avatar.text <<${text}>> is not valid. Expected a valid text with length between ${MIN_TEXT_LENGTH} and ${MAX_TEXT_LENGTH}.`,
		)
	}
}
