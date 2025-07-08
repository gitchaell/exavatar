import { AvatarProps, Avatar } from '../../domain/Avatar.ts'
import { AvatarBlobBuilder } from '../../domain/AvatarBlobBuilder.ts'

export class AvatarService {
	async generate(params: AvatarProps) {
		return await AvatarBlobBuilder.build(new Avatar(params))
	}
}
