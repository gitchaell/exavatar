module.exports = {
	env: { es2021: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'prettier',
	],
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'@typescript-eslint/triple-slash-reference': 'off',
			},
		},
		{
			files: ['**/*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			rules: {},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro'],
			},
		},
	},
}
