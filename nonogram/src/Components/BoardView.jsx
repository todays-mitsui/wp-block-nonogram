import { useState } from '@wordpress/element';
import { Stage, Layer, Text } from 'react-konva';
import { Board } from '../../../src/Board';
import { CellsView } from './CellsView';
import { GridView } from './GridView';
import { ColumnCluesView } from './ColumnCluesView';
import { RowCluesView } from './RowCluesView';

/**
 * @param {{
 * 		width: number;
 * 		height: number;
 * 		board: Board;
 * 		offsetLeft: number;
 * 		offsetTop: number;
 * 		cluesWidth: number;
 * 		cluesHeight: number;
 * 		cellSize: number;
 * 		setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 * @returns {JSX.Element}
 */
export function BoardView({
	width,
	height,
	board,
	offsetLeft,
	offsetTop,
	cluesWidth,
	cluesHeight,
	cellSize,
	setAttributes,
}) {
	const [isDragging, setIsDragging] = useState(false);
	const [currentState, setCurrentState] = useState(null);

	// 各セルでマウスが押されたときに呼ばれる想定のハンドラ
	const onMouseDown = (currentState) => {
		setIsDragging(true);
		setCurrentState(currentState);
	};

	const onMouseUp = () => {
		setIsDragging(false);
		setCurrentState(null);
	};

	const cells = [...board.cells()];
	const rowClues = [...board.rowClues()];
	const columnClues = [...board.columnClues()];

	const fontSize = Math.min(cellSize / 2, 20);

	return (
		<Stage
			width={width}
			height={height}
			onMouseUp={onMouseUp}
		>
			<Layer>
				<GridView
					offsetLeft={offsetLeft}
					offsetTop={offsetTop}
					cluesWidth={cluesWidth}
					cluesHeight={cluesHeight}
					numRows={board.height}
					numColumns={board.width}
					cellSize={cellSize}
				/>
				<ColumnCluesView
					clues={columnClues}
					fontSize={fontSize}
					fill="black"
					x={offsetLeft + cluesWidth}
					y={offsetTop}
					cellSize={cellSize}
					cluesHeight={cluesHeight}
				/>
				<RowCluesView
					clues={rowClues}
					fontSize={fontSize}
					fill="black"
					x={offsetLeft}
					y={offsetTop + cluesHeight}
					cellSize={cellSize}
					cluesWidth={cluesWidth}
				/>
			</Layer>
			<Layer>
				<CellsView
					board={board}
					cells={cells}
					gridOffsetLeft={offsetLeft + cluesWidth}
					gridOffsetTop={offsetTop + cluesHeight}
					cellSize={cellSize}
					isDragging={isDragging}
					currentState={currentState}
					onMouseDown={onMouseDown}
					setAttributes={setAttributes}
				/>
			</Layer>
			<Layer>
				<Text text={`numRows: ${board.height}, numColumns: ${board.width}`} />
			</Layer>
		</Stage>
	);
}
