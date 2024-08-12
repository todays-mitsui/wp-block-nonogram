import { useCallback } from 'react';
import Konva from 'konva';
import { type PixelGrid, type Status } from '../../lib/PixelGrid';
import { type Pixels, type Point, type Context, type Palette } from './types';

interface GridProps {
	model: PixelGrid;
	updateModel: (model: PixelGrid, { x, y }: Point, context: Context) => void;
	renderer: (model: PixelGrid, palette: Palette) => Pixels;
	currentState: Status;
	palette: Palette;
}

export function Grid(props: GridProps): JSX.Element {
	const pixels = props.renderer(props.model, props.palette);

	const onMouseDown = useCallback(
		( event: Konva.KonvaEventObject< MouseEvent | TouchEvent >, ) => {
			const pixel = pixels.find( ( pixel ) => pixel.id === event.target.attrs.id );

			if (pixel == null) { return; }

			const enableRightClick = event.evt instanceof MouseEvent;
			const buttons = event.evt instanceof MouseEvent ? event.evt.buttons : null;
			const { altKey, ctrlKey, shiftKey } = event.evt;
			const isRightClick = buttons === 2 || altKey || ctrlKey || shiftKey;

			const context: Context = {
				button: isRightClick ? 'right' : 'left',
				drag: false,
				enableRightClick,
				currentState: props.currentState,
			};

			props.updateModel( props.model, { x: pixel.x, y: pixel.y }, context );
		},
		[props.model, props.updateModel, props.currentState]
	);

	const onMouseOver = useCallback(
		( event: Konva.KonvaEventObject< MouseEvent >, ) => {
			if ( event.evt.buttons === 0 ) {
				return;
			}

			const pixel = pixels.find( ( pixel ) => pixel.id === event.target.attrs.id );

			if (pixel == null) { return; }

			const buttons = event.evt.buttons;
			const { altKey, ctrlKey, shiftKey } = event.evt;
			const isRightClick = buttons === 2 || altKey || ctrlKey || shiftKey;

			const context: Context = {
				button: isRightClick ? 'right' : 'left',
				drag: true,
				enableRightClick: true,
				currentState: props.currentState,
			};

			props.updateModel( props.model, { x: pixel.x, y: pixel.y }, context );
		},
		[props.model, props.updateModel, props.currentState]
	);

	return <div className="grid">Grid</div>;
}
