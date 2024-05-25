import { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { Board } from '../Model/Board';
import { CellsView } from './CellsView';
import { GridView } from './GridView';
import { ColumnCluesView } from './ColumnCluesView';
import { RowCluesView } from './RowCluesView';
import { useDisableContextMenu } from '../lib/useDisableContextMenu';

/**
 * @param {{
 *  width: number;
 *  height: number;
 *  board: Board;
 *  left: number;
 *  top: number;
 *  rowClues: number[][];
 *  columnClues: number[][];
 *  cluesFontSize: number;
 *  cluesWidth: number;
 *  cluesHeight: number;
 *  cellSize: number;
 *  setBoardData: (boardData: string) => void;
 *  enableSpaceStatus: boolean;
 *  enableCluesCompletion: boolean;
 *  showGrid: boolean;
 * }} param
 * @returns {JSX.Element}
 */
export function BoardView( {
	width,
	height,
	board,
	left,
	top,
	rowClues,
	columnClues,
	cluesFontSize,
	cluesWidth,
	cluesHeight,
	cellSize,
	setBoardData,
	enableSpaceStatus,
	enableCluesCompletion,
	showGrid,
} ) {
	// マウスドラッグによる状態変更のために変更すべきステータスを保持しておく
	const [ nextStatus, setNextStatus ] = useState( null );

	const cells = [ ...board.cells() ];
	const rowCluesCompletions =
		enableCluesCompletion && calcRowCluesCompletions( board, rowClues );
	const columnCluesCompletions =
		enableCluesCompletion &&
		calcColumnCluesCompletions( board, columnClues );

	return (
		<Stage
			width={ width }
			height={ height }
			onMouseUp={ () => setNextStatus( null ) }
			onTouchEnd={ () => setNextStatus( null ) }
			ref={ useDisableContextMenu() } // コンテキストメニューを無効にする
		>
			<Layer>
				<CellsView
					board={ board }
					cells={ cells }
					top={ top + cluesHeight }
					left={ left + cluesWidth }
					cellSize={ cellSize }
					nextStatus={ nextStatus }
					enableSpaceStatus={ showGrid && enableSpaceStatus }
					setNextStatus={ setNextStatus }
					setBoardData={ setBoardData }
				/>
				<GridView
					top={ top }
					left={ left }
					cluesWidth={ cluesWidth }
					cluesHeight={ cluesHeight }
					numRows={ board.numRows }
					numColumns={ board.numColumns }
					cellSize={ cellSize }
					showGrid={ showGrid }
				/>
				<ColumnCluesView
					clues={ columnClues }
					cluesCompletions={ columnCluesCompletions }
					fontSize={ cluesFontSize }
					top={ top }
					left={ left + cluesWidth }
					cellSize={ cellSize }
					cluesHeight={ cluesHeight }
				/>
				<RowCluesView
					clues={ rowClues }
					cluesCompletions={ rowCluesCompletions }
					fontSize={ cluesFontSize }
					top={ top + cluesHeight }
					left={ left }
					cellSize={ cellSize }
					cluesWidth={ cluesWidth }
				/>
			</Layer>
		</Stage>
	);
}

/**
 * @param {Board} board
 * @param {number[][]} clues
 * @returns {boolean[]}
 */
function calcRowCluesCompletions( board, clues ) {
	const playerAnswer = [ ...board.rowClues() ];
	return clues.map( ( clue, index ) => {
		return playerAnswer[ index ].join() === clue.join();
	} );
}

/**
 * @param {Board} board
 * @param {number[][]} clues
 * @returns {boolean[]}
 */
function calcColumnCluesCompletions( board, clues ) {
	const playerAnswer = [ ...board.columnClues() ];
	return clues.map( ( clue, index ) => {
		return playerAnswer[ index ].join() === clue.join();
	} );
}
