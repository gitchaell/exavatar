import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://exavatar.vercel.app',
	output: 'server',
	adapter: vercel(),
	integrations: [],
	vite: {
		plugins: [tailwindcss()],
	},
});
