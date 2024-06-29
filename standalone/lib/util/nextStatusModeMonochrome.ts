import Konva from 'konva';
import { ColorIndex, Status, isFilled } from '../PixelGrid';

const COLOR_INDEX_BLACK: ColorIndex = 0;

export function nextStatusModeMonochrome(
	event: Konva.KonvaEventObject< MouseEvent | TouchEvent >,
	enableSpaceStatus: boolean,
	prevCellStatus: Status,
): Status {
	const enableRightClick = event.evt instanceof MouseEvent;
	const buttons = event.evt instanceof MouseEvent ? event.evt.buttons : null;
	const { altKey, ctrlKey, shiftKey } = event.evt;
	const isRightClick = buttons === 2 || altKey || ctrlKey || shiftKey;

	if ( ! enableSpaceStatus ) {
		return withoutSpaceStatus( prevCellStatus );
	} else if ( enableRightClick ) {
		return withSpaceStatusAndRightClick(
			prevCellStatus,
			isRightClick
		);
	} else {
		return withSpaceStatus( prevCellStatus );
	}
}

function withoutSpaceStatus(
	prevCellStatus: Status,
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ):
			return 'SPACE';
		case prevCellStatus === 'SPACE' || prevCellStatus === 'UNSETTLED':
			return COLOR_INDEX_BLACK;
		default:
			throw new Error( 'Invalid status' );
	}
}

function withSpaceStatus(
	prevCellStatus: Status,
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ):
			return 'SPACE';
		case prevCellStatus === 'SPACE':
			return 'UNSETTLED';
		case prevCellStatus === 'UNSETTLED':
			return COLOR_INDEX_BLACK;
		default:
			throw new Error( 'Invalid status' );
	}
}

function withSpaceStatusAndRightClick(
	prevCellStatus: Status,
	isRightClick: boolean
): Status {
	switch ( true ) {
		case isFilled( prevCellStatus ) && ! isRightClick:
			return 'UNSETTLED';
		case isFilled( prevCellStatus ) && isRightClick:
			return 'SPACE';
		case prevCellStatus === 'SPACE' && ! isRightClick:
			return COLOR_INDEX_BLACK;
		case prevCellStatus === 'SPACE' && isRightClick:
			return 'UNSETTLED';
		case prevCellStatus === 'UNSETTLED' && ! isRightClick:
			return COLOR_INDEX_BLACK;
		case prevCellStatus === 'UNSETTLED' && isRightClick:
			return 'SPACE';
		default:
			throw new Error( 'Invalid status' );
	}
}
