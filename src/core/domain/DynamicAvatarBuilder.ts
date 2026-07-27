import { ExavatarError } from '../shared/ExavatarError.ts';

export interface DynamicAvatarConfig {
	size: number;
	gender: 'male' | 'female';
	skinTone: string;
	hair: string;
	hairColor: string;
	brows: string;
	eyes: string;
	mouth: string;
	clothing: string;
	clothingColor: string;
	accessory: string;
	background: string;
	expression?: string;
}

export class DynamicAvatarBuilder {
	static build(config: DynamicAvatarConfig): Uint8Array {
		const builder = new DynamicAvatarBuilder();
		return builder.process(config);
	}

	process(config: DynamicAvatarConfig): Uint8Array {
		try {
			const resolvedConfig = this.resolveExpression(config);
			const svg = this.generateSVG(resolvedConfig);
			return new TextEncoder().encode(svg);
		} catch (error) {
			throw new DynamicAvatarBuilderError(
				error instanceof Error ? error.message : undefined,
			);
		}
	}

	private resolveExpression(config: DynamicAvatarConfig): DynamicAvatarConfig {
		const resolved = { ...config };
		if (config.expression && config.expression !== 'none') {
			const exp = config.expression;
			if (exp === 'Neutral') {
				resolved.brows = 'neutral';
				resolved.eyes = 'normal';
				resolved.mouth = 'neutral';
			}
			if (exp === 'Feliz') {
				resolved.brows = 'neutral';
				resolved.eyes = 'normal';
				resolved.mouth = 'big_smile';
			}
			if (exp === 'Sorprendido') {
				resolved.brows = 'raised';
				resolved.eyes = 'wide';
				resolved.mouth = 'open';
			}
			if (exp === 'Concentrado') {
				resolved.brows = 'angry';
				resolved.eyes = 'squint';
				resolved.mouth = 'neutral';
			}
			if (exp === 'Triste') {
				resolved.brows = 'sad';
				resolved.eyes = 'normal';
				resolved.mouth = 'sad';
			}
			if (exp === 'Enojado') {
				resolved.brows = 'angry';
				resolved.eyes = 'squint';
				resolved.mouth = 'sad';
			}
			if (exp === 'Asustado') {
				resolved.brows = 'raised';
				resolved.eyes = 'wide';
				resolved.mouth = 'gasp';
			}
			if (exp === 'Confundido') {
				resolved.brows = 'sad';
				resolved.eyes = 'squint';
				resolved.mouth = 'neutral';
			}
			if (exp === 'Cansado') {
				resolved.brows = 'sad';
				resolved.eyes = 'tired';
				resolved.mouth = 'sad';
			}
			if (exp === 'Avergonzado') {
				resolved.brows = 'sad';
				resolved.eyes = 'look_away';
				resolved.mouth = 'smirk';
			}
			if (exp === 'Emocionado') {
				resolved.brows = 'raised';
				resolved.eyes = 'wide';
				resolved.mouth = 'big_smile';
			}
			if (exp === 'Arrogante') {
				resolved.brows = 'angry';
				resolved.eyes = 'squint';
				resolved.mouth = 'smirk';
			}
			if (exp === 'Aburrido') {
				resolved.brows = 'flat';
				resolved.eyes = 'tired';
				resolved.mouth = 'neutral';
			}
			if (exp === 'Sarcástico') {
				resolved.brows = 'raised';
				resolved.eyes = 'squint';
				resolved.mouth = 'smirk';
			}
			if (exp === 'Aliviado') {
				resolved.brows = 'neutral';
				resolved.eyes = 'closed';
				resolved.mouth = 'smile';
			}
			if (exp === 'Sonrisa pícara') {
				resolved.brows = 'raised';
				resolved.eyes = 'look_away';
				resolved.mouth = 'smirk';
			}
		}
		return resolved;
	}

	private sanitizeColor(c: string, defaultColor: string): string {
		if (!c) return defaultColor;
		if (/^#([0-9A-F]{3}){1,2}$/i.test(c)) return c;
		if (/^[a-zA-Z]+$/.test(c)) return c;
		return defaultColor;
	}

	private generateSVG(c: DynamicAvatarConfig): string {
		const size = c.size;
		const gender = c.gender;
		const skinTone = this.sanitizeColor(c.skinTone, '#fcdcb6');
		const hair = c.hair;
		const hairColor = this.sanitizeColor(c.hairColor, '#1c1c1c');
		const clothing = c.clothing;
		const clothingColor = this.sanitizeColor(c.clothingColor, '#1e5a73');
		const accessory = c.accessory;
		const eyes = c.eyes;
		const brows = c.brows;
		const mouth = c.mouth;
		const background = this.sanitizeColor(c.background, '#1a8c9e');

		const isFemale = gender === 'female';
		const neck = `<path d="M 210 380 L 210 460 L 302 460 L 302 380 Z" fill="${skinTone}" stroke="#000" stroke-width="6" />`;
		const face = isFemale
			? `
            <path d="M 140 260 C 110 260, 110 320, 140 330" fill="${skinTone}" stroke="#000" stroke-width="6" stroke-linecap="round" />
            <path d="M 372 260 C 402 260, 402 320, 372 330" fill="${skinTone}" stroke="#000" stroke-width="6" stroke-linecap="round" />
            <path d="M 140 240 C 140 120, 372 120, 372 240 C 372 370, 280 410, 256 410 C 232 410, 140 370, 140 240 Z" fill="${skinTone}" stroke="#000" stroke-width="6" />
            <path d="M 256 300 C 240 300, 240 320, 256 315" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
            <path d="M 170 240 Q 150 230 140 240" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
            <path d="M 342 240 Q 362 230 372 240" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
        `
			: `
            <path d="M 140 260 C 110 260, 110 320, 140 330" fill="${skinTone}" stroke="#000" stroke-width="6" stroke-linecap="round" />
            <path d="M 372 260 C 402 260, 402 320, 372 330" fill="${skinTone}" stroke="#000" stroke-width="6" stroke-linecap="round" />
            <path d="M 140 240 C 140 120, 372 120, 372 240 C 372 360, 300 400, 256 400 C 212 400, 140 360, 140 240 Z" fill="${skinTone}" stroke="#000" stroke-width="6" />
            <path d="M 256 300 C 240 300, 240 320, 256 315" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
        `;

		const eyesSvg =
			{
				normal: `<circle cx="200" cy="260" r="15" fill="#000" /><circle cx="312" cy="260" r="15" fill="#000" />`,
				wide: `<circle cx="200" cy="260" r="25" fill="#fff" stroke="#000" stroke-width="6" /><circle cx="200" cy="260" r="10" fill="#000" />
                   <circle cx="312" cy="260" r="25" fill="#fff" stroke="#000" stroke-width="6" /><circle cx="312" cy="260" r="10" fill="#000" />`,
				closed: `<path d="M 180 260 Q 200 280 220 260" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />
                     <path d="M 292 260 Q 312 280 332 260" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`,
				squint: `<path d="M 180 260 L 220 250 L 180 270 Z" fill="#000" />
                     <path d="M 332 260 L 292 250 L 332 270 Z" fill="#000" />`,
				tired: `<path d="M 180 250 Q 200 240 220 250 Q 200 270 180 250 Z" fill="#000" />
                    <path d="M 292 250 Q 312 240 332 250 Q 312 270 292 250 Z" fill="#000" />
                    <path d="M 180 275 Q 200 290 220 275" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-opacity="0.5"/>
                    <path d="M 292 275 Q 312 290 332 275" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-opacity="0.5"/>`,
				look_away: `<circle cx="200" cy="260" r="20" fill="#fff" stroke="#000" stroke-width="6" /><circle cx="190" cy="260" r="8" fill="#000" />
                        <circle cx="312" cy="260" r="20" fill="#fff" stroke="#000" stroke-width="6" /><circle cx="302" cy="260" r="8" fill="#000" />`,
			}[eyes] ||
			`<circle cx="200" cy="260" r="15" fill="#000" /><circle cx="312" cy="260" r="15" fill="#000" />`;

		const browsSvg =
			{
				neutral: `<path d="M 170 220 Q 200 210 230 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />
                      <path d="M 342 220 Q 312 210 282 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />`,
				raised: `<path d="M 170 210 Q 200 190 230 210" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />
                     <path d="M 342 210 Q 312 190 282 210" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />`,
				angry: `<path d="M 170 210 L 230 230" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round" />
                    <path d="M 342 210 L 282 230" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round" />`,
				sad: `<path d="M 170 230 L 230 210" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />
                  <path d="M 342 230 L 282 210" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />`,
				flat: `<path d="M 170 220 L 230 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />
                   <path d="M 342 220 L 282 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />`,
			}[brows] ||
			`<path d="M 170 220 Q 200 210 230 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" /><path d="M 342 220 Q 312 210 282 220" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" />`;

		const mouthSvg =
			{
				neutral: `<path d="M 230 350 L 282 350" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`,
				smile: `<path d="M 220 340 Q 256 370 292 340" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`,
				big_smile: `<path d="M 220 340 Q 256 390 292 340 Z" fill="#fff" stroke="#000" stroke-width="6" stroke-linejoin="round" />`,
				sad: `<path d="M 220 360 Q 256 330 292 360" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`,
				open: `<circle cx="256" cy="350" r="15" fill="#000" />`,
				smirk: `<path d="M 230 350 L 292 340" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`,
				teeth: `<path d="M 220 340 L 292 340 L 292 360 L 220 360 Z" fill="#fff" stroke="#000" stroke-width="6" stroke-linejoin="round" />
                    <path d="M 240 340 L 240 360 M 256 340 L 256 360 M 272 340 L 272 360" fill="none" stroke="#000" stroke-width="4" />`,
				gasp: `<ellipse cx="256" cy="350" rx="10" ry="20" fill="#000" />`,
			}[mouth] ||
			`<path d="M 230 350 L 282 350" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" />`;

		const hairBack =
			{
				short: ``,
				long: `<path d="M 120 200 L 120 400 L 180 400 L 180 200 Z M 392 200 L 392 400 L 332 400 L 332 200 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
				spiky: ``,
				bald: ``,
				curly: `<circle cx="130" cy="200" r="40" fill="${hairColor}" stroke="#000" stroke-width="6" />
                    <circle cx="140" cy="280" r="45" fill="${hairColor}" stroke="#000" stroke-width="6" />
                    <circle cx="382" cy="200" r="40" fill="${hairColor}" stroke="#000" stroke-width="6" />
                    <circle cx="372" cy="280" r="45" fill="${hairColor}" stroke="#000" stroke-width="6" />`,
				bob: `<path d="M 120 180 L 120 320 C 120 350 160 350 160 320 L 160 180 Z M 392 180 L 392 320 C 392 350 352 350 352 320 L 352 180 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
			}[hair] || ``;

		const hairFront =
			{
				short: `<path d="M 140 240 C 130 180 180 100 256 100 C 332 100 382 180 372 240 C 350 150 256 120 140 240 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
				long: `<path d="M 140 240 C 130 180 180 100 256 100 C 332 100 382 180 372 240 C 350 150 256 120 140 240 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
				spiky: `<path d="M 140 240 L 120 150 L 170 160 L 160 90 L 220 120 L 250 60 L 290 120 L 350 90 L 340 160 L 392 150 L 372 240 C 350 170 256 150 140 240 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
				bald: ``,
				curly: `<circle cx="200" cy="120" r="40" fill="${hairColor}" stroke="#000" stroke-width="6" />
                    <circle cx="256" cy="100" r="45" fill="${hairColor}" stroke="#000" stroke-width="6" />
                    <circle cx="312" cy="120" r="40" fill="${hairColor}" stroke="#000" stroke-width="6" />`,
				bob: `<path d="M 140 240 C 130 180 180 100 256 100 C 332 100 382 180 372 240 C 350 150 256 120 140 240 Z" fill="${hairColor}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>`,
			}[hair] || ``;

		const cloth =
			{
				shirt: `<path d="M 180 512 L 210 440 L 302 440 L 332 512 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />`,
				hoodie: `<path d="M 160 512 L 210 440 L 302 440 L 352 512 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />
                     <path d="M 210 440 Q 256 480 302 440" fill="none" stroke="#000" stroke-width="6" />`,
				suit: `<path d="M 180 512 L 210 440 L 302 440 L 332 512 Z" fill="#fff" stroke="#000" stroke-width="6" />
                   <path d="M 160 512 L 210 440 L 256 480 L 302 440 L 352 512 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />
                   <path d="M 256 460 L 256 512" fill="none" stroke="#000" stroke-width="4" />
                   <path d="M 246 470 L 266 470 M 246 490 L 266 490" fill="none" stroke="#000" stroke-width="4" />`,
				dress: `<path d="M 190 512 L 230 440 L 282 440 L 322 512 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />`,
			}[clothing] ||
			`<path d="M 180 512 L 210 440 L 302 440 L 332 512 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />`;

		const acc =
			{
				none: ``,
				glasses: `<rect x="150" y="240" width="80" height="50" rx="10" fill="rgba(255,255,255,0.3)" stroke="#000" stroke-width="6" />
                      <rect x="282" y="240" width="80" height="50" rx="10" fill="rgba(255,255,255,0.3)" stroke="#000" stroke-width="6" />
                      <path d="M 230 265 L 282 265" fill="none" stroke="#000" stroke-width="6" />`,
				sunglasses: `<rect x="150" y="240" width="80" height="50" rx="10" fill="#222" stroke="#000" stroke-width="6" />
                         <rect x="282" y="240" width="80" height="50" rx="10" fill="#222" stroke="#000" stroke-width="6" />
                         <path d="M 230 265 L 282 265" fill="none" stroke="#000" stroke-width="6" />`,
				headphones: `<path d="M 130 280 L 130 240 C 130 150 382 150 382 240 L 382 280" fill="none" stroke="#222" stroke-width="20" stroke-linecap="round" />
                         <rect x="110" y="230" width="30" height="80" rx="15" fill="#555" stroke="#000" stroke-width="6" />
                         <rect x="372" y="230" width="30" height="80" rx="15" fill="#555" stroke="#000" stroke-width="6" />`,
				cap: `<path d="M 130 200 C 130 100 382 100 382 200 Z" fill="${clothingColor}" stroke="#000" stroke-width="6" />
                  <path d="M 110 200 L 402 200" fill="none" stroke="#000" stroke-width="12" stroke-linecap="round" />`,
			}[accessory] || ``;

		return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="Generated avatar">
    <rect width="100%" height="100%" fill="${background}" />
    ${hairBack}
    ${neck}
    ${cloth}
    ${face}
    ${eyesSvg}
    ${browsSvg}
    ${mouthSvg}
    ${hairFront}
    ${acc}
</svg>`.trim();
	}
}

export class DynamicAvatarBuilderError extends ExavatarError {
	constructor(cause?: string) {
		super(`Dynamic avatar builder failed. ${cause}`);
		this.cause = cause;
	}
}
