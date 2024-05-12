import { Layer, Line, Rect } from 'react-konva';

const STROKE_COLOR_DARK = '#666';
const STROKE_COLOR_LIGHT = '#aaa';

/**
 *
 * @param {{
 * 		offsetLeft: number;
 * 		offsetTop: number;
 * 		cluesWidth: number;
 * 		cluesHeight: number;
 * 		numRows: number;
 * 		numColumns: number;
 * 		cellSize: number;
 * }} param
 * @returns
 */
export function Grid({
	offsetLeft,
	offsetTop,
	cluesWidth,
	cluesHeight,
	numRows,
	numColumns,
	cellSize,
}) {
	const gridWidth = numColumns * cellSize;
	const gridHeight = numRows * cellSize;

	const verticalLines = Array.from(Array(numColumns + 1), (_, i) => ({
		x: offsetLeft + cluesWidth + i * cellSize,
		yStart: offsetTop,
		yEnd: offsetTop + cluesHeight + gridHeight,
	}));
	const horizontalLines = Array.from(Array(numRows + 1), (_, i) => ({
		xStart: offsetLeft,
		xEnd: offsetLeft + cluesWidth + gridWidth,
		y: offsetTop + cluesHeight + i * cellSize,
	}));

	console.info({ verticalLines, horizontalLines });

	return (
		<Layer>
			<Rect
				x={offsetLeft + cluesWidth}
				y={offsetTop}
				width={gridWidth}
				height={cluesHeight}
				fill="#eee"
			/>
			<Rect
				x={offsetLeft}
				y={offsetTop + cluesHeight}
				width={cluesWidth}
				height={gridHeight}
				fill="#eee"
			/>
			{ verticalLines.map(({ x, yStart, yEnd }, i) => (
				<Line
					key={i}
					id={`vertical-${i}`}
					points={[x, yStart, x, yEnd]}
					stroke={i % 5 === 0 || i === numColumns ? STROKE_COLOR_DARK : STROKE_COLOR_LIGHT}
					strokeWidth={1}
				/>
			)) }
			{ horizontalLines.map(({ xStart, xEnd, y }, i) => (
				<Line
					key={i}
					id={`horizontal-${i}`}
					points={[xStart, y, xEnd, y]}
					stroke={i % 5 === 0 || i === numRows ? STROKE_COLOR_DARK : STROKE_COLOR_LIGHT}
					strokeWidth={1}
				/>
			)) }
		</Layer>
	)
}
