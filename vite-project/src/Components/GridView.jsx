import { useCallback } from 'react';
import { Line, Rect } from 'react-konva';

const STROKE_COLOR_DARK = '#666';
const STROKE_COLOR_LIGHT = '#aaa';

/**
 * @param {{
 *  top: number;
 *  left: number;
 *  cluesWidth: number;
 *  cluesHeight: number;
 *  numRows: number;
 *  numColumns: number;
 *  cellSize: number;
 *  showGrid: boolean;
 * }} param
 * @returns {JSX.Element}
 */
export function GridView( {
	top,
	left,
	cluesWidth,
	cluesHeight,
	numRows,
	numColumns,
	cellSize,
	showGrid,
} ) {
	const gridWidth = numColumns * cellSize;
	const gridHeight = numRows * cellSize;

	const verticalLines = Array.from( Array( numColumns + 1 ), ( _, i ) => ( {
		x: left + cluesWidth + i * cellSize,
		yStart: top,
		yEnd: top + cluesHeight + gridHeight,
	} ) );
	const horizontalLines = Array.from( Array( numRows + 1 ), ( _, i ) => ( {
		xStart: left,
		xEnd: left + cluesWidth + gridWidth,
		y: top + cluesHeight + i * cellSize,
	} ) );

	const showLine = useCallback(
		( index, lastIndex ) => {
			return index === 0 || index === lastIndex || showGrid;
		},
		[ showGrid ]
	);

	return (
		<>
			{ /* columnClues の背景 */ }
			<Rect
				x={ left + cluesWidth }
				y={ top }
				width={ gridWidth }
				height={ cluesHeight }
				fill="#eee"
				strokeEnabled={ false }
			/>

			{ /* rowClues の背景 */ }
			<Rect
				x={ left }
				y={ top + cluesHeight }
				width={ cluesWidth }
				height={ gridHeight }
				fill="#eee"
				strokeEnabled={ false }
			/>

			{ verticalLines.map(
				( { x, yStart, yEnd }, i ) =>
					showLine( i, numColumns ) && (
						<Line
							key={ i }
							id={ `vertical-${ i }` }
							points={ [ x, yStart, x, yEnd ] }
							stroke={
								i % 5 === 0 || i === numColumns
									? STROKE_COLOR_DARK
									: STROKE_COLOR_LIGHT
							}
							strokeWidth={ 1 }
						/>
					)
			) }
			{ horizontalLines.map(
				( { xStart, xEnd, y }, i ) =>
					showLine( i, numRows ) && (
						<Line
							key={ i }
							id={ `horizontal-${ i }` }
							points={ [ xStart, y, xEnd, y ] }
							stroke={
								i % 5 === 0 || i === numRows
									? STROKE_COLOR_DARK
									: STROKE_COLOR_LIGHT
							}
							strokeWidth={ 1 }
						/>
					)
			) }
		</>
	);
}
