import { Avatar, AvatarProps } from '@/domain/Avatar.ts'
import { AvatarNotFoundError } from '@/domain/Exceptions.ts'
import { SvgAvatarBuilder } from '@/shared/SvgAvatarBuilder.ts'

export class AvatarService {
	async generate(params: AvatarProps): Promise<{ data: Uint8Array; type: string }> {
		const avatar = new Avatar(params)

		try {
			avatar.fileblob = await Deno.readFile(avatar.filepath)
		} catch {
			if (params.text) {
				avatar.fileblob = SvgAvatarBuilder.build(avatar)
			} else {
				throw new AvatarNotFoundError()
			}
		}

		return { data: avatar.fileblob, type: avatar.format.value }
	}
}
