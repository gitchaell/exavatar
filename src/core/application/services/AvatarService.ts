import { AvatarProps, Avatar } from '../../domain/Avatar.ts'
import { AvatarNotFoundError } from '../../domain/Exceptions.ts'
import { SvgAvatarBuilder } from '../../shared/SvgAvatarBuilder.ts'

export class AvatarService {
	async generate(params: AvatarProps): Promise<{ data: Uint8Array; type: string }> {
		const avatar = new Avatar(params)

		try {
			if (avatar.text.value.length > 0) {
				avatar.fileblob = SvgAvatarBuilder.build(avatar)
			} else {
				avatar.fileblob = await Deno.readFile(avatar.filepath)
			}
		} catch {
			throw new AvatarNotFoundError()
		}

		return {
			data: avatar.fileblob,
			type: avatar.text.value.length > 0 ? 'svg' : avatar.format.value,
		}
	}
}
