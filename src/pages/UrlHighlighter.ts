import type { ShikiConfig } from 'astro'
import type { ShikiTransformer, ThemedToken } from 'shiki'

const urlHighlighter: ShikiTransformer = {
	name: 'url-highlighter',
	tokens(this, tokens) {
		for (const line of tokens) {
			for (let i = 0; i < line.length; i++) {
				const token = line[i]
				if (!/(https?:\/\/[^\s"'<>]+)/.test(token.content)) continue

				const url = token.content.match(/https?:\/\/[^\s"'<>]+/)?.[0]
				if (!url) continue

				try {
					const p = new URL(url)
					const parts: ThemedToken[] = []

					parts.push({
						content: p.protocol + '//',
						offset: token.offset,
						htmlAttrs: { class: 'url-protocol' },
					})
					parts.push({
						content: p.hostname,
						offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
						htmlAttrs: { class: 'url-domain' },
					})
					if (p.pathname)
						parts.push({
							content: p.pathname,
							offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
							htmlAttrs: { class: 'url-path' },
						})

					if ([...p.searchParams].length > 0) {
						parts.push({
							content: '?',
							offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
							htmlAttrs: { class: 'url-query' },
						})
						for (const [key, value] of p.searchParams.entries()) {
							parts.push({
								content: key,
								offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
								htmlAttrs: { class: 'url-param-key' },
							})
							parts.push({
								content: '=',
								offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
								htmlAttrs: { class: 'url-query' },
							})
							parts.push({
								content: value,
								offset: token.offset + parts.reduce((s, t) => s + t.content.length, 0),
								htmlAttrs: { class: 'url-param-value' },
							})
						}
					}

					// Reemplazamos el token original por los nuevos tokens
					line.splice(i, 1, ...parts)
					i += parts.length - 1
				} catch {
					// Si no es URL válida, ignoramos
				}
			}
		}
		return tokens
	},
}

export const transformers: ShikiConfig['transformers'] = [urlHighlighter]
