import { ExavatarError } from '../shared/ExavatarError.ts'

type Format = 'png' | 'jpeg' | 'webp'

const formats = ['png', 'jpeg', 'webp']

const defaultFormat: Format = 'webp'

export class AvatarFormat {
	private constructor(public readonly value: Format) {}

	static create(input: unknown): AvatarFormat {
		if (input === null || input === undefined) {
			return new AvatarFormat(defaultFormat)
		}

		if (typeof input !== 'string') {
			throw new AvatarFormatNotValidError(input)
		}

		if (!formats.includes(input)) {
			throw new AvatarFormatNotValidError(input)
		}

		return new AvatarFormat(input as Format)
	}
}

export class AvatarFormatNotValidError extends ExavatarError {
	constructor(format: unknown) {
		super(
			`Avatar.format <<${format}>> is not valid. Expected a valid image format like: ${formats.join(
				', ',
			)}`,
		)
	}
}
