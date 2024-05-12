import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';

export function BoardSize({ numRows, numColumns, setAttributes }) {
	const setNumRows = (numRowsStr) => {
		const numRows = parseInt(numRowsStr, 10);
		if (numRows > 0) {
			setAttributes({ numRows: parseInt(numRowsStr, 10) });
		}
	};
	const setNumColumns = (numColumnsStr) => {
		const numColumns = parseInt(numColumnsStr, 10);
		if (numColumns > 0) {
			setAttributes({ numColumns: parseInt(numColumnsStr, 10) });
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
