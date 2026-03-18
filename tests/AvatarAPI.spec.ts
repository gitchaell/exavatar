import { describe, test, expect } from 'vitest';
import { GET } from '../src/pages/api/avatar.ts';

type HandlerParams = Parameters<typeof GET>[0];

function createTestRequest(params: string, method: string = 'GET'): Request {
	return new Request('http://localhost:4321/api/avatar?' + params, { method });
}

describe('Avatar API', () => {
	test('should respond with 200 for valid text parameter', async () => {
		const request = createTestRequest('text=AB');
		const response = await GET({ request } as HandlerParams);

		expect(response.status).toBe(200);
		expect(response.headers.get('content-type')).toBe('image/svg+xml');
	});

	test('should handle different query parameters', async () => {
		const testCases = [
			{ params: 'text=CD&size=128', expectedType: 'image/svg+xml' },
		];

		for (const { params, expectedType } of testCases) {
			const request = createTestRequest(params);
			const response = await GET({ request } as HandlerParams);

			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toBe(expectedType);
		}
	});
});
