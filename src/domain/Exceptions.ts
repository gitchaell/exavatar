import { ExavatarError } from '@/shared/ExavatarError.ts'

export class AvatarNotFoundError extends ExavatarError {
	constructor() {
		super('Avatar not found')
	}
}
