import { ExavatarError } from '../shared/ExavatarError.ts'

export const avatarFormats = ['png', 'jpeg', 'webp'] as const

export type AvatarFormatType = (typeof avatarFormats)[number]

export class AvatarFormat {
	private constructor(public readonly value: AvatarFormatType) {}

	static default() {
		return new AvatarFormat('webp')
	}

	static create(input: unknown): AvatarFormat {
		if (input === null || input === undefined || input === '') {
			return AvatarFormat.default()
		}

		if (typeof input !== 'string') {
			throw new AvatarFormatNotValidError(input)
		}

		if (!avatarFormats.includes(input as AvatarFormatType)) {
			throw new AvatarFormatNotValidError(input)
		}

		return new AvatarFormat(input as AvatarFormatType)
	}
}

export class AvatarFormatNotValidError extends ExavatarError {
	constructor(format: unknown) {
		super(
			`Avatar.format <<${format}>> is not valid. Expected a valid image format like: ${avatarFormats.join(
				', ',
			)}`,
		)
	}
}
