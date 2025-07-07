import { ExavatarError } from '../shared/ExavatarError.ts'

type AnimalIds =
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

const animalIds = [
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
]

type Id = AnimalIds

const ids = [...animalIds]

const defaultId: Id = ids[Math.floor(Math.random() * ids.length)] as Id

export class AvatarId {
	private constructor(public readonly value: Id) {}

	static create(input: unknown): AvatarId {
		if (input === null || input === undefined) {
			return new AvatarId(defaultId)
		}

		if (typeof input !== 'string') {
			throw new AvatarIdNotValidError(input)
		}

		if (!animalIds.includes(input)) {
			throw new AvatarIdNotValidError(input)
		}

		return new AvatarId(input as Id)
	}
}

export class AvatarIdNotValidError extends ExavatarError {
	constructor(id: unknown) {
		super(`Avatar.id <<${id}>> is not valid. Expected a valid id like: ${ids.join(', ')}.`)
	}
}
