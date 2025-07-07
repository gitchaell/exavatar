import { ExavatarError } from '@/shared/ExavatarError.ts'

type Size = 16 | 32 | 64 | 128 | 256 | 512 | 1024

const sizes = [16, 32, 64, 128, 256, 512, 1024]

const defaultSize: Size = 16

export class AvatarSize {
	private constructor(public readonly value: Size) {}

	static create(input: unknown): AvatarSize {
		if (input === null || input === undefined) {
			return new AvatarSize(defaultSize)
		}

		if (typeof input !== 'string') {
			throw new AvatarSizeNotValidError(input)
		}

		const size = Number(input)

		if (!sizes.includes(size)) {
			throw new AvatarSizeNotValidError(input)
		}

		return new AvatarSize(size as Size)
	}
}

export class AvatarSizeNotValidError extends ExavatarError {
	constructor(size: unknown) {
		super(`Avatar.size <<${size}>> is not valid. Expected a valid size like: ${sizes.join(', ')}`)
	}
}
