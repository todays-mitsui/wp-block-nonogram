import Konva from 'konva';
import { ColorIndex, Status, isFilled } from '../PixelGrid';

export function decideNextCellStatus(
	event: Konva.KonvaEventObject< MouseEvent | TouchEvent >,
	enableSpaceStatus: boolean,
	prevCellStatus: Status,
	currentColorIndex: ColorIndex
): Status {
	const enableRightClick = event.evt instanceof MouseEvent;
	const buttons = event.evt instanceof MouseEvent ? event.evt.buttons : null;
	const { altKey, ctrlKey, shiftKey } = event.evt;
	const isRightClick = buttons === 2 || altKey || ctrlKey || shiftKey;

	if ( ! enableSpaceStatus ) {
		return withoutSpaceStatus( prevCellStatus, currentColorIndex );
	} else if ( enableRightClick ) {
		return withSpaceStatusAndRightClick(
			prevCellStatus,
			currentColorIndex,
			isRightClick
		);
	} else {
		return withSpaceStatus( prevCellStatus, currentColorIndex );
	}
}

function withoutSpaceStatus(
	prevCellStatus: Status,
	currentColorIndex: ColorIndex
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ):
			return 'SPACE';
		case prevCellStatus === 'SPACE' || prevCellStatus === 'UNSETTLED':
			return currentColorIndex;
		default:
			throw new Error( 'Invalid status' );
	}
}

function withSpaceStatus(
	prevCellStatus: Status,
	currentColorIndex: ColorIndex
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ):
			return 'SPACE';
		case prevCellStatus === 'SPACE':
			return 'UNSETTLED';
		case prevCellStatus === 'UNSETTLED':
			return currentColorIndex;
		default:
			throw new Error( 'Invalid status' );
	}
}

function withSpaceStatusAndRightClick(
	prevCellStatus: Status,
	currentColorIndex: ColorIndex,
	isRightClick: boolean
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ) && ! isRightClick:
			return 'UNSETTLED';
		case isFilled( prevCellStatus ) && isRightClick:
			return 'SPACE';
		case prevCellStatus === 'SPACE' && ! isRightClick:
			return currentColorIndex;
		case prevCellStatus === 'SPACE' && isRightClick:
			return 'UNSETTLED';
		case prevCellStatus === 'UNSETTLED' && ! isRightClick:
			return currentColorIndex;
		case prevCellStatus === 'UNSETTLED' && isRightClick:
			return 'SPACE';
		default:
			throw new Error( 'Invalid status' );
	}
}
