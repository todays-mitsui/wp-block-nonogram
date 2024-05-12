import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import React from 'react';
import { BoardSize } from './Controls/BoardSize';
import { createRender } from '../../src/render';
import { Board } from '../../src/Board';
import { Stage, Layer, Star, Text } from 'react-konva';
import { Cells } from './Components/Cells';
import { Grid } from './Components/Grid';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	/** @type {{ boardData: string }} */
	const { boardData } = attributes;

	const board = boardData == null
		? new Board(15, 15)
		: Board.deserialize(boardData);
	const cells = [...board.cells()];

	useEffect(() => {
		console.info({
			data: boardData,
			numRows: board.height,
			numColumns: board.width,
			cells: cells,
		});
	}, [boardData]);

	const [wrapperRef, width] = useBlockSize();
	const height = width && width * ASPECT_RATIO;

	const [cluesWidth, cluesHeight] = [100, 100];
	const { offsetLeft, offsetTop, cellSize } = calcLayout(width, height, cluesWidth, cluesHeight, board.height, board.width);

	return (
		<div {...useBlockProps()}>
			<div ref={wrapperRef}>
				<InspectorControls key="settings">
					<BoardSize
						board={board}
						numRows={board.height}
						numColumns={board.width}
						setAttributes={setAttributes}
					/>
				</InspectorControls>

				<Stage width={width} height={height}>
					<Grid
						offsetLeft={offsetLeft}
						offsetTop={offsetTop}
						cluesWidth={cluesWidth}
						cluesHeight={cluesHeight}
						numRows={board.height}
						numColumns={board.width}
						cellSize={cellSize}
					/>
					<Cells
						board={board}
						cells={cells}
						gridOffsetLeft={offsetLeft + cluesWidth}
						gridOffsetTop={offsetTop + cluesHeight}
						cellSize={cellSize}
						setAttributes={setAttributes}
					/>
					<Layer>
						<Text text={`numRows: ${board.height}, numColumns: ${board.width}`} />
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

const ASPECT_RATIO = 2 / 3;

/**
 * @returns {[React.MutableRefObject<HTMLDivElement | null>, number | null]}
 */
function useBlockSize() {
	const wrapperRef = useRef(null);
	const [width, setWidth] = useState(null);

	useEffect(() => {
		if (wrapperRef.current == null) { return; }

		const observer = new ResizeObserver((entries) => {
			const newWidth = entries[0]?.contentRect?.width;

			if (newWidth == null) { return; }

			setWidth(newWidth);
		});

		observer.observe(wrapperRef.current);

		return () => observer.unobserve(wrapperRef.current);
	}, [wrapperRef.current]);

	return [wrapperRef, width];
}

const MIN_PADDING = 8;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} cluesWidth
 * @param {number} cluesHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ offsetLeft: number; offsetTop: number; cellSize: number; }}
 */
function calcLayout(canvasWidth, canvasHeight, cluesWidth, cluesHeight, numRows, numColumns) {
	const cellSize = calcCellSize(canvasWidth, canvasHeight, cluesWidth, cluesHeight, numRows, numColumns);

	const gridWidth = cellSize * numColumns + 1;
	const boardWidth = cluesWidth + gridWidth;
	const offsetLeft = (canvasWidth - boardWidth) / 2;

	const gridHeight = cellSize * numRows + 1;
	const boardHeight = cluesHeight + gridHeight;
	const offsetTop = (canvasHeight - boardHeight) / 2;

	return { offsetLeft, offsetTop, cellSize};
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ cellSize: number; gridWidth: number; gridHeight: number; }}
 */
function calcCellSize(canvasWidth, canvasHeight, cluesWidth, cluesHeight, numRows, numColumns) {
  const gridWidth = canvasWidth - cluesWidth - 2 * MIN_PADDING;
  const gridHeight = canvasHeight - cluesHeight - 2 * MIN_PADDING;

  const cellSize = Math.min(
    (gridWidth - 1) / numColumns,
    (gridHeight - 1) / numRows,
  );

  return cellSize;
}
