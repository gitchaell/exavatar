import { describe, test, expect } from 'vitest';
import { AvatarService } from '../src/core/application/services/AvatarService.ts';
import type { AvatarSizeType } from '../src/core/domain/AvatarSize.ts';
import { LocalAvatarRepository } from '../src/core/infrastructure/LocalAvatarRepository.ts';

const repository = new LocalAvatarRepository();
const service = new AvatarService(repository);

function createTestUrl(params: Record<string, string>): URL {
	const url = new URL('http://localhost:4321/api/avatar');
	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value);
		}
	}
	return url;
}

describe('AvatarService', () => {
	test('should generate text avatar with default settings', async () => {
		const url = createTestUrl({ text: 'MA' });
		const result = await service.generate(url);

		expect(result.data.length).toBeGreaterThan(0);
		expect(result.type).toBe('svg+xml');
	});

	test('should generate avatar with custom color', async () => {
		const url = createTestUrl({
			text: 'CD',
			color: 'rgb(36 25 193)',
			size: '128',
		});
		const result = await service.generate(url);

		expect(result.data.length).toBeGreaterThan(0);
		expect(result.type).toBe('svg+xml');
	});

	test('should generate avatar with text', async () => {
		const text = 'JD';

		const url = createTestUrl({ text });
		const result = await service.generate(url);

		expect(result.data.length).toBeGreaterThan(0);
	});

	test('should handle special characters in text', async () => {
		const specialTexts = ['@#', '12', '你好', '😊'];

		for (const text of specialTexts) {
			const url = createTestUrl({ text });
			const result = await service.generate(url);
			expect(result.data.length).toBeGreaterThan(0);
		}
	});

	test('should respect size parameter', async () => {
		const sizes = ['64', '128', '256'] as AvatarSizeType[];

		for (const size of sizes) {
			const url = createTestUrl({
				text: 'SZ',
				size,
			});
			const result = await service.generate(url);
			expect(result.data.length).toBeGreaterThan(0);
		}
	});
});
