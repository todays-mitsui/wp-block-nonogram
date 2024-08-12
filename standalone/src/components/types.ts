import { type ColorIndex, type Status } from '../../lib/PixelGrid';

export type Pixels = {
	id: string;
	x: number;
	y: number;
	state: Status;
	color: string;
}[];

export interface Point {
	x: number;
	y: number;
}

export interface Context {
	button: 'left' | 'right';
	drag: boolean;
	enableRightClick: boolean;
	currentState: Status;
}

export type Palette = {
	[index in ColorIndex]: string;
}
