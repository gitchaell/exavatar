import { ExavatarError } from '../shared/ExavatarError.ts'

export type AvatarSetType = 'animals'

export const avatarSets: AvatarSetType[] = ['animals']

export const getDefaultAvatarSet = (): AvatarSetType =>
	avatarSets[Math.floor(Math.random() * avatarSets.length)]

export class AvatarSet {
	private constructor(public readonly value: AvatarSetType) {}

	static create(input: unknown): AvatarSet {
		if (input === null || input === undefined || input === '') {
			return new AvatarSet(getDefaultAvatarSet())
		}

		if (typeof input !== 'string') {
			throw new AvatarSetNotValidError(input)
		}

		if (!avatarSets.includes(input as AvatarSetType)) {
			throw new AvatarSetNotValidError(input)
		}

		return new AvatarSet(input as AvatarSetType)
	}
}

export class AvatarSetNotValidError extends ExavatarError {
	constructor(set: unknown) {
		super(
			`Avatar.set <<${set}>> is not valid. Expected a valid set like: ${avatarSets.join(', ')}.`,
		)
	}
}
