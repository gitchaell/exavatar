import { APIRoute } from 'astro';
import { AvatarService } from '../application/services/AvatarService.ts';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const service = new AvatarService();
  try {
    const { data, type } = await service.generate(Object.fromEntries(url.searchParams) as any);
    return new Response(data, {
      headers: {
        'Content-Type': `image/${type}`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    if (err.name === 'AvatarNotFoundError') {
      return new Response('Not Found', { status: 404 });
    }
    if (err.name === 'InvalidParamError') {
      return new Response('Bad Request', { status: 400 });
    }
    console.error(err);
    return new Response('Server Error', { status: 500 });
  }
};
