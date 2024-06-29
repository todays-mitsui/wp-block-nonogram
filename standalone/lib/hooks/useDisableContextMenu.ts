import { useEffect, useCallback, useRef, type RefObject } from 'react';
import Konva from 'konva';

export function useDisableContextMenu(): RefObject< Konva.Stage > {
	const stageRef = useRef< Konva.Stage >( null );

	const handleContextMenu = useCallback( ( event: Event ) => {
		event.preventDefault();
	}, [] );

	useEffect( () => {
		const stage = stageRef.current;

		if ( stage ) {
			// 右クリック時のコンテキストメニューを無効化
			stage.addEventListener( 'contextmenu', handleContextMenu );
		}

		return () => {
			if ( stage ) {
				stage.removeEventListener( 'contextmenu' );
			}
		};
	}, [ stageRef.current ] );

	return stageRef;
}
