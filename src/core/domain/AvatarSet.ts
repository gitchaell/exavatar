import { ExavatarError } from '../shared/ExavatarError.ts'

type Set = 'animals'

const sets = ['animals']

const defaultSet: Set = 'animals'

export class AvatarSet {
	private constructor(public readonly value: Set) {}

	static create(input: unknown): AvatarSet {
		if (input === null || input === undefined) {
			return new AvatarSet(defaultSet)
		}

		if (typeof input !== 'string') {
			throw new AvatarSetNotValidError(input)
		}

		if (!sets.includes(input)) {
			throw new AvatarSetNotValidError(input)
		}

		return new AvatarSet(input as Set)
	}
}

export class AvatarSetNotValidError extends ExavatarError {
	constructor(set: unknown) {
		super(`Avatar.set <<${set}>> is not valid. Expected a valid set like: ${sets.join(', ')}.`)
	}
}
