import { ExavatarError } from '../shared/ExavatarError.ts'
import { AvatarSetType } from './AvatarSet.ts'

export type AvatarAnimalIdTypes =
	| 'ant'
	| 'bear'
	| 'bee'
	| 'bull'
	| 'camel'
	| 'cat'
	| 'chameleon'
	| 'crab'
	| 'crocodile'
	| 'dinosaur'
	| 'dog'
	| 'dolphin'
	| 'duck'
	| 'eagle'
	| 'elephant'
	| 'flamingo'
	| 'fox'
	| 'frog'
	| 'goat'
	| 'gorilla'
	| 'hedgehog'
	| 'horse'
	| 'kangaroo'
	| 'koala'
	| 'ladybug'
	| 'lion'
	| 'mammoth'
	| 'mouse'
	| 'octopus'
	| 'owl'
	| 'panda'
	| 'parrot'
	| 'penguin'
	| 'pig'
	| 'pufferfish'
	| 'rabbit'
	| 'raccoon'
	| 'rooster'
	| 'shark'
	| 'slothbear'
	| 'snake'
	| 'tiger'
	| 'turtle'
	| 'whale'
	| 'zebra'

export type AvatarIdType = AvatarAnimalIdTypes

export const avatarIdsMap: Record<AvatarSetType, AvatarIdType[]> = {
	animals: [
		'ant',
		'bear',
		'bee',
		'bull',
		'camel',
		'cat',
		'chameleon',
		'crab',
		'crocodile',
		'dinosaur',
		'dog',
		'dolphin',
		'duck',
		'eagle',
		'elephant',
		'flamingo',
		'fox',
		'frog',
		'goat',
		'gorilla',
		'hedgehog',
		'horse',
		'kangaroo',
		'koala',
		'ladybug',
		'lion',
		'mammoth',
		'mouse',
		'octopus',
		'owl',
		'panda',
		'parrot',
		'penguin',
		'pig',
		'pufferfish',
		'rabbit',
		'raccoon',
		'rooster',
		'shark',
		'slothbear',
		'snake',
		'tiger',
		'turtle',
		'whale',
		'zebra',
	],
}

export const avatarIds: AvatarIdType[] = [...Object.entries(avatarIdsMap).flatMap(([, ids]) => ids)]

export const getDefaultAvatarId = (): AvatarIdType =>
	avatarIds[Math.floor(Math.random() * avatarIds.length)]

export class AvatarId {
	private constructor(public readonly value: AvatarIdType) {}

	static create(input: unknown): AvatarId {
		if (input === null || input === undefined || input === '') {
			return new AvatarId(getDefaultAvatarId())
		}

		if (typeof input !== 'string') {
			throw new AvatarIdNotValidError(input)
		}

		if (!avatarIds.includes(input as AvatarIdType)) {
			throw new AvatarIdNotValidError(input)
		}

		return new AvatarId(input as AvatarIdType)
	}
}

export class AvatarIdNotValidError extends ExavatarError {
	constructor(id: unknown) {
		super(`Avatar.id <<${id}>> is not valid. Expected a valid id like: ${avatarIds.join(', ')}.`)
	}
}
