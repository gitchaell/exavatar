import { AvatarProps, Avatar } from '../../domain/Avatar.ts'
import { AvatarNotFoundError } from '../../domain/Exceptions.ts'
import { SvgAvatarBuilder } from '../../shared/SvgAvatarBuilder.ts'

export class AvatarService {
	async generate(params: AvatarProps): Promise<{ data: Uint8Array; type: string }> {
		const avatar = new Avatar(params)

		try {
			avatar.fileblob =
				avatar.onlyText() ? SvgAvatarBuilder.build(avatar) : await this.getFileBlob(avatar.filepath)
		} catch (error) {
			console.error(error)
			throw new AvatarNotFoundError()
		}

		return {
			data: avatar.fileblob,
			type: avatar.onlyText() ? 'svg' : avatar.format.value,
		}
	}

	private async getFileBlob(filepath: string): Promise<Uint8Array> {
		console.log(JSON.stringify({ ENV: Deno.env.get('ENV'), BASE_URL: Deno.env.get('BASE_URL') }))

		const isProduction = Deno.env.get('ENV') === 'production'

		if (!isProduction) {
			return Deno.readFile(Deno.env.get('BASE_URL') + filepath)
		}

		const res = await fetch(Deno.env.get('BASE_URL') + filepath)

		if (!res.ok) throw new Error(`Failed to fetch avatar from ${filepath}: ${res.status}`)

		const buffer = new Uint8Array(await res.arrayBuffer())

		return buffer
	}
}
