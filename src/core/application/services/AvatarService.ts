import { Avatar } from '../../domain/Avatar.ts'
import { AvatarBlobBuilder } from '../../domain/AvatarBlobBuilder.ts'

export class AvatarService {
	async generate(url: URL) {
		return await AvatarBlobBuilder.build(Avatar.fromUrl(url))
	}
}
