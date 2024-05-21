import { Board } from '../Model/Board';
import { useCluesDigest } from './cluesDigest';
import { useLocalStorage } from './useLocalStorage';

/**
 * @param {number[][]} rowClues
 * @param {number[][]} columnClues
 * @returns {[string | null, (newBoardData: string) => void]}
 */
export function useBoardStore( rowClues, columnClues ) {
	const cluesDigest = useCluesDigest( rowClues, columnClues );
	const levelKey = cluesDigest && `nonogram-level-${ cluesDigest }`;

	return useLocalStorage( levelKey, () => {
		const board = new Board( columnClues.length, rowClues.length );
		return board.serialize();
	} );
}
