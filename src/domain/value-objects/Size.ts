export class Size {
	private constructor(public readonly value: number) {}

	static create(input?: string | null): Size {
		const num = input ? Number(input) : 256
		if (!Number.isInteger(num) || num < 1 || num > 1024) {
			throw new Error('Invalid size')
		}
		return new Size(num)
	}
}
