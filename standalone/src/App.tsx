import { useState } from 'react';
import './App.css';
import { type PixelGrid, newPixelGrid, type Clue } from '../lib/PixelGrid';
import { Board } from './components/Board';

function App() {
	const rowClues: Clue[] = [
		[
			[ 1, 0 ],
			[ 1, 0 ],
		],
		[
			[ 1, 0 ],
			[ 1, 0 ],
			[ 1, 0 ],
		],
		[
			[ 1, 0 ],
			[ 1, 0 ],
			[ 1, 0 ],
		],
		[
			[ 1, 0 ],
			[ 1, 0 ],
		],
		[
			[ 1, 0 ],
			[ 1, 0 ],
		],
	];
	const columnClues: Clue[] = [
		[ [ 3, 0 ] ],
		[ [ 2, 0 ] ],
		[ [ 2, 0 ] ],
		[ [ 2, 0 ] ],
		[ [ 3, 0 ] ],
	];
	const [ pixelGrid, setPixelGrid ] = useState(
		newPixelGrid( columnClues.length, rowClues.length )
	);

	return (
		<>
			<Board
				width={ 600 }
				height={ 400 }
				rowClues={ rowClues }
				columnClues={ columnClues }
				pixelGrid={ pixelGrid }
				setPixelGrid={ setPixelGrid }
			/>
		</>
	);
}

export default App;
