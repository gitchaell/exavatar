import { defineConfig } from 'astro/config'
import deno from '@deno/astro-adapter'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: deno(),
	// Tailwind v4 works natively with Vite - no integration needed
	integrations: [],
	vite: {
		css: {
			// Ensure Tailwind v4 is processed correctly
			transformer: 'postcss',
		},
	},
})
