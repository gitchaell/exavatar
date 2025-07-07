import { AvatarProps, Avatar } from '../../domain/Avatar.ts'
import { AvatarNotFoundError } from '../../domain/Exceptions.ts'
import { SvgAvatarBuilder } from '../../shared/SvgAvatarBuilder.ts'
import process from 'node:process'

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
		const isProduction = process.env.NODE_ENV === 'production'

		if (!isProduction) {
			return Deno.readFile('avatars/' + filepath)
		}

		const res = await fetch(
			'https://raw.githubusercontent.com/gitchaell/exavatar/refs/heads/main/avatars/' + filepath,
		)
		if (!res.ok) throw new Error(`Failed to fetch avatar from ${filepath}: ${res.status}`)
		const buffer = new Uint8Array(await res.arrayBuffer())
		return buffer
	}
}
