import { Layer, Stage } from 'react-konva';
import { type PixelGrid, type Clue } from '../../lib/PixelGrid';
import { useDisableContextMenu } from '../../lib/hooks/useDisableContextMenu';

interface Props {
	width: number;
	height: number;
	rowClues: Clue[];
	columnClues: Clue[];
	pixelGrid: PixelGrid;
	setPixelGrid: ( pixelGrid: PixelGrid ) => void;
	config?: Config;
}

export function Board( {
	width,
	height,
	rowClues,
	columnClues,
	pixelGrid,
	setPixelGrid,
	config,
}: Props ): JSX.Element {
	config = {
		...defaultConfig,
		...config,
	};
	console.log(
		width,
		height,
		rowClues,
		columnClues,
		enableSpaceStatus,
		enableCluesCompletion,
		showGrid
	);

	return (
		<Stage
			width={ width }
			height={ height }
			ref={ useDisableContextMenu() }
		>
			Board
		</Stage>
	);
}

// ========================================================================== //

interface Config {
	enableSpaceStatus?: boolean;
	enableCluesCompletion?: boolean;
	showGrid?: boolean;
}

const defaultConfig: Config = {
	enableSpaceStatus: false,
	enableCluesCompletion: false,
	showGrid: true,
};
