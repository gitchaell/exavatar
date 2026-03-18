import { expect, test, describe } from 'vitest';
import { Avatar } from '../src/core/domain/Avatar.ts';
import { AvatarColor } from '../src/core/domain/AvatarColor.ts';
import {
	AvatarFormat,
	type AvatarFormatType,
} from '../src/core/domain/AvatarFormat.ts';
import { AvatarSize } from '../src/core/domain/AvatarSize.ts';
import type { AvatarIdType } from '../src/core/domain/AvatarId.ts';
import type { AvatarSetType } from '../src/core/domain/AvatarSet.ts';

describe('Avatar', () => {
	test('should generate correct filename based on format', () => {
		const testCases = [
			{ format: 'jpeg' as AvatarFormatType, expected: 'ant.jpeg' },
			{ format: 'png' as AvatarFormatType, expected: 'ant.png' },
			{ format: 'webp' as AvatarFormatType, expected: 'ant.webp' },
		];

		for (const { format, expected } of testCases) {
			const avatar = new Avatar({
				set: 'animals',
				id: 'ant',
				format,
			});
			expect(avatar.filename).toBe(expected);
		}
	});

	test('should throw error for invalid format', () => {
		const invalidAvatar = {
			set: 'animals' as AvatarSetType,
			id: 'ant' as AvatarIdType,
			format: 'invalid' as AvatarFormatType,
		};

		expect(() => new Avatar(invalidAvatar)).toThrow(Error);
	});
});

describe('AvatarSize', () => {
	test('should create with valid size', () => {
		const sizes = ['16', '64', '256', '512'];
		for (const size of sizes) {
			const result = AvatarSize.create(size);
			expect(result.value).toBe(size);
		}
	});
});

describe('AvatarFormat', () => {
	test('should throw on invalid format', () => {
		const invalidFormats = ['bmp', 'gif', 'tiff'];
		for (const format of invalidFormats) {
			expect(() => AvatarFormat.create(format)).toThrow(Error);
		}
	});
});

describe('AvatarColor', () => {
	test('should create with valid color', () => {
		const validColors = [
			'#000',
			'#FFFFFF',
			'rgb(255, 0, 0)',
			'rgba(0, 0, 0, 0.5)',
			'hsl(120, 100%, 50%)',
			'red',
		];

		for (const color of validColors) {
			const result = AvatarColor.create(color);
			expect(result.value).toBe(color);
		}
	});
});
