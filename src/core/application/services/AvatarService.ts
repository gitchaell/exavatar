import { AvatarProps, Avatar } from '../../domain/Avatar.ts'
import { AvatarNotFoundError } from '../../domain/Exceptions.ts'
import { SvgAvatarBuilder } from '../../shared/SvgAvatarBuilder.ts'

export class AvatarService {
	async generate(params: AvatarProps): Promise<{ data: Uint8Array; type: string }> {
		const avatar = new Avatar(params)

		try {
			avatar.fileblob =
				avatar.onlyText() ? SvgAvatarBuilder.build(avatar) : await Deno.readFile(avatar.filepath)
		} catch {
			throw new AvatarNotFoundError()
		}

		return {
			data: avatar.fileblob,
			type: avatar.onlyText() ? 'svg' : avatar.format.value,
		}
	}
}
