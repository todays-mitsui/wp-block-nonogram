import { Group } from 'react-konva';
import { ColumnClueView } from './ColumnClueView';

/**
 * @param {{
 * 		clues: number[][];
 * 		fontSize: number;
 * 		fill: string;
 * 		left: number;
 * 		bottom: number;
 * 		cellSize: number;
 * }} props
 * @returns {JSX.Element}
 */
export function ColumnCluesView({
	clues,
	fontSize,
	fill,
	left,
	bottom,
	cellSize,
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
					bottom={bottom}
					width={cellSize}
				/>
			)) }
		</Group>
	);
}
