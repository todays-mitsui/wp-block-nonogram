import { useCallback } from "@wordpress/element";
import { Board } from "../../../src/Board";
import { Cell } from "./Cell";

/**
 * @param {{
 *  board: Board;
 *  cells: { id: string; x: number; y: number; status: 'unknown' | 'space' | 'filled'; }[];
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  isDragging: boolean;
 *  nextStatus: 'unknown' | 'space' | 'filled' | null;
 *  enableSpaceStatus: boolean;
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  setBoardData: (boardData: string) => void;
 * }} param
 */
export function CellsView({
  board,
  cells,
  top,
  left,
  cellSize,
  isDragging,
  nextStatus,
  enableSpaceStatus,
  onMouseDown: onParentMouseDown,
  setBoardData,
}) {
  const decideNextStatus = useCallback((event, prevStatus) => {
    return enableSpaceStatus
      ? decideNextStatusWithSpaceStatusAndRightClick(event, prevStatus)
      : decideNextStatusWithoutSpaceStatus(prevStatus);
  }, [enableSpaceStatus]);

  const onMouseDown = (event) => {
    const cell = cells.find((cell) => cell.id === event.target.attrs.id);
    if (cell) {
      console.info({ onMouseDown: cell.id });
      const prevStatus = cell.status;
      const nextStatus = decideNextStatus(event, prevStatus);
      board.changeStatus(cell.x, cell.y, nextStatus);
      onParentMouseDown(nextStatus);
      setBoardData(board.serialize());
    }
  };

  const onMouseOver = (event) => {
    if (!isDragging || nextStatus == null) return;

    const cell = cells.find((cell) => cell.id === event.target.attrs.id);
    if (cell) {
      console.info({ onMouseOver: cell.id });
      board.changeStatus(cell.x, cell.y, nextStatus);
      setBoardData(board.serialize());
    }
  };

  return (
    <>
      {cells.map(({ id, x, y, status }) => (
        <Cell
          key={id}
          id={id}
          top={top + y * cellSize}
          left={left + x * cellSize}
          cellSize={cellSize}
          status={status}
          enableSpaceStatus={enableSpaceStatus}
          onMouseDown={onMouseDown}
          onMouseOver={onMouseOver}
        />
      ))}
    </>
  );
}

function decideNextStatusWithSpaceStatus(prevStatus) {
  switch (true) {
    case prevStatus === "filled":
      return "space";
    case prevStatus === "space":
      return "unknown";
    case prevStatus === "unknown":
      return "filled";
    default:
      throw new Error("Invalid status");
  }
}

function decideNextStatusWithSpaceStatusAndRightClick(event, prevStatus) {
  // console.info({ event: event, evt: event.evt, button: event.evt.button });

  switch (true) {
    case prevStatus === "filled":
      return "space";
    case prevStatus === "space":
      return "unknown";
    case prevStatus === "unknown":
      return "filled";
    default:
      throw new Error("Invalid status");
  }
}

function decideNextStatusWithoutSpaceStatus(prevStatus) {
  switch (true) {
    case prevStatus === "filled":
      return "space";
    case prevStatus === "space" || prevStatus === "unknown":
      return "filled";
    default:
      throw new Error("Invalid status");
  }
}
