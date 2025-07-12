import { ExavatarError } from '../shared/ExavatarError.ts'

export type AvatarSizeType = 16 | 32 | 64 | 128 | 256 | 512 | 1024

export const avatarSizes: AvatarSizeType[] = [16, 32, 64, 128, 256, 512, 1024]

export const getDefaultAvatarSize = (): AvatarSizeType =>
	avatarSizes[Math.floor(Math.random() * avatarSizes.length)]

export class AvatarSize {
	private constructor(public readonly value: AvatarSizeType) {}

	static create(input: unknown): AvatarSize {
		if (input === null || input === undefined || input === '') {
			return new AvatarSize(getDefaultAvatarSize())
		}

		if (typeof input !== 'string') {
			throw new AvatarSizeNotValidError(input)
		}

		const size = Number(input)

		if (!avatarSizes.includes(size as AvatarSizeType)) {
			throw new AvatarSizeNotValidError(input)
		}

		return new AvatarSize(size as AvatarSizeType)
	}
}

export class AvatarSizeNotValidError extends ExavatarError {
	constructor(size: unknown) {
		super(
			`Avatar.size <<${size}>> is not valid. Expected a valid size like: ${avatarSizes.join(', ')}`,
		)
	}
}
