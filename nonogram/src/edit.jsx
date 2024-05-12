import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import React from 'react';
import { BoardSize } from './Controls/BoardSize';
import { createRender } from '../../src/render';
import { Board } from '../../src/Board';
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

	console.info({ boardData });

	const board = boardData == null
		? new Board(15, 15)
		: Board.deserialize(boardData);

	const blockRootRef = useRef(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		const blockRoot = blockRootRef.current;
		const canvas = canvasRef.current;
		const render = createRender(board.width, board.height);

		const resizerCleanup = initResizer(blockRoot, canvas, render);

		return () => {
			resizerCleanup();
		};
	}, [boardData]);

	return (
		<div {...useBlockProps()}>
			<div ref={blockRootRef}>
				<InspectorControls key="settings">
					<BoardSize
						board={board}
						numRows={board.height}
						numColumns={board.width}
						setAttributes={setAttributes}
					/>
				</InspectorControls>

				<canvas
					width={10}
					height={10}
					ref={canvasRef}
				></canvas>
			</div>
		</div>
	);
}

const ASPECT_RATIO = 2 / 3;

/**
 * @param {HTMLDivElement} blockRoot
 * @param {HTMLCanvasElement} canvas
 * @param {(canvas: HTMLCanvasElement) => void} render
 */
function initResizer(blockRoot, canvas, render) {
	const observer = new ResizeObserver((entries) => {
		const newWidth = entries[0]?.contentRect?.width;

		if (newWidth == null) { return; }

		const [width, height] = [newWidth, newWidth * ASPECT_RATIO];

		canvas.width = width;
		canvas.height = height;

		render(canvas);
	});

	observer.observe(blockRoot);

	return () => observer.unobserve(blockRoot);
}
