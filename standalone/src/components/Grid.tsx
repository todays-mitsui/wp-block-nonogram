import { useCallback, useContext } from 'react';
import { Stage, Line, Rect } from 'react-konva';
import Konva from 'konva';
import {
	getPixels,
	update as updatePixelGrid,
	PixelGrid,
	ColorIndex,
	Status,
} from '../../lib/PixelGrid';
import { Layout } from '../../lib/Layout';
import { ConfigContext } from './ConfigContext';
import { decideNextCellStatus } from '../../lib/util/decideNextCellStatus';

interface Props {
	pixelGrid: PixelGrid;
	setPixelGrid: ( pixelGrid: PixelGrid ) => void;
	palette: { [ colorIndex in ColorIndex ]: string };
	layout: Layout;
	nextStatus: Status | null;
	setNextStatus: ( nextStatus: Status | null ) => void;
	currentColorIndex: ColorIndex;
}

export function Grid( {
	pixelGrid,
	setPixelGrid,
	palette,
	layout,
	nextStatus,
	setNextStatus,
	currentColorIndex,
}: Props ): JSX.Element {
	const { enableSpaceStatus } = useContext( ConfigContext );
	const pixels = getPixels( pixelGrid );

	const onMouseDown = useCallback(
		( event: Konva.KonvaEventObject< MouseEvent | TouchEvent > ) => {
			const pixel = pixels.find(
				( pixel ) => pixel.id === event.target.attrs.id
			);

			if ( pixel ) {
				const prevCellStatus = pixel.status;
				const nextStatus = decideNextCellStatus(
					event,
					enableSpaceStatus,
					prevCellStatus,
					currentColorIndex
				);
				setPixelGrid(
					updatePixelGrid( pixelGrid, {
						x: pixel.x,
						y: pixel.y,
						newStatus: nextStatus,
					} )
				);
				setNextStatus( nextStatus );
			}
		},
		[ pixels, setPixelGrid ]
	);

	const onMouseOver = useCallback(
		( event: Konva.KonvaEventObject< MouseEvent > ) => {
			if ( nextStatus == null ) return;

			if ( event.evt.buttons === 0 ) {
				setNextStatus( null );
				return;
			}

			const pixel = pixels.find(
				( pixel ) => pixel.id === event.target.attrs.id
			);
			if ( pixel ) {
				setPixelGrid(
					updatePixelGrid( pixelGrid, {
						x: pixel.x,
						y: pixel.y,
						newStatus: nextStatus,
					} )
				);
			}
		},
		[ nextStatus, pixels, setPixelGrid ]
	);

	const cellStatus = useCallback(
		( status: Status ): CellStatus => {
			if ( status === 'UNSETTLED' ) return 'UNSETTLED';
			if ( status === 'SPACE' ) return 'SPACE';
			return { color: palette[ status ] };
		},
		[ palette ]
	);

	return (
		<>
			{ pixels.map( ( { id, x, y, status } ) => (
				<Cell
					key={ id }
					id={ id }
					top={ layout.offsetTop + y * layout.cellSize }
					left={ layout.offsetLeft + x * layout.cellSize }
					cellSize={ layout.cellSize }
					cellStatus={ cellStatus( status ) }
					onMouseDown={ onMouseDown }
					onMouseOver={ onMouseOver }
				/>
			) ) }
		</>
	);
}

// ========================================================================== //

const STROKE_COLOR_LIGHT = '#aaa';
const STROKE_WIDTH = 1;

interface FilledCell {
	color: string;
}

function isFilledCell( CellStatus: CellStatus ): CellStatus is FilledCell {
	return typeof CellStatus === 'object';
}

type CellStatus = 'UNSETTLED' | 'SPACE' | FilledCell;

interface CellProps {
	id: string;
	top: number;
	left: number;
	cellSize: number;
	cellStatus: CellStatus;
	onMouseDown: ( event: Konva.KonvaEventObject< MouseEvent > ) => void;
	onMouseOver: ( event: Konva.KonvaEventObject< MouseEvent > ) => void;
}

function Cell( {
	id,
	top,
	left,
	cellSize,
	cellStatus,
	onMouseDown,
	onMouseOver,
}: CellProps ): JSX.Element {
	const { enableSpaceStatus } = useContext( ConfigContext );
	const fill = isFilledCell( cellStatus ) ? cellStatus.color : 'transparent';
	const crossPadding = cellSize * 0.25;

	return (
		<>
			<Rect
				id={ id }
				x={ left }
				y={ top }
				width={ cellSize }
				height={ cellSize }
				fill={ fill }
				strokeEnabled={ false }
				onMouseDown={ onMouseDown }
				onMouseOver={ onMouseOver }
			/>
			{ enableSpaceStatus && cellStatus === 'SPACE' && (
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
			{ enableSpaceStatus && cellStatus === 'SPACE' && (
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
		</>
	);
}
