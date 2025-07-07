import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import { get } from '../src/pages/api/avatar.ts'

type HandlerParams = Parameters<typeof get>[0]

function createTestRequest(url: string, method: string = 'GET'): Request {
	return new Request(url, { method })
}

Deno.test({
	name: 'Avatar API',
	sanitizeResources: false,
	sanitizeOps: false,
	fn: async (t) => {
		await t.step('should respond with 200 for valid text parameter', async () => {
			console.log('[TEST] Testing valid text parameter')
			const request = createTestRequest('http://localhost:4321/api/avatar?text=AB')
			const response = await get({ request } as HandlerParams)

			assertEquals(response.status, 200, 'Should return status 200')
			assertEquals(
				response.headers.get('content-type'),
				'image/webp',
				'Should return webp image by default',
			)
			console.log('[TEST] Successfully handled valid text parameter')
		})

		await t.step('should handle different query parameters', async () => {
			const testCases = [
				{ params: 'text=CD&size=128&format=png', expectedType: 'image/png' },
				{ params: 'text=EF&color=red&format=webp', expectedType: 'image/webp' },
				{ params: 'text=GH&bgColor=blue&format=jpeg', expectedType: 'image/jpeg' },
			]

			for (const { params, expectedType } of testCases) {
				console.log(`[TEST] Testing with params: ${params}`)
				const request = createTestRequest(`http://localhost:4321/api/avatar?${params}`)
				const response = await get({ request } as HandlerParams)

				assertEquals(response.status, 200, 'Should return status 200')
				assertEquals(
					response.headers.get('content-type'),
					expectedType,
					`Should return ${expectedType} for params: ${params}`,
				)
				console.log(`[TEST] Successfully handled params: ${params}`)
			}
		})

		await t.step('should handle errors properly', async () => {
			console.log('[TEST] Testing error handling')

			// Test missing text parameter
			let request = createTestRequest('http://localhost:4321/api/avatar')
			let response = await get({ request } as HandlerParams)
			assertEquals(response.status, 400, 'Should return 400 for missing text')

			// Test invalid size
			request = createTestRequest('http://localhost:4321/api/avatar?text=A&size=9999')
			response = await get({ request } as HandlerParams)
			assertEquals(response.status, 400, 'Should return 400 for invalid size')

			console.log('[TEST] Successfully handled error cases')
		})

		await t.step('should handle different HTTP methods', async () => {
			const methods = ['GET', 'POST', 'PUT', 'DELETE']

			for (const method of methods) {
				console.log(`[TEST] Testing HTTP ${method} method`)
				const request = createTestRequest('http://localhost:4321/api/avatar?text=TEST', method)
				const response = await get({ request } as HandlerParams)

				if (method === 'GET') {
					assertEquals(response.status, 200, 'GET should return 200')
				} else {
					assertEquals(response.status, 405, `${method} should return 405 Method Not Allowed`)
				}
				console.log(`[TEST] Successfully handled HTTP ${method} method`)
			}
		})
	},
})
