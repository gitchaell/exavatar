import { assertEquals } from 'https://deno.land/std@0.224.0/testing/asserts.ts'
import { Avatar } from '../src/domain/avatar.ts'

Deno.test('Avatar fileName reflects format', () => {
	const avatar = new Avatar('animals', 'ant', { format: 'jpeg' })
	assertEquals(avatar.fileName, 'ant.jpeg')
})
