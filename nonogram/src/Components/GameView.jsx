import { useEffect, useRef, useState } from "@wordpress/element";
import { Board } from "../../../src/Board";
import { BoardView } from "./BoardView";
import { useBlockWidth } from "../lib/useBlockWidth";
import { useBoardStore } from "../lib/useBoardStore";
import { calcLayout } from "../lib/calcLayout";

/**
 * @param {{
 *  aspectRatio: [number, number];
 *  rowClues: number[][];
 *  columnClues: number[][];
 *  rowCluesSize: number;
 *  columnCluesSize: number;
 * }} param
 * @returns {JSX.Element}
 */
export function GameView({
  aspectRatio,
  rowClues,
  columnClues,
  rowCluesSize,
  columnCluesSize,
}) {
  const [boardData, setBoardData] = useBoardStore(rowClues, columnClues);
  const board = boardData && Board.deserialize(boardData);

  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * aspectRatio[1] / aspectRatio[0];
  const layout = width && calcLayout(
    width,
    height,
    rowCluesSize,
    columnCluesSize,
    rowClues.length,
    columnClues.length,
  );

  return (
    <div ref={wrapperRef}>
      {board && width &&
        (
          <BoardView
            width={width}
            height={height}
            board={board}
            left={layout?.offsetLeft}
            top={layout?.offsetTop}
            rowClues={rowClues}
            columnClues={columnClues}
            cluesWidth={rowCluesSize}
            cluesHeight={columnCluesSize}
            cellSize={layout?.cellSize}
            setBoardData={setBoardData}
            enableSpaceStatus={true}
          />
        )}
    </div>
  );
}
