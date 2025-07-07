// import { ExavatarError } from '@/shared/ExavatarError.ts'

// type Shape = 'square' | 'circle' | 'rounded'

// const shapes = ['square', 'circle', 'rounded']

// const defaultShape: Shape = 'square'

// export class AvatarShape {
// 	private constructor(public readonly value: Shape) {}

// 	static create(input: unknown): AvatarShape {
// 		if (input === null || input === undefined) {
// 			return new AvatarShape(defaultShape)
// 		}

// 		if (typeof input !== 'string') {
// 			throw new AvatarShapeNotValidError(input)
// 		}

// 		if (!shapes.includes(input)) {
// 			throw new AvatarShapeNotValidError(input)
// 		}

// 		return new AvatarShape(input as Shape)
// 	}
// }

// export class AvatarShapeNotValidError extends ExavatarError {
// 	constructor(shape: unknown) {
// 		super(
// 			`Avatar.shape <<${shape}>> is not valid. Expected a valid shape like: ${shapes.join(', ')}`,
// 		)
// 	}
// }
