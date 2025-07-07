import { APIRoute } from 'astro'
import { AvatarService } from '@/application/services/AvatarService.ts'
import { ExavatarError } from '@/shared/ExavatarError.ts'

export const get: APIRoute = async ({ request }) => {
	const url = new URL(request.url)
	const service = new AvatarService()

	try {
		const params = Object.fromEntries(url.searchParams)
		const { data, type } = await service.generate(params)

		return new Response(data, {
			headers: {
				'Content-Type': `image/${type}`,
				'Cache-Control': 'public, max-age=86400',
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
