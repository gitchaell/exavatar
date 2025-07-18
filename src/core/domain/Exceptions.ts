import { ExavatarError } from '../shared/ExavatarError.ts'

export class AvatarNotFoundError extends ExavatarError {
	constructor() {
		super('Avatar not found')
	}
}

export class AvatarSvgBuilderError extends ExavatarError {
	constructor() {
		super('Avatar SVG builder error')
	}
}
