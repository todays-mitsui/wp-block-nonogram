import { useEffect, useRef, useState } from "@wordpress/element";
import { Board } from "../Model/Board";
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
}) {
  const [boardData, setBoardData] = useBoardStore(rowClues, columnClues);
  const board = boardData && Board.deserialize(boardData);

  const maxNumRowClues = Math.max(1, ...rowClues.map((clues) => clues.length));
  const maxNumColumnClues = Math.max(
    1,
    ...columnClues.map((clues) => clues.length),
  );

  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * aspectRatio[1] / aspectRatio[0];
  const layout = width && calcLayout(
    width,
    height,
    maxNumRowClues + 1,
    maxNumColumnClues + 1,
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
            cluesFontSize={layout?.cluesFontSize}
            cluesWidth={layout?.cluesWidth}
            cluesHeight={layout?.cluesHeight}
            cellSize={layout?.cellSize}
            setBoardData={setBoardData}
            enableSpaceStatus={true}
            enableCluesCompletion={true}
          />
        )}
    </div>
  );
}
