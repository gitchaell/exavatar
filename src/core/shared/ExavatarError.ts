/**
 * Base error class for all Exavatar-related errors.
 * Provides a common interface and naming convention for application errors.
 *
 * @example
 * ```typescript
 * throw new ExavatarError('Something went wrong')
 * ```
 */
export class ExavatarError extends Error {
	/**
	 * Creates a new ExavatarError instance
	 *
	 * @param message - Human-readable error message
	 */
	constructor(message: string) {
		super(message)
		this.name = 'ExavatarError'
	}
}

/**
 * Error thrown when an invalid parameter is provided to a function or method.
 * Typically used for validation failures in public APIs.
 *
 * @example
 * ```typescript
 * if (!url) {
 *   throw new InvalidParamError('url')
 * }
 * ```
 */
export class InvalidParamError extends ExavatarError {
	/**
	 * Creates a new InvalidParamError instance
	 *
	 * @param param - Name of the invalid parameter
	 */
	constructor(param: string) {
		super(`Invalid parameter <<${param}>>`)
	}
}

/**
 * Generic error for internal system failures.
 * Used when the specific cause of an error cannot be determined or exposed.
 *
 * @example
 * ```typescript
 * try {
 *   // risky operation
 * } catch (error) {
 *   console.error('Unexpected error:', error)
 *   throw new InternalError()
 * }
 * ```
 */
export class InternalError extends ExavatarError {
	/**
	 * Creates a new InternalError instance with a generic message
	 */
	constructor(cause?: string) {
		super(`Internal error. ${cause}`)
		this.cause = cause
	}
}
