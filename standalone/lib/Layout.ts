import {
	MIN_PADDING,
	MAX_FONT_SIZE,
	FONT_SIZE_RATIO,
	HORIZONTAL_PADDING_RATIO,
	VERTICAL_PADDING_RATIO,
} from './config';
import { type PixelGrid, rowClues, columnClues } from './PixelGrid';

export interface CanvasSize {
	readonly width: number;
	readonly height: number;
}

export interface Layout {
	readonly offsetLeft: number;
	readonly offsetTop: number;
	readonly cluesFontSize: number;
	readonly cluesWidth: number;
	readonly cluesHeight: number;
	readonly cellSize: number;
}

interface ClueLength {
	readonly rowClueLength: number;
	readonly columnClueLength: number;
}

export function calcLayout( canvas: CanvasSize, pixelGrid: PixelGrid ): Layout {
	const { width, height } = canvas;
	const { width: numColumns, height: numRows } = pixelGrid;
	const clueLength = {
		rowClueLength: maxRowClueLength( pixelGrid ),
		columnClueLength: maxColumnClueLength( pixelGrid ),
	};

	let layout = basedOnAspectRatio( canvas, pixelGrid, clueLength );
	if ( layout.cluesFontSize > MAX_FONT_SIZE ) {
		layout = maxFontSizeCase( canvas, pixelGrid, clueLength );
	}
	const { cluesFontSize, cluesWidth, cluesHeight, cellSize } = layout;

	const boardWidth = cluesWidth + numColumns * cellSize;
	const offsetLeft = ( width - boardWidth ) / 2;

	const boardHeight = cluesHeight + numRows * cellSize;
	const offsetTop = ( height - boardHeight ) / 2;

	return {
		offsetLeft,
		offsetTop,
		cluesFontSize,
		cluesWidth,
		cluesHeight,
		cellSize,
	};
}

// ========================================================================== //

function maxRowClueLength( pixelGrid: PixelGrid ): number {
	return Math.max(
		1,
		...rowClues( pixelGrid ).map( ( clue ) => clue.length )
	);
}

function maxColumnClueLength( pixelGrid: PixelGrid ): number {
	return Math.max(
		1,
		...columnClues( pixelGrid ).map( ( clue ) => clue.length )
	);
}

// ========================================================================== //

/**
 * ROW_CLUE_CELL_ASPECT_RATIO, COLUMN_CLUE_CELL_ASPECT_RATIO を用いて cellSize を計算する
 * このロジックだと fontSize = cellSize * FONT_SIZE_RATIO が MAX_FONT_SIZE を超えることがある
 * MAX_FONT_SIZE を超えるとは、fontSize が大きすぎるということであり cluesWidth, cluesHeight が大きすぎるということ
 * cluesWidth, cluesHeight をもっと小さくできる余地がある
 */
function basedOnAspectRatio(
	canvas: CanvasSize,
	pixelGrid: PixelGrid,
	clueLength: ClueLength
): Pick< Layout, 'cluesFontSize' | 'cluesWidth' | 'cluesHeight' | 'cellSize' > {
	const { width, height } = canvas;
	const { width: rowLength, height: columnLength } = pixelGrid;
	const { rowClueLength, columnClueLength } = clueLength;

	const rowClueCellAspectRatio =
		( 1 + 2 * HORIZONTAL_PADDING_RATIO ) * FONT_SIZE_RATIO;
	const columnClueCellAspectRatio =
		( 1 + 2 * VERTICAL_PADDING_RATIO ) * FONT_SIZE_RATIO;

	const boardWidth = width - 2 * MIN_PADDING;
	const boardHeight = height - 2 * MIN_PADDING;
	const cellSize = Math.min(
		boardWidth / ( rowClueLength * rowClueCellAspectRatio + rowLength ),
		boardHeight /
			( columnLength * columnClueCellAspectRatio + columnClueLength )
	);

	const fontSize = cellSize * FONT_SIZE_RATIO;

	return {
		cluesFontSize: fontSize,
		cluesWidth: rowClueCellAspectRatio * cellSize * rowClueLength,
		cluesHeight: columnClueCellAspectRatio * cellSize * columnLength,
		cellSize,
	};
}

/**
 * fontSize === MAX_FONT_SIZE という前提で計算する
 * FONT_SIZE_RATIO, HORIZONTAL_PADDING_RATIO, VERTICAL_PADDING_RATIO から cellSize を逆算する
 */
function maxFontSizeCase(
	canvas: CanvasSize,
	pixelGrid: PixelGrid,
	clueLength: ClueLength
): Pick< Layout, 'cluesFontSize' | 'cluesWidth' | 'cluesHeight' | 'cellSize' > {
	const { width, height } = canvas;
	const { width: rowLength, height: columnLength } = pixelGrid;
	const { rowClueLength, columnClueLength } = clueLength;

	const maxClueCellWidth =
		( 1 + 2 * HORIZONTAL_PADDING_RATIO ) * MAX_FONT_SIZE;
	const maxClueCellHeight =
		( 1 + 2 * VERTICAL_PADDING_RATIO ) * MAX_FONT_SIZE;

	const gridWidth =
		width - maxClueCellWidth * rowClueLength - 2 * MIN_PADDING;
	const gridHeight =
		height - maxClueCellHeight * columnClueLength - 2 * MIN_PADDING;
	const cellSize = Math.min(
		gridWidth / rowLength,
		gridHeight / columnLength
	);

	return {
		cluesFontSize: MAX_FONT_SIZE,
		cluesWidth: maxClueCellWidth * rowClueLength,
		cluesHeight: maxClueCellHeight * columnClueLength,
		cellSize,
	};
}
