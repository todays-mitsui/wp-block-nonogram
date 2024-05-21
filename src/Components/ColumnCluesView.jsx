import { Group } from 'react-konva';
import { ColumnClueView } from './ColumnClueView';

/**
 * @param {{
 *  clues: number[][];
 *  cluesCompletions: boolean[] | null;
 *  fontSize: number;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  cluesHeight: number;
 * }} props
 * @returns {JSX.Element}
 */
export function ColumnCluesView( {
	clues,
	cluesCompletions,
	fontSize,
	top,
	left,
	cellSize,
	cluesHeight,
} ) {
	return (
		<Group>
			{ clues.map( ( clue, index ) => (
				<ColumnClueView
					key={ index }
					clue={ clue }
					completion={ cluesCompletions && cluesCompletions[ index ] }
					fontSize={ fontSize }
					left={ left + cellSize * index }
					bottom={ top + cluesHeight }
					width={ cellSize }
				/>
			) ) }
		</Group>
	);
}
