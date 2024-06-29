import { Layer, Stage } from 'react-konva';
import { type PixelGrid, type Clue } from '../../lib/PixelGrid';
import { useDisableContextMenu } from '../../lib/hooks/useDisableContextMenu';
import { Config, defaultConfig, ConfigContext } from './ConfigContext';

interface Props {
	width: number;
	height: number;
	rowClues: Clue[];
	columnClues: Clue[];
	pixelGrid: PixelGrid;
	setPixelGrid: ( pixelGrid: PixelGrid ) => void;
	config?: Partial<Config>;
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
	const completeConfig: Config = {
		...defaultConfig,
		...config,
	};
	console.log({
		width,
		height,
		rowClues,
		columnClues,
		...config,
	});

	return (
		<Stage
			width={ width }
			height={ height }
			ref={ useDisableContextMenu() }
		>
			<ConfigContext.Provider value={ completeConfig }>
				Board
			</ConfigContext.Provider>
		</Stage>
	);
}
