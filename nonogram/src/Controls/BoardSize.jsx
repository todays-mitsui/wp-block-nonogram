import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';
import { Board } from '../../../src/Board';

/**
 * @param {{
 * 		board: Board;
 * 		numRows: number;
 * 		numColumns: number;
 * 		setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 * @returns
 */
export function BoardSize({ board, numRows, numColumns, setAttributes }) {
	const setNumRows = (numRowsStr) => {
		const numRows = parseInt(numRowsStr, 10);
		if (numRows > 0) {
			board.resize(numColumns, numRows);
			setAttributes({ boardData: board.serialize() });
		}
	};
	const setNumColumns = (numColumnsStr) => {
		const numColumns = parseInt(numColumnsStr, 10);
		if (numColumns > 0) {
			board.resize(numColumns, numRows);
			setAttributes({ boardData: board.serialize() });
		}
	};

	return (
		<PanelBody title="盤面のサイズ" initialOpen="true">
			<fieldset>
				<legend>行数</legend>
				<NumberControl
					isShiftStepEnabled={ true }
					onChange={ setNumRows }
					shiftStep={ 5 }
					value={ numRows }
					min={ 1 }
				/>
			</fieldset>
			<fieldset>
				<legend>列数</legend>
				<NumberControl
					isShiftStepEnabled={ true }
					onChange={ setNumColumns }
					shiftStep={ 5 }
					value={ numColumns }
					min={ 1 }
				/>
			</fieldset>
		</PanelBody>
	);
}
