import { __ } from "@wordpress/i18n";
import {
  __experimentalNumberControl as NumberControl,
  PanelBody,
  SelectControl,
} from "@wordpress/components";
import { Board } from "../../../src/Board";

/**
 * @param {{
 *  board: Board;
 *  aspectRatio: [number, number];
 *  setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 * @returns
 */
export function BoardSize({ board, aspectRatio, setAttributes }) {
  const setNumRows = (numRowsStr) => {
    const numRows = parseInt(numRowsStr, 10);
    if (numRows > 0) {
      board.resize(board.numColumns, numRows);
      setAttributes({ boardData: board.serialize() });
    }
  };
  const setNumColumns = (numColumnsStr) => {
    const numColumns = parseInt(numColumnsStr, 10);
    if (numColumns > 0) {
      board.resize(numColumns, board.numRows);
      setAttributes({ boardData: board.serialize() });
    }
  };

  const aspectRatioOptions = [
    { label: __("Square - 1:1", "nonogram"), value: [1, 1].join(":") },
    { label: __("Wide - 3:2", "nonogram"), value: [3, 2].join(":") },
    { label: __("Tall - 2:3", "nonogram"), value: [2, 3].join(":") },
  ];

  return (
    <PanelBody title={__("Settings", "nonogram")} initialOpen="true">
      <div className="nonogram-controls">
        <NumberControl
          label={__("Columns", "nonogram")}
          isShiftStepEnabled={true}
          onChange={setNumColumns}
          shiftStep={5}
          value={board.numColumns}
          min={1}
        />
        <NumberControl
          label={__("Rows", "nonogram")}
          isShiftStepEnabled={true}
          onChange={setNumRows}
          shiftStep={5}
          value={board.numRows}
          min={1}
        />
      </div>
      <SelectControl
        label={__("Aspect Ratio", "nonogram")}
        value={aspectRatio.join(":")}
        options={aspectRatioOptions}
        onChange={(value) => {
          const aspectRatio = value.split(":").map((str) => parseInt(str, 10));
          setAttributes({ aspectRatio });
        }}
      />
    </PanelBody>
  );
}
