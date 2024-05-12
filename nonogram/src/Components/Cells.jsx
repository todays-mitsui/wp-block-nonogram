import { Board } from '../../../src/Board';
import { Layer, Rect } from 'react-konva';

/**
 *
 * @param {{
 * 		board: Board;
 * 		cells: { id: string; x: number; y: number; filled: boolean; }[];
 * 		gridOffsetLeft: number;
 * 		gridOffsetTop: number;
 * 		cellSize: number;
 * 		setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 */
export function Cells({
	board,
	cells,
	gridOffsetLeft,
	gridOffsetTop,
	cellSize,
	setAttributes,
}) {
	const onClick = (event) => {
		console.log(event.target.attrs.id);
		const cell = cells.find((cell) => cell.id === event.target.attrs.id);
		if (cell) {
			cell.filled ? board.clear(cell.x, cell.y) : board.fill(cell.x, cell.y);
			setAttributes({ boardData: board.serialize() });
		}
	};

	return (
		<Layer>
			{cells.map(({ id, x, y, filled }) => (
				<Rect
					key={id}
					id={id}
					x={gridOffsetLeft + x * cellSize + 1}
					y={gridOffsetTop + y * cellSize + 1}
					width={cellSize - 2}
					height={cellSize - 2}
					fill={filled ? 'black' : 'yellow'}
					strokeEnabled={false}
					onClick={onClick}
				/>
			))}
		</Layer>
	);
}
