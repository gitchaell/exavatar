import { ExavatarError } from '../shared/ExavatarError.ts'

export const avatarSizes = ['16', '32', '64', '128', '256', '512', '1024'] as const

export type AvatarSizeType = (typeof avatarSizes)[number]

export class AvatarSize {
	private constructor(public readonly value: AvatarSizeType) {}

	static default() {
		// const size = avatarSizes[Math.floor(Math.random() * avatarSizes.length)]
		return new AvatarSize('256')
	}

	static create(input: unknown): AvatarSize {
		if (typeof input === 'string' && avatarSizes.includes(input as AvatarSizeType)) {
			return new AvatarSize(input as AvatarSizeType)
		}

		return AvatarSize.default()
	}
}

export class AvatarSizeNotValidError extends ExavatarError {
	constructor(size: unknown) {
		super(
			`Avatar.size <<${size}>> is not valid. Expected a valid size like: ${avatarSizes.join(', ')}`,
		)
	}
}
