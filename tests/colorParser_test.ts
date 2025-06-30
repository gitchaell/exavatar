import { assertEquals, assertThrows } from 'https://deno.land/std@0.224.0/testing/asserts.ts'
import { parseColor } from '../src/shared/colorParser.ts'

Deno.test('parseColor allows valid color', () => {
	assertEquals(parseColor('#fff'), '#fff')
})

Deno.test('parseColor rejects invalid color', () => {
	assertThrows(() => parseColor('badcolor'))
})
