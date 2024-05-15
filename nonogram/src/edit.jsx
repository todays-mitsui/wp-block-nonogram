import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import React from 'react';
import { Board } from '../../src/Board';
import { BoardSize } from './Controls/BoardSize';
import { BoardView } from './Components/BoardView';
import './editor.scss';

/**
 * @return {JSX.Element}
 */
export default function Edit({ attributes, setAttributes }) {
	/** @type {{ boardData: string }} */
	const { boardData } = attributes;

	const board = boardData == null
		? new Board(15, 15)
		: Board.deserialize(boardData);

	const [wrapperRef, width] = useBlockSize();
	const height = width && width * ASPECT_RATIO;

	const [cluesWidth, cluesHeight] = [100, 100];
	const { offsetLeft, offsetTop, cellSize } = calcLayout(width, height, cluesWidth, cluesHeight, board.numRows, board.numColumns);

	return (
		<div {...useBlockProps()}>
			<div ref={wrapperRef}>
				<InspectorControls key="settings">
					<BoardSize
						board={board}
						setAttributes={setAttributes}
					/>
				</InspectorControls>

				<BoardView
					width={width}
					height={height}
					board={board}
					left={offsetLeft}
					top={offsetTop}
					cluesWidth={cluesWidth}
					cluesHeight={cluesHeight}
					cellSize={cellSize}
					setAttributes={setAttributes}
				/>
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

		return () => {
			wrapperRef.current && observer.unobserve(wrapperRef.current);
		};
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
