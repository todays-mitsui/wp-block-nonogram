import { type PixelGrid, type ColorIndex, type Status } from '../../lib/PixelGrid';
import { type Layout, calcLayout } from '../../lib/Layout';
import { type Pixels, type Point, type Context, type Palette } from './types';

interface BoardProps {
	containerWidth: number;
	containerHeight: number;
	model: PixelGrid;
	updateModel: (model: PixelGrid, { x, y }: Point, context: Context) => void;
	renderer: (model: PixelGrid, palette: Palette) => Pixels;
}

export function Board(props: BoardProps): JSX.Element {
	const layout = calcLayout({ width: props.containerWidth, height: props.containerHeight }, props.model);

	return <div className="board">Board</div>;
}
