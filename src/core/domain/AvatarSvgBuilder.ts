import { Avatar } from './Avatar.ts'
import { AvatarSvgBuilderError } from './Exceptions.ts'
import { Color } from '../shared/Color.ts'

export class AvatarSvgBuilder {
	/**
	 * Genera un avatar SVG en formato Uint8Array
	 * @param avatar Configuración del avatar
	 */
	static build(avatar: Avatar): Uint8Array {
		try {
			const size = +avatar.size.value
			const bg = avatar.color.value
			const text = avatar.text.escaped()

			const textColor = Color.harmonize(bg)

			const fontSize = Math.floor((size * 0.5) / (text.length > 1 ? 1.5 : 1))
			const fontBold = {
				16: '400',
				32: '400',
				64: '500',
				128: '500',
				256: '600',
				512: '600',
				1024: '600',
			}[size ?? 16]
			const yOffset = size * 0.55

			const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Generated avatar"><rect width="100%" height="100%" fill="${bg}" /><text x="50%" y="${yOffset}" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" font-weight="${fontBold}" font-family="sans-serif" fill="${textColor}" stroke="${textColor}" stroke-width="${Math.max(1, size * 0.01)}" paint-order="stroke">${text}</text></svg>`

			return new TextEncoder().encode(svg)
		} catch (error) {
			console.error(error)
			throw new AvatarSvgBuilderError()
		}
	}
}
