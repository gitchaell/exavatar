import { ExavatarError } from '../shared/ExavatarError.ts'
import { colord, extend, random, Plugin } from 'colord'
import namesPlugin from 'colord/plugins/names'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'

extend([namesPlugin, mixPlugin, harmoniesPlugin] as unknown as Plugin[])

export class AvatarColor {
	static default() {
		return new AvatarColor(random().toHex())
	}

	static create(input: unknown): AvatarColor {
		if (typeof input === 'string' && colord(input).isValid()) {
			return new AvatarColor(input)
		}

		return AvatarColor.default()
	}

	private constructor(public readonly value: string) {}

	background() {
		return this.value
	}

	foreground() {
		const c = colord(this.value)
		if (!c.isValid()) return '#000000'

		if (c.isLight()) {
			return c.shades(3)[1].toHex()
		}

		if (c.isDark()) {
			return c.tints(3)[1].toHex()
		}

		const tint = c.tints(3)[1]
		const shade = c.shades(3)[1]

		return c.brightness() > 0.5 ? shade.toHex() : tint.toHex()
	}
}

export class AvatarColorNotValidError extends ExavatarError {
	constructor(color: unknown) {
		super(`Avatar.color <<${color}>> is not valid. Expected a valid CSS color.`)
	}
}
