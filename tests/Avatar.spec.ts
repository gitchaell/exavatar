import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { assertThrows } from 'https://deno.land/std@0.224.0/assert/assert_throws.ts'
import { Avatar } from '../src/core/domain/Avatar.ts'
import { AvatarColor } from '../src/core/domain/AvatarColor.ts'
import { AvatarFormat, AvatarFormatType } from '../src/core/domain/AvatarFormat.ts'
import { AvatarSize } from '../src/core/domain/AvatarSize.ts'
import { AvatarIdType } from '../src/core/domain/AvatarId.ts'
import { AvatarSetType } from '../src/core/domain/AvatarSet.ts'

Deno.test({
	name: 'Avatar',
	fn: async (t) => {
		await t.step('should generate correct filename based on format', () => {
			const testCases = [
				{ format: 'jpeg' as AvatarFormatType, expected: 'ant.jpeg' },
				{ format: 'png' as AvatarFormatType, expected: 'ant.png' },
				{ format: 'webp' as AvatarFormatType, expected: 'ant.webp' },
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

		await t.step('should throw error for invalid format', () => {
			console.log('[TEST] Testing invalid format validation')

			// Using type assertion with a more specific type
			const invalidAvatar = {
				set: 'animals' as AvatarSetType,
				id: 'ant' as AvatarIdType,
				format: 'invalid' as AvatarFormatType,
			}

			assertThrows(() => new Avatar(invalidAvatar), Error)
			console.log('[TEST] Correctly threw error for invalid format')
		})
	},
})

// Test suite for AvatarSize
Deno.test({
	name: 'AvatarSize',
	fn: async (t) => {
		await t.step('should create with valid size', () => {
			const sizes = ['16', '64', '256', '512']
			for (const size of sizes) {
				const result = AvatarSize.create(size)
				console.log(`[TEST] Created AvatarSize with value: ${result.value}`)
				assertEquals(result.value, size)
			}
		})
	},
})

// Test suite for AvatarFormat
Deno.test({
	name: 'AvatarFormat',
	fn: async (t) => {
		await t.step('should throw on invalid format', () => {
			const invalidFormats = ['bmp', 'gif', 'tiff']
			for (const format of invalidFormats) {
				console.log(`[TEST] Testing invalid format: ${format}`)
				assertThrows(() => AvatarFormat.create(format), Error)
			}
		})
	},
})

// Test suite for AvatarColor
Deno.test({
	name: 'AvatarColor',
	fn: async (t) => {
		const validColors = [
			'#000',
			'#FFFFFF',
			'rgb(255, 0, 0)',
			'rgba(0, 0, 0, 0.5)',
			'hsl(120, 100%, 50%)',
			'red',
		]

		await t.step('should create with valid color', () => {
			for (const color of validColors) {
				const result = AvatarColor.create(color)
				console.log(`[TEST] Created AvatarColor with value: ${result.value}`)
				assertEquals(result.value, color)
			}
		})
	},
})
