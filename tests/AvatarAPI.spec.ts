import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { GET } from '../src/pages/api/avatar.ts'

type HandlerParams = Parameters<typeof GET>[0]

function createTestRequest(params: string, method: string = 'GET'): Request {
	return new Request('http://localhost:4321/api/avatar?' + params, { method })
}

Deno.test({
	name: 'Avatar API',
	sanitizeResources: false,
	sanitizeOps: false,
	fn: async (t) => {
		await t.step('should respond with 200 for valid text parameter', async () => {
			const request = createTestRequest('text=AB')
			const response = await GET({ request } as HandlerParams)

			assertEquals(response.status, 200, 'Should return status 200')
			assertEquals(
				response.headers.get('content-type'),
				'image/svg+xml',
				'Should return svg image by default',
			)
		})

		await t.step('should handle different query parameters', async () => {
			const testCases = [{ params: 'text=CD&size=128', expectedType: 'image/svg+xml' }]

			for (const { params, expectedType } of testCases) {
				const request = createTestRequest(params)
				const response = await GET({ request } as HandlerParams)

				assertEquals(response.status, 200, 'Should return status 200')
				assertEquals(
					response.headers.get('content-type'),
					expectedType,
					`Should return ${expectedType} for params: ${params}`,
				)
			}
		})
	},
})
