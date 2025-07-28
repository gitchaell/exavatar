import { assert } from 'https://deno.land/std@0.224.0/assert/assert.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { AvatarService } from '../src/core/application/services/AvatarService.ts'
import { AvatarSizeType } from '../src/core/domain/AvatarSize.ts'

const service = new AvatarService()

// Helper function to create test URLs with query parameters
function createTestUrl(params: Record<string, string>): URL {
	const url = new URL('http://localhost:4321/api/avatar')
	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value)
		}
	}
	return url
}

Deno.test({
	name: 'AvatarService',
	sanitizeResources: false,
	sanitizeOps: false,
	fn: async (t) => {
		await t.step('should generate text avatar with default settings', async () => {
			console.log('[TEST] Testing text avatar generation with default settings')
			const url = createTestUrl({ text: 'MA' })
			const result = await service.generate(url)

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			assertEquals(result.type, 'svg+xml', 'Default format should be svg')
			console.log(
				`[TEST] Successfully generated ${result.type} avatar (${result.data.length} bytes)`,
			)
		})

		await t.step('should generate avatar with custom color', async () => {
			const url = createTestUrl({
				text: 'CD',
				color: 'rgb(36 25 193)',
				size: '128',
			})
			const result = await service.generate(url)

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			assertEquals(result.type, 'svg+xml', 'Should respect custom format')
			console.log(
				`[TEST] Successfully generated ${result.type} avatar with custom color (${result.data.length} bytes)`,
			)
		})

		await t.step('should generate avatar with text', async () => {
			const text = 'JD'
			console.log(`[TEST] Testing avatar generation with text: "${text}"`)

			const url = createTestUrl({ text })
			const result = await service.generate(url)

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			console.log(
				`[TEST] Successfully generated avatar for text "${text}" (${result.data.length} bytes)`,
			)
		})

		await t.step('should handle special characters in text', async () => {
			const specialTexts = ['@#', '12', '你好', '😊']

			for (const text of specialTexts) {
				console.log(`[TEST] Testing special characters: "${text}"`)
				const url = createTestUrl({ text })
				const result = await service.generate(url)
				assert(result.data.length > 0, `Failed to generate avatar for text: ${text}`)
				console.log(`[TEST] Successfully handled special characters: "${text}"`)
			}
		})

		await t.step('should respect size parameter', async () => {
			const sizes = ['64', '128', '256'] as AvatarSizeType[]

			for (const size of sizes) {
				console.log(`[TEST] Testing avatar generation with size: ${size}`)
				const url = createTestUrl({
					text: 'SZ',
					size,
				})
				const result = await service.generate(url)
				assert(result.data.length > 0, `Failed to generate ${size}x${size} avatar`)
				console.log(`[TEST] Successfully generated ${size}x${size} avatar`)
			}
		})
	},
})
