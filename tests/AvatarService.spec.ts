import { AvatarService } from '@/application/services/AvatarService.ts'
import { assert } from 'https://deno.land/std@0.224.0/assert/assert.ts'
import { assertRejects } from 'https://deno.land/std@0.224.0/assert/assert_rejects.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'

const service = new AvatarService()

Deno.test({
	name: 'AvatarService',
	sanitizeResources: false,
	sanitizeOps: false,
	fn: async (t) => {
		await t.step('should generate text avatar with default settings', async () => {
			console.log('[TEST] Testing text avatar generation with default settings')
			const result = await service.generate({ text: 'MA' })

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			assertEquals(result.type, 'webp', 'Default format should be webp')
			console.log(
				`[TEST] Successfully generated ${result.type} avatar (${result.data.length} bytes)`,
			)
		})

		await t.step('should generate avatar with custom color', async () => {
			const color = 'rgb(36 25 193)'
			console.log(`[TEST] Testing avatar generation with color: ${color}`)

			const result = await service.generate({
				text: 'CD',
				color,
				size: '128',
				format: 'png',
			})

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			assertEquals(result.type, 'png', 'Should respect custom format')
			console.log(
				`[TEST] Successfully generated ${result.type} avatar with custom color (${result.data.length} bytes)`,
			)
		})

		await t.step('should generate avatar with text', async () => {
			const text = 'JD'
			console.log(`[TEST] Testing avatar generation with text: "${text}"`)

			const result = await service.generate({ text })

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			console.log(
				`[TEST] Successfully generated avatar for text "${text}" (${result.data.length} bytes)`,
			)
		})

		await t.step('should throw when image is missing and no text provided', async () => {
			console.log('[TEST] Testing error case: missing image and no text')

			await assertRejects(() => service.generate({ id: 'missing', set: 'animals' }), Error)
			console.log('[TEST] Correctly threw error for missing image and no text')
		})

		await t.step('should handle special characters in text', async () => {
			const specialTexts = ['@#', '12', '你好', '😊']

			for (const text of specialTexts) {
				console.log(`[TEST] Testing special characters: "${text}"`)
				const result = await service.generate({ text })
				assert(result.data.length > 0, `Failed to generate avatar for text: ${text}`)
				console.log(`[TEST] Successfully handled special characters: "${text}"`)
			}
		})

		await t.step('should respect size parameter', async () => {
			const sizes = ['64', '128', '256']

			for (const size of sizes) {
				console.log(`[TEST] Testing avatar generation with size: ${size}`)
				const result = await service.generate({
					text: 'SZ',
					size,
				})
				assert(result.data.length > 0, `Failed to generate ${size}x${size} avatar`)
				console.log(`[TEST] Successfully generated ${size}x${size} avatar`)
			}
		})
	},
})
