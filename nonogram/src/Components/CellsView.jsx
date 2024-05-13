import { Board } from '../../../src/Board';
import { Layer, Rect } from 'react-konva';

const COLOR_FILLED = '#333';
const COLOR_EMPTY = 'transparent';

/**
 *
 * @param {{
 * 		board: Board;
 * 		cells: { id: string; x: number; y: number; filled: boolean; }[];
 * 		gridOffsetLeft: number;
 * 		gridOffsetTop: number;
 * 		cellSize: number;
 * 		isDragging: boolean;
 * 		currentState: 'fill' | 'clear' | null;
 * 		onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 * 		setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 */
export function CellsView({
	board,
	cells,
	gridOffsetLeft,
	gridOffsetTop,
	cellSize,
	isDragging,
	currentState,
	onMouseDown: onParentMouseDown,
	setAttributes,
}) {
	const onMouseDown = (event) => {
		const cell = cells.find((cell) => cell.id === event.target.attrs.id);
		if (cell) {
			cell.filled ? board.clear(cell.x, cell.y) : board.fill(cell.x, cell.y);
			onParentMouseDown(cell.filled ? 'clear' : 'fill');
			setAttributes({ boardData: board.serialize() });
		}
	};

	const onMouseOver = (event) => {
		if (!isDragging || currentState == null) { return; }

		const cell = cells.find((cell) => cell.id === event.target.attrs.id);
		if (cell) {
			currentState === 'fill' ? board.fill(cell.x, cell.y) : board.clear(cell.x, cell.y);
			setAttributes({ boardData: board.serialize() });
		}
	};

	return (
		<Layer>
			{cells.map(({ id, x, y, filled }) => (
				<Rect
					key={id}
					id={id}
					x={gridOffsetLeft + x * cellSize + 0.5}
					y={gridOffsetTop + y * cellSize + 0.5}
					width={cellSize - 1.5}
					height={cellSize - 1.5}
					fill={filled ? COLOR_FILLED : COLOR_EMPTY}
					strokeEnabled={false}
					onMouseDown={onMouseDown}
					onMouseOver={onMouseOver}
				/>
			))}
		</Layer>
	);
}
