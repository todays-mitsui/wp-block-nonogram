import { Layer, Line, Rect } from 'react-konva';

const STROKE_COLOR_DARK = '#666';
const STROKE_COLOR_LIGHT = '#aaa';

/**
 *
 * @param {{
 * 		top: number;
 * 		left: number;
 * 		cluesWidth: number;
 * 		cluesHeight: number;
 * 		numRows: number;
 * 		numColumns: number;
 * 		cellSize: number;
 * }} param
 * @returns {JSX.Element}
 */
export function GridView({
	top,
	left,
	cluesWidth,
	cluesHeight,
	numRows,
	numColumns,
	cellSize,
}) {
	const gridWidth = numColumns * cellSize;
	const gridHeight = numRows * cellSize;

	const verticalLines = Array.from(Array(numColumns + 1), (_, i) => ({
		x: left + cluesWidth + i * cellSize,
		yStart: top,
		yEnd: top + cluesHeight + gridHeight,
	}));
	const horizontalLines = Array.from(Array(numRows + 1), (_, i) => ({
		xStart: left,
		xEnd: left + cluesWidth + gridWidth,
		y: top + cluesHeight + i * cellSize,
	}));

	return (
		<>
			<Rect
				x={left + cluesWidth}
				y={top}
				width={gridWidth}
				height={cluesHeight}
				fill="#eee"
				strokeEnabled={false}
			/>
			<Rect
				x={left}
				y={top + cluesHeight}
				width={cluesWidth}
				height={gridHeight}
				fill="#eee"
				strokeEnabled={false}
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
		</>
	)
}
