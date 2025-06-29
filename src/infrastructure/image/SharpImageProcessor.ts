import sharp from 'npm:sharp'
import { AvatarShape } from '../../domain/value-objects/Shape.ts'
import { ImageFormat } from '../../domain/value-objects/Format.ts'
import { Buffer } from 'node:buffer'

export async function processAvatar(
	data: Uint8Array,
	size: number,
	format: ImageFormat,
	shape: AvatarShape,
) {
	let img = sharp(data).resize(size, size)
	if (shape === 'circle') {
		const radius = size / 2
		const svg = `<svg><circle cx="${radius}" cy="${radius}" r="${radius}"/></svg>`
		img = img.composite([{ input: Buffer.from(svg), blend: 'dest-in' }])
	} else if (shape === 'rounded') {
		const svg = `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${
			size * 0.25
		}" ry="${size * 0.25}"/></svg>`
		img = img.composite([{ input: Buffer.from(svg), blend: 'dest-in' }])
	}
	return await img.toFormat(format).toBuffer()
}
