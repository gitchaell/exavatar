import { APIRoute } from 'astro'
import { AvatarService } from '../../core/application/services/AvatarService.ts'
import { ExavatarError } from '../../core/shared/ExavatarError.ts'
import { environment } from '../../core/shared/Environment.ts'

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url)
	const service = new AvatarService()

	try {
		const params = Object.fromEntries(url.searchParams)
		const { data, type } = await service.generate(params)

		return new Response(data, {
			headers: {
				'Content-Type': `image/${type}`,
				'Cache-Control': environment === 'production' ? 'public, max-age=86400' : 'no-cache',
			},
		})
	} catch (error) {
		console.error(error)
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
