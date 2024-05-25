// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { GameView } from './Components/GameView.jsx';
// import { createRoot } from 'react-dom/client';

/**
 * @param {HTMLDivElement} container
 * @returns {void}
 */
function init(container: HTMLDivElement) {
	const aspectRatio = container.dataset.aspectRatio
		? container.dataset.aspectRatio
			.split(':')
			.map((str) => parseInt(str, 10))
		: [1, 1];
	const rowClues = decodeClues(container.dataset.rowClues);
	const columnClues = decodeClues(container.dataset.columnClues);

	ReactDOM.createRoot(container).render(
		<GameView
			aspectRatio={aspectRatio}
			rowClues={rowClues}
			columnClues={columnClues}
		/>
	);
}

/**
 * @param {string} cluesStr
 * @returns {number[][]}
 */
function decodeClues(cluesStr: string) {
	return cluesStr
		.split(';')
		.map((clues) =>
			clues.split(',').map((clue) => parseInt(clue, 10))
		);
}

{
	document
		.querySelectorAll('.wp-block-todays-mitsui-nonogram')
		.forEach((container) => init(container as HTMLDivElement));
}
