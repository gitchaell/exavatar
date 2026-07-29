export class AvatarBuilderConfig {
	readonly gender: 'male' | 'female';
	readonly skinTone: string;
	readonly hair: string;
	readonly hairColor: string;
	readonly brows: string;
	readonly eyes: string;
	readonly mouth: string;
	readonly clothing: string;
	readonly clothingColor: string;
	readonly accessory: string;
	readonly background: string;
	readonly expression: string;
	readonly age: 'child' | 'adult' | 'elder';

	private constructor(props: any) {
		this.gender = props.gender === 'female' ? 'female' : 'male';
		this.skinTone = props.skinTone || '#fcdcb6';
		this.hair = props.hair || 'short';
		this.hairColor = props.hairColor || '#1c1c1c';
		this.brows = props.brows || 'neutral';
		this.eyes = props.eyes || 'normal';
		this.mouth = props.mouth || 'neutral';
		this.clothing = props.clothing || 'shirt';
		this.clothingColor = props.clothingColor || '#1e5a73';
		this.accessory = props.accessory || 'none';
		this.background = props.background || '#1a8c9e';
		this.expression = props.expression || 'none';
		this.age = props.age || 'adult';
	}

	static create(props: any): AvatarBuilderConfig {
		return new AvatarBuilderConfig(props || {});
	}

	toQueryString(): string {
		const params = new URLSearchParams();
		if (this.gender !== 'male') params.set('gender', this.gender);
		if (this.skinTone !== '#fcdcb6') params.set('skinTone', this.skinTone);
		if (this.hair !== 'short') params.set('hair', this.hair);
		if (this.hairColor !== '#1c1c1c') params.set('hairColor', this.hairColor);
		if (this.brows !== 'neutral') params.set('brows', this.brows);
		if (this.eyes !== 'normal') params.set('eyes', this.eyes);
		if (this.mouth !== 'neutral') params.set('mouth', this.mouth);
		if (this.clothing !== 'shirt') params.set('clothing', this.clothing);
		if (this.clothingColor !== '#1e5a73')
			params.set('clothingColor', this.clothingColor);
		if (this.accessory !== 'none') params.set('accessory', this.accessory);
		if (this.background !== '#1a8c9e')
			params.set('background', this.background);
		if (this.expression !== 'none') params.set('expression', this.expression);
		if (this.age !== 'adult') params.set('age', this.age);
		return params.toString();
	}
}
