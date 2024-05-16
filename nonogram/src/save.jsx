import { useBlockProps } from "@wordpress/block-editor";
import { Board } from "../../src/Board";

/**
 * @return {Element} Element to render.
 */
export function save({ attributes }) {
  /** @type {{ boardData: string }} */
  const { boardData } = attributes;

  const board = boardData == null
    ? new Board(15, 15)
    : Board.deserialize(boardData);

  const rowCluesStr = [...board.rowClues()].map((clues) => clues.join(","))
    .join(";");
  const columnCluesStr = [...board.columnClues()].map((clues) =>
    clues.join(",")
  ).join(";");

  return (
    <div
      {...useBlockProps.save()}
      style={{
        "aspect-ratio": "3 / 2",
      }}
      data-row-clues={rowCluesStr}
      data-column-clues={columnCluesStr}
    />
  );
}
