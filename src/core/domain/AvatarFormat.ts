import { ExavatarError } from '../shared/ExavatarError.ts'

export type AvatarFormatType = 'png' | 'jpeg' | 'webp'

export const avatarFormats: AvatarFormatType[] = ['png', 'jpeg', 'webp']

export const defaultAvatarFormat: AvatarFormatType = 'webp'

export class AvatarFormat {
	private constructor(public readonly value: AvatarFormatType) {}

	static create(input: unknown): AvatarFormat {
		if (input === null || input === undefined) {
			return new AvatarFormat(defaultAvatarFormat)
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
