import { useEffect, useRef, useState } from "@wordpress/element";
import { Board } from "../../../src/Board";
import { BoardView } from "./BoardView";
import { useBlockWidth } from "../lib/useBlockWidth";
import { useBoardStore } from "../lib/useBoardStore";

const ASPECT_RATIO = 2 / 3;

/**
 * @param {{
 *  rowClues: number[][];
 *  columnClues: number[][];
 *  layout: {
 *    offsetLeft: number;
 *    offsetTop: number;
 *    cellSize: number;
 *  };
 * }} param
 * @returns {JSX.Element}
 */
export function GameView({
  rowClues,
  columnClues,
  layout: { offsetLeft, offsetTop, cellSize },
}) {
  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * ASPECT_RATIO;

  const [boardData, setBoardData] = useBoardStore(rowClues, columnClues);
  const board = boardData && Board.deserialize(boardData);

  const [cluesWidth, cluesHeight] = [100, 100];

  return (
    <div ref={wrapperRef}>
      {board &&
        (
          <BoardView
            width={width}
            height={height}
            board={board}
            left={offsetLeft}
            top={offsetTop}
            rowClues={rowClues}
            columnClues={columnClues}
            cluesWidth={cluesWidth}
            cluesHeight={cluesHeight}
            cellSize={cellSize}
            setBoardData={setBoardData}
            enableSpaceStatus={true}
          />
        )}
    </div>
  );
}
