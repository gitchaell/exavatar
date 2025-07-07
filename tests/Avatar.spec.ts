import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { assertThrows } from 'https://deno.land/std@0.224.0/assert/assert_throws.ts'
import { Avatar } from '@/domain/Avatar.ts'

Deno.test({
	name: 'Avatar',
	fn: async (t) => {
		await t.step('should generate correct filename based on format', () => {
			const testCases = [
				{ format: 'jpeg', expected: 'ant.jpeg' },
				{ format: 'png', expected: 'ant.png' },
				{ format: 'webp', expected: 'ant.webp' },
			]

			for (const { format, expected } of testCases) {
				const avatar = new Avatar({
					set: 'animals',
					id: 'ant',
					format,
				})
				console.log(`[TEST] Testing filename generation for format: ${format}`)
				assertEquals(
					avatar.filename,
					expected,
					`Filename should be ${expected} for format ${format}`,
				)
			}
		})

		await t.step('should throw on not valid id', () => {
			const specialIds = ['user-1', 'user@example', 'user.name', '12345']

			for (const id of specialIds) {
				console.log(`[TEST] Testing not valid ID: ${id}`)
				assertThrows(
					() =>
						new Avatar({
							set: 'animals',
							id,
							format: 'png',
						}),
					Error,
				)
			}
		})

		await t.step('should throw error for invalid format', () => {
			console.log('[TEST] Testing invalid format validation')

			// Using type assertion with a more specific type
			const invalidAvatar = {
				set: 'animals',
				id: 'ant',
				format: 'invalid',
			} as unknown as { set: string; id: string; format: string }

			assertThrows(() => new Avatar(invalidAvatar), Error)
			console.log('[TEST] Correctly threw error for invalid format')
		})
	},
})
