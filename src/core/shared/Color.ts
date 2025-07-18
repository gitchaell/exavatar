import { colord, extend, random, Plugin } from 'colord'
import namesPlugin from 'colord/plugins/names'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'

extend([namesPlugin, mixPlugin, harmoniesPlugin] as unknown as Plugin[])

export class Color {
	public static isValid(color: string): boolean {
		return colord(color).isValid()
	}

	public static random(): string {
		return random().toHex()
	}

	public static harmonize(color: string): string {
		const c = colord(color)
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
