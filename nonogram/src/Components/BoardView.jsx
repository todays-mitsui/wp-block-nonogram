import { useEffect, useRef, useState } from "@wordpress/element";
import { Layer, Stage } from "react-konva";
import { Board } from "../../../src/Board";
import { CellsView } from "./CellsView";
import { GridView } from "./GridView";
import { ColumnCluesView } from "./ColumnCluesView";
import { RowCluesView } from "./RowCluesView";

/**
 * @param {{
 *  width: number;
 *  height: number;
 *  board: Board;
 *  left: number;
 *  top: number;
 *  rowClues: number[][];
 *  columnClues: number[][];
 *  cluesWidth: number;
 *  cluesHeight: number;
 *  cellSize: number;
 *  setBoardData: (boardData: string) => void;
 *  enableSpaceStatus: boolean
 * }} param
 * @returns {JSX.Element}
 */
export function BoardView({
  width,
  height,
  board,
  left,
  top,
  rowClues,
  columnClues,
  cluesWidth,
  cluesHeight,
  cellSize,
  setBoardData,
  enableSpaceStatus,
}) {
  const stageRef = useDisableContextMenu();

  const [isDragging, setIsDragging] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);

  // 各セルでマウスが押されたときに呼ばれる想定のハンドラ
  const onMouseDown = (nextStatus) => {
    setIsDragging(true);
    setNextStatus(nextStatus);
  };

  const onMouseUp = (event) => {
    setIsDragging(false);
    setNextStatus(null);
  };

  const cells = [...board.cells()];

  const fontSize = Math.min(cellSize / 2, 20);

  return (
    <Stage
      width={width}
      height={height}
      onMouseUp={onMouseUp}
      ref={stageRef}
    >
      <Layer>
        <CellsView
          board={board}
          cells={cells}
          top={top + cluesHeight}
          left={left + cluesWidth}
          cellSize={cellSize}
          isDragging={isDragging}
          nextStatus={nextStatus}
          enableSpaceStatus={enableSpaceStatus}
          onMouseDown={onMouseDown}
          setBoardData={setBoardData}
        />
        <GridView
          top={top}
          left={left}
          cluesWidth={cluesWidth}
          cluesHeight={cluesHeight}
          numRows={board.numRows}
          numColumns={board.numColumns}
          cellSize={cellSize}
        />
        <ColumnCluesView
          clues={columnClues}
          fontSize={fontSize}
          fill="black"
          top={top}
          left={left + cluesWidth}
          cellSize={cellSize}
          cluesHeight={cluesHeight}
        />
        <RowCluesView
          clues={rowClues}
          fontSize={fontSize}
          fill="black"
          top={top + cluesHeight}
          left={left}
          cellSize={cellSize}
          cluesWidth={cluesWidth}
        />
      </Layer>
    </Stage>
  );
}

function useDisableContextMenu() {
  const stageRef = useRef(null);
  useEffect(() => {
    /** @type HTMLCanvasElement */
    const canvas = stageRef.current;
    if (canvas) {
      // 右クリック時のコンテキストメニューを無効化
      canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
    }
  });
  return stageRef;
}
