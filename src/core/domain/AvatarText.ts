import { ExavatarError } from '../shared/ExavatarError.ts'

export const TEXT_LENGTH = 2

export class AvatarText {
	private constructor(public readonly value: string) {}

	static default() {
		return new AvatarText('')
	}

	static create(input: unknown): AvatarText {
		if (typeof input === 'string' && input.trim().length === TEXT_LENGTH) {
			return new AvatarText(input.trim().toUpperCase())
		}

		return AvatarText.default()
	}

	hasText(): boolean {
		return this.value.length > 0
	}

	escaped(): string {
		return this.value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
			.replace(/\n/g, '')
			.replace(/\s+/g, '')
			.trim()
	}
}

export class AvatarTextNotValidError extends ExavatarError {
	constructor(text: unknown) {
		super(`Avatar.text <<${text}>> is not valid. Expected a valid text with length ${TEXT_LENGTH}.`)
	}
}
