import { Board } from "../../../src/Board";
import { Group, Rect } from "react-konva";

const COLOR_FILLED = "#333";
const COLOR_EMPTY = "transparent";

const PADDING = 0.5;
const STROKE_WIDTH = 1;

/**
 * @param {{
 * 		board: Board;
 * 		cells: { id: string; x: number; y: number; status: 'unknown' | 'space' | 'filled'; }[];
 * 		top: number;
 * 		left: number;
 * 		cellSize: number;
 * 		isDragging: boolean;
 * 		currentState: 'fill' | 'clear' | null;
 * 		onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 * 		setBoardData: (boardData: string) => void;
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
  onMouseDown: onParentMouseDown,
  setBoardData,
}) {
  const onMouseDown = (event) => {
    const cell = cells.find((cell) => cell.id === event.target.attrs.id);
    if (cell) {
      const prevStatus = cell.status;
      const nextStatus = prevStatus === "filled" ? "unknown" : "filled";
      board.changeStatus(cell.x, cell.y, nextStatus);
      onParentMouseDown(nextStatus);
      setBoardData(board.serialize());
    }
  };

  const onMouseOver = (event) => {
    if (!isDragging || nextStatus == null) return;

    const cell = cells.find((cell) => cell.id === event.target.attrs.id);
    if (cell) {
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
          onMouseDown={onMouseDown}
          onMouseOver={onMouseOver}
        />
      ))}
    </>
  );
}

{/* <Rect
key={id}
id={id}
x={left + x * cellSize + PADDING}
y={top + y * cellSize + PADDING}
width={cellSize - PADDING - STROKE_WIDTH}
height={cellSize - PADDING - STROKE_WIDTH}
fill={status === 'filled' ? COLOR_FILLED : COLOR_EMPTY}
strokeEnabled={false}
onMouseDown={onMouseDown}
onMouseOver={onMouseOver}
/> */}

/**
 * @param {{
 *  id: string;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  status: 'unknown' | 'space' | 'filled';
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  onMouseOver: (event: KonvaEventObject<MouseEvent>) => void;
 * }} param
 * @returns {JSX.Element}
 */
function Cell({ id, top, left, cellSize, status, onMouseDown, onMouseOver }) {
  const cell = (() => {
    switch (status) {
      case "unknown":
        return <UnknownCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      case "space":
        return <SpaceCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      case "filled":
        return <FilledCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      default:
        throw new Error("Invalid status");
    }
  })();

  return (
    <Group
      id={id}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    >{ cell }</Group>
  );
}

/**
 * @param {{
 *  id: string;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  onMouseOver: (event: KonvaEventObject<MouseEvent>) => void;
 * }} param
 * @returns
 */
function UnknownCell({ id, top, left, cellSize, onMouseDown, onMouseOver }) {
  return (
    <Rect
      id={id}
      x={left + PADDING}
      y={top + PADDING}
      width={cellSize - PADDING - STROKE_WIDTH}
      height={cellSize - PADDING - STROKE_WIDTH}
      fill={COLOR_EMPTY}
      strokeEnabled={false}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  );
}

/**
 * @param {{
 *  id: string;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  onMouseOver: (event: KonvaEventObject<MouseEvent>) => void;
 * }} param
 * @returns
 */
function SpaceCell({ id, top, left, cellSize, onMouseDown, onMouseOver }) {
  return (
    <Rect
      id={id}
      x={left + PADDING}
      y={top + PADDING}
      width={cellSize - PADDING - STROKE_WIDTH}
      height={cellSize - PADDING - STROKE_WIDTH}
      fill={'yellow'}
      strokeEnabled={false}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  );
}

/**
 * @param {{
 *  id: string;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  onMouseOver: (event: KonvaEventObject<MouseEvent>) => void;
 * }} param
 * @returns
 */
function FilledCell({ id, top, left, cellSize, onMouseDown, onMouseOver }) {
  return (
    <Rect
      id={id}
      x={left + PADDING}
      y={top + PADDING}
      width={cellSize - PADDING - STROKE_WIDTH}
      height={cellSize - PADDING - STROKE_WIDTH}
      fill={COLOR_FILLED}
      strokeEnabled={false}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  );
}
