
import { Line, Rect } from 'react-konva';

export function Grid(): JSX.Element {
	return (
		<Stage width={ 800 } height={ 600 }>
			Grid
		</Stage>
	);
}

// ========================================================================== //

const STROKE_COLOR_LIGHT = '#aaa';
const STROKE_WIDTH = 1;


interface FilledCell {
	color: string;
}

function isFilledCell( status: Status ): status is FilledCell {
	return typeof status === 'object';
}

type Status = 'UNSETTLED' | 'SPACE' | FilledCell

interface CellProps {
	id: string;
	top: number;
	left: number;
	cellSize: number;
	status: Status;
	enableSpaceStatus: boolean;
}

function Cell({
	id,
	top,
	left,
	cellSize,
	status,
	enableSpaceStatus,
}: CellProps): JSX.Element {
	const fill = isFilledCell( status ) ? status.color : 'transparent';
	const crossPadding = cellSize * 0.25;

	return <>
		<Rect
			id={ id }
			x={ left }
			y={ top }
			width={ cellSize }
			height={ cellSize }
			fill={ fill }
			strokeEnabled={ false }
		/>
		{ enableSpaceStatus && status === 'SPACE' && (
			<Line
				points={ [
					left + crossPadding,
					top + crossPadding,
					left + cellSize - crossPadding,
					top + cellSize - crossPadding,
				] }
				stroke={ STROKE_COLOR_LIGHT }
				strokeWidth={ STROKE_WIDTH }
			/>
		) }
		{ enableSpaceStatus && status === 'SPACE' && (
			<Line
				points={ [
					left + crossPadding,
					top + cellSize - crossPadding,
					left + cellSize - crossPadding,
					top + crossPadding,
				] }
				stroke={ STROKE_COLOR_LIGHT }
				strokeWidth={ STROKE_WIDTH }
			/>
		) }
	</>;
}
