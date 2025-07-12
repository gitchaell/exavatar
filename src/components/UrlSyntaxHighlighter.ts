type UrlTokenType =
	| 'protocol'
	| 'hostname'
	| 'port'
	| 'pathname'
	| 'search-key'
	| 'search-operator'
	| 'search-value'
	| 'hash'
	| 'href'

class UrlToken {
	content: string
	type: UrlTokenType

	constructor(content: string, type: UrlTokenType) {
		this.type = type
		this.content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	}

	get color() {
		switch (this.type) {
			case 'protocol':
				return '#38bdf8'
			case 'hostname':
				return '#22c55e'
			case 'port':
				return '#a855f7'
			case 'pathname':
				return '#facc15'
			case 'search-key':
				return '#f97316'
			case 'search-operator':
				return '#a855f7'
			case 'search-value':
				return '#ec4899'
			case 'hash':
				return '#2E5DE7'
			default:
				return '#9999A2'
		}
	}

	get html() {
		return `<span class="${this.type}" style="color: ${this.color}">${this.content}</span>`
	}
}

export class UrlSyntaxHighlighter {
	static process(code: string): string {
		return this.tokenize(code)
			.map((token) => token.html)
			.join('')
	}

	static tokenize(url: string): UrlToken[] {
		try {
			const parts = new URL(url)

			const tokens: UrlToken[] = []

			tokens.push(new UrlToken(parts.protocol + '//', 'protocol'))
			tokens.push(new UrlToken(parts.hostname, 'hostname'))

			if (parts.port) {
				tokens.push(new UrlToken(parts.port, 'port'))
			}

			if (parts.pathname) {
				tokens.push(new UrlToken(parts.pathname, 'pathname'))
			}

			if ([...parts.searchParams].length > 0) {
				tokens.push(new UrlToken('?', 'search-operator'))

				const entries = [...parts.searchParams.entries()]

				for (let index = 0; index < entries.length; index++) {
					const [key, value] = entries[index]

					if (value === null || value === undefined || value === '') {
						continue
					}

					tokens.push(new UrlToken(key, 'search-key'))
					tokens.push(new UrlToken('=', 'search-operator'))
					tokens.push(new UrlToken(value, 'search-value'))

					if (index < entries.length - 1) {
						tokens.push(new UrlToken('&', 'search-operator'))
					}
				}
			}

			if (parts.hash) {
				tokens.push(new UrlToken(parts.hash, 'hash'))
			}

			return tokens
		} catch {
			return [new UrlToken(url, 'href')]
		}
	}
}
