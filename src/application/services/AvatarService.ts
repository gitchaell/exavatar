import { Avatar, AvatarProps } from '../../domain/avatar.ts'
import { AvatarNotFoundError } from '../../domain/exceptions.ts'
import { processAvatar } from '../../infrastructure/image/SharpImageProcessor.ts'

export class AvatarService {
	constructor(private assetsDir = 'src/assets') {}

	async generate(dto: AvatarProps): Promise<{ data: Uint8Array; type: string }> {
		const set = dto.set || 'animals'
		const id = dto.id || 'any'
		const avatar = new Avatar(set, id, dto)

		// Determine source file
		const path = `${this.assetsDir}/${set}/${id}.png`
		let data: Uint8Array
		try {
			data = await Deno.readFile(path)
		} catch (_err) {
			if (dto.text) {
				const svg = `<svg width="${avatar.size.value}" height="${avatar.size.value}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${avatar.bg.value}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${
					avatar.size.value / 2
				}" fill="${avatar.fg.value}">${dto.text}</text></svg>`
				data = new TextEncoder().encode(svg)
			} else {
				throw new AvatarNotFoundError('Avatar not found')
			}
		}

		const buffer = await processAvatar(
			data,
			avatar.size.value,
			avatar.format.value,
			avatar.shape.value,
		)
		return { data: buffer, type: avatar.format.value }
	}
}
