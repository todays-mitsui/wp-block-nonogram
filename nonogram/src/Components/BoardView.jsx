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
 *  cluesFontSize: number;
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
  cluesFontSize,
  cluesWidth,
  cluesHeight,
  cellSize,
  setBoardData,
  enableSpaceStatus,
}) {
  // <canvas> 要素を取得し、コンテキストメニューを無効にする
  const stageRef = useDisableContextMenu();

  // マウスドラッグによる状態変更のために変更すべきステータスを保持しておく
  const [nextStatus, setNextStatus] = useState(null);

  const cells = [...board.cells()];

  return (
    <Stage
      width={width}
      height={height}
      onMouseUp={() => setNextStatus(null)}
      onTouchEnd={() => setNextStatus(null)}
      ref={stageRef}
    >
      <Layer>
        <CellsView
          board={board}
          cells={cells}
          top={top + cluesHeight}
          left={left + cluesWidth}
          cellSize={cellSize}
          nextStatus={nextStatus}
          enableSpaceStatus={enableSpaceStatus}
          setNextStatus={setNextStatus}
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
          fontSize={cluesFontSize}
          fill="black"
          top={top}
          left={left + cluesWidth}
          cellSize={cellSize}
          cluesHeight={cluesHeight}
        />
        <RowCluesView
          clues={rowClues}
          fontSize={cluesFontSize}
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
