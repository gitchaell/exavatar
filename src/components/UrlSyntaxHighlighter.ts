export interface UrlToken {
	content: string
	className: string
}

function escapeHtml(str: string): string {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function tokenizeUrl(url: string): UrlToken[] {
	try {
		const p = new URL(url)
		const tokens: UrlToken[] = []
		tokens.push({ content: p.protocol + '//', className: 'url-protocol' })
		tokens.push({ content: p.hostname, className: 'url-domain' })
		if (p.pathname) {
			tokens.push({ content: p.pathname, className: 'url-path' })
		}
		if ([...p.searchParams].length > 0) {
			tokens.push({ content: '?', className: 'url-query' })
			for (const [key, value] of p.searchParams.entries()) {
				tokens.push({ content: key, className: 'url-param-key' })
				tokens.push({ content: '=', className: 'url-query' })
				tokens.push({ content: value, className: 'url-param-value' })
			}
		}
		return tokens
	} catch {
		return [{ content: url, className: '' }]
	}
}

export function highlightUrl(url: string): string {
	return tokenizeUrl(url)
		.map((t) =>
			t.className ?
				`<span class="${t.className}">${escapeHtml(t.content)}</span>`
			:	escapeHtml(t.content),
		)
		.join('')
}
