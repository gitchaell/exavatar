import type { Avatar } from './Avatar.ts';
import type { AvatarFormatType } from './AvatarFormat.ts';
import { AvatarBuilder } from './AvatarBuilder.ts';
import { DynamicAvatarBuilder } from './DynamicAvatarBuilder.ts';
import { ExavatarError } from '../shared/ExavatarError.ts';

export interface AvatarResult {
	data: Uint8Array;
	type: AvatarFormatType | 'svg+xml';
}

export interface AvatarRepository {
	load(avatar: Avatar): Promise<AvatarResult>;
	build(avatar: Avatar): Promise<AvatarResult>;
}

export abstract class AvatarBaseRepository implements AvatarRepository {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	load(_avatar: Avatar): Promise<AvatarResult> {
		throw new Error('Method not implemented');
	}

	build(avatar: Avatar): Promise<AvatarResult> {
		if (avatar.set.value === 'builder') {
			return Promise.resolve({
				data: DynamicAvatarBuilder.build({
					...avatar.builderConfig,
					size: +avatar.size.value,
				} as any),
				type: 'svg+xml',
			});
		}

		return Promise.resolve({
			data: AvatarBuilder.build(avatar),
			type: 'svg+xml',
		});
	}
}

export class AvatarNotFoundError extends ExavatarError {
	constructor(cause?: string) {
		super(`Avatar not found. ${cause}`);
		this.cause = cause;
	}
}
