declare module 'color-parse' {
	interface ColorParseResult {
		space?: string
		values?: number[]
		alpha?: number
	}

	function parse(input: string): ColorParseResult | null

	export default parse
}
