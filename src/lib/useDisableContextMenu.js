import { useEffect, useRef } from '@wordpress/element';

/**
 * @returns {React.MutableRefObject<HTMLCanvasElement | null>}
 */
export function useDisableContextMenu() {
	const stageRef = useRef( null );
	useEffect( () => {
		/** @type HTMLCanvasElement */
		const canvas = stageRef.current;
		if ( canvas ) {
			// 右クリック時のコンテキストメニューを無効化
			canvas.addEventListener( 'contextmenu', ( event ) => {
				event.preventDefault();
			} );
		}
	} );
	return stageRef;
}
