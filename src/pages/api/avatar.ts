import { APIRoute } from 'astro'
import { AvatarService } from '../../core/application/services/AvatarService.ts'
import { ExavatarError } from '../../core/shared/ExavatarError.ts'
import { environmentManager, Environment } from '../../core/shared/Environment.ts'
import { GitHubAvatarRepository } from '../../core/infrastructure/GitHubAvatarRepository.ts'
import { LocalAvatarRepository } from '../../core/infrastructure/LocalAvatarRepository.ts'

export const GET: APIRoute = async ({ request }) => {
	const repository = {
		[Environment.PRODUCTION]: new GitHubAvatarRepository(),
		[Environment.DEVELOPMENT]: new LocalAvatarRepository(),
	}[environmentManager.getEnvironment()]

	const service = new AvatarService(repository)

	try {
		const { data, type } = await service.generate(new URL(request.url))

		return new Response(data, {
			headers: {
				'Content-Type': `image/${type}`,
				'Cache-Control': environmentManager.isProduction() ? 'public, max-age=86400' : 'no-cache',
			},
		})
	} catch (error) {
		if (error instanceof ExavatarError) {
			return new Response(error.message, { status: 400 })
		}
		return new Response('Server Error', { status: 500 })
	}
}

export const POST: APIRoute = () => {
	return new Response('Method Not Allowed', { status: 405 })
}

export const PUT: APIRoute = () => {
	return new Response('Method Not Allowed', { status: 405 })
}

export const DELETE: APIRoute = () => {
	return new Response('Method Not Allowed', { status: 405 })
}
