import { assert } from 'https://deno.land/std@0.224.0/assert/assert.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { AvatarService } from '../src/core/application/services/AvatarService.ts'
import { AvatarSizeType } from '../src/core/domain/AvatarSize.ts'

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
			assertEquals(result.type, 'svg+xml', 'Default format should be svg')
			console.log(
				`[TEST] Successfully generated ${result.type} avatar (${result.data.length} bytes)`,
			)
		})

		await t.step('should generate avatar with custom color', async () => {
			const result = await service.generate({
				text: 'CD',
				color: 'rgb(36 25 193)',
				size: '128',
			})

			assert(result.data.length > 0, 'Generated avatar data should not be empty')
			assertEquals(result.type, 'svg+xml', 'Should respect custom format')
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
			const sizes = ['64', '128', '256'] as AvatarSizeType[]

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
