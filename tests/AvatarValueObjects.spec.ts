import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { assertThrows } from 'https://deno.land/std@0.224.0/assert/assert_throws.ts'
import { AvatarSize } from '@/domain/AvatarSize.ts'
import { AvatarFormat } from '@/domain/AvatarFormat.ts'
import { AvatarColor } from '@/domain/AvatarColor.ts'

// Test suite for AvatarSize
Deno.test({
	name: 'AvatarSize',
	fn: async (t) => {
		await t.step('should create with valid size', () => {
			const sizes = ['16', '64', '256', '512']
			for (const size of sizes) {
				const result = AvatarSize.create(size)
				console.log(`[TEST] Created AvatarSize with value: ${result.value}`)
				assertEquals(result.value, parseInt(size, 10))
			}
		})

		await t.step('should throw on invalid size', () => {
			const invalidSizes = ['0', '-1', '1025', 'not-a-number']
			for (const size of invalidSizes) {
				console.log(`[TEST] Testing invalid size: ${size}`)
				assertThrows(() => AvatarSize.create(size), Error)
			}
		})
	},
})

// Test suite for AvatarFormat
Deno.test({
	name: 'AvatarFormat',
	fn: async (t) => {
		const validFormats = ['webp', 'png', 'jpeg']

		await t.step('should create with valid format', () => {
			for (const format of validFormats) {
				const result = AvatarFormat.create(format)
				console.log(`[TEST] Created AvatarFormat with value: ${result.value}`)
				assertEquals(result.value, format)
			}
		})

		await t.step('should throw on invalid format', () => {
			const invalidFormats = ['bmp', 'gif', 'tiff', '']
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

		await t.step('should throw on invalid color', () => {
			const invalidColors = ['not-a-color', '#zzz', 'rgb(300, 0, 0)', '']
			for (const color of invalidColors) {
				console.log(`[TEST] Testing invalid color: ${color}`)
				assertThrows(() => AvatarColor.create(color), Error)
			}
		})
	},
})
