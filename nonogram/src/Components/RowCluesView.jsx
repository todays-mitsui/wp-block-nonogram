import { Group } from 'react-konva';
import { RowClueView } from './RowClueView';

/**
 * @param {{
* 		clues: number[][];
* 		fontSize: number;
* 		fill: string;
* 		top: number;
* 		left: number;
* 		cluesWidth: number;
* 		cellSize: number;
* }} props
* @returns {JSX.Element}
*/
export function RowCluesView({
	clues,
	fontSize,
	fill,
	top,
	left,
	cluesWidth,
	cellSize,
}) {
	return (
		<Group>
			{ clues.map((clue, index) => (
				<RowClueView
					key={index}
					clue={clue}
					fontSize={fontSize}
					fill={fill}
					top={top + cellSize * index}
					left={left}
					width={cluesWidth}
					height={cellSize}
				/>
			)) }
		</Group>
	);
}
