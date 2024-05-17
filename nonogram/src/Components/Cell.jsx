import { Group, Rect, Line } from "react-konva";

const COLOR_FILLED = "#333";
const COLOR_EMPTY = "white";
const STROKE_COLOR_LIGHT = "#aaa";

const PADDING = 0.5;
const STROKE_WIDTH = 1;

/**
 * @param {{
 *  id: string;
 *  top: number;
 *  left: number;
 *  cellSize: number;
 *  status: 'unknown' | 'space' | 'filled';
 *  enableSpaceStatus: boolean;
 *  onMouseDown: (event: KonvaEventObject<MouseEvent>) => void;
 *  onMouseOver: (event: KonvaEventObject<MouseEvent>) => void;
 * }} param
 * @returns {JSX.Element}
 */
export function Cell({ id, top, left, cellSize, status, enableSpaceStatus, onMouseDown, onMouseOver }) {
  if (enableSpaceStatus) {
    switch (true) {
      case status === "unknown":
        return <UnknownCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      case status === "space":
        return <SpaceCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      case status === "filled":
        return <FilledCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      default:
        throw new Error("Invalid status");
    }
  } else {
    switch (true) {
      case status === "unknown" || status === "space":
        return <UnknownCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      case status === "filled":
        return <FilledCell id={id} top={top} left={left} cellSize={cellSize} onMouseDown={onMouseDown} onMouseOver={onMouseOver} />;
      default:
        throw new Error("Invalid status");
    }
  }
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
      x={left}
      y={top}
      width={cellSize}
      height={cellSize}
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
    <Group>
      <Rect
        id={id}
        x={left}
        y={top}
        width={cellSize}
        height={cellSize}
        fill={COLOR_EMPTY}
        strokeEnabled={false}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
      />
      <Line
        points={[
          left,
          top,
          left + cellSize,
          top + cellSize,
        ]}
        stroke={STROKE_COLOR_LIGHT}
        strokeWidth={STROKE_WIDTH}
      />
      <Line
        points={[
          left,
          top + cellSize,
          left + cellSize,
          top,
        ]}
        stroke={STROKE_COLOR_LIGHT}
        strokeWidth={STROKE_WIDTH}
      />
    </Group>
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
      x={left}
      y={top}
      width={cellSize}
      height={cellSize}
      fill={COLOR_FILLED}
      strokeEnabled={false}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  );
}
