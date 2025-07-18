import { ExavatarError } from '../shared/ExavatarError.ts'

export const avatarSets = ['animals', 'rick_morty'] as const

export type AvatarSetType = (typeof avatarSets)[number]

export class AvatarSet {
	private constructor(public readonly value: AvatarSetType) {}

	static default(): AvatarSet {
		const set = avatarSets[Math.floor(Math.random() * avatarSets.length)]
		return new AvatarSet(set)
	}

	static create(input: unknown): AvatarSet {
		if (typeof input === 'string' && avatarSets.includes(input as AvatarSetType)) {
			return new AvatarSet(input as AvatarSetType)
		}

		return AvatarSet.default()
	}
}

export class AvatarSetNotValidError extends ExavatarError {
	constructor(set: unknown) {
		super(
			`Avatar.set <<${set}>> is not valid. Expected a valid set like: ${avatarSets.join(', ')}.`,
		)
	}
}
