export class ExavatarError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ExavatarError'
	}
}

export class InvalidParamError extends ExavatarError {
	constructor(param: string) {
		super(`Invalid parameter <<${param}>>`)
	}
}

export class InternalError extends ExavatarError {
	constructor() {
		super('Internal error')
	}
}
