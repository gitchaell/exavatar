import { Avatar } from './Avatar.ts'
import { environment, baseUrl } from '../shared/Environment.ts'
import { AvatarSvgBuilder } from './AvatarSvgBuilder.ts'
import { AvatarNotFoundError } from './Exceptions.ts'
import { AvatarFormatType } from './AvatarFormat.ts'

export class AvatarBlobBuilder {
	static async build(
		avatar: Avatar,
	): Promise<{ data: Uint8Array; type: AvatarFormatType | 'svg' }> {
		try {
			if (avatar.hasText()) {
				return {
					data: AvatarSvgBuilder.build(avatar),
					type: 'svg',
				}
			}

			const url = `${baseUrl}${avatar.filepath}`

			if (environment === 'production') {
				return {
					data: await fetch(url).then(
						async (response) => new Uint8Array(await response.arrayBuffer()),
					),
					type: avatar.format.value,
				}
			}

			return {
				data: await Deno.readFile(url),
				type: avatar.format.value,
			}
		} catch (error) {
			console.error(error)
			throw new AvatarNotFoundError()
		}
	}
}
