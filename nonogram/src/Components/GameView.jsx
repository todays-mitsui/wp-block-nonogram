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

  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * aspectRatio[1] / aspectRatio[0];
  const layout = width && calcLayout(
    width,
    height,
    100,
    100,
    rowClues.length,
    columnClues.length,
  );

  const [cluesWidth, cluesHeight] = [100, 100];

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
            cluesWidth={cluesWidth}
            cluesHeight={cluesHeight}
            cellSize={layout?.cellSize}
            setBoardData={setBoardData}
            enableSpaceStatus={true}
          />
        )}
    </div>
  );
}
