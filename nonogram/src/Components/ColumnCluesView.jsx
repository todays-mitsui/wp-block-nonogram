import { Group } from 'react-konva';
import { ColumnClueView } from './ColumnClueView';

/**
 * @param {{
 * 		clues: number[][];
 * 		fontSize: number;
 * 		fill: string;
 * 		top: number;
 * 		left: number;
 * 		cellSize: number;
 * 		cluesHeight: number;
 * }} props
 * @returns {JSX.Element}
 */
export function ColumnCluesView({
	clues,
	fontSize,
	fill,
	top,
	left,
	cellSize,
	cluesHeight,
}) {
	return (
		<Group>
			{ clues.map((clue, index) => (
				<ColumnClueView
					key={index}
					clue={clue}
					fontSize={fontSize}
					fill={fill}
					left={left + cellSize * index}
					bottom={top + cluesHeight}
					width={cellSize}
				/>
			)) }
		</Group>
	);
}
