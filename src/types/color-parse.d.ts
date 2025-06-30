declare module 'color-parse' {
	interface ColorObject {
		space: string
		values: number[]
		alpha: number
	}

	function parse(color: string): ColorObject | null
	export = parse
}
