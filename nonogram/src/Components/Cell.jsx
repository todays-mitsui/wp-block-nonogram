import { Line, Rect } from "react-konva";

const COLOR_FILLED = "#333";
const COLOR_EMPTY = "white";
const STROKE_COLOR_LIGHT = "#aaa";

const PADDING = 0;
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
export function Cell(
  {
    id,
    top,
    left,
    cellSize,
    status,
    enableSpaceStatus,
    onMouseDown,
    onMouseOver,
  },
) {
  if (!enableSpaceStatus && status === "space") {
    status = "unknown";
  }

  const crossPadding = cellSize * 0.25;

  return (
    <>
      <Rect
        id={id}
        x={left + PADDING}
        y={top + PADDING}
        width={cellSize - 2 * PADDING}
        height={cellSize - 2 * PADDING}
        fill={status === "filled" ? COLOR_FILLED : COLOR_EMPTY}
        strokeEnabled={false}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
      />
      {status === "space" &&
        (
          <Line
            points={[
              left + crossPadding,
              top + crossPadding,
              left + cellSize - crossPadding,
              top + cellSize - crossPadding,
            ]}
            stroke={STROKE_COLOR_LIGHT}
            strokeWidth={STROKE_WIDTH}
          />
        )}
      {status === "space" &&
        (
          <Line
            points={[
              left + crossPadding,
              top + cellSize - crossPadding,
              left + cellSize - crossPadding,
              top + crossPadding,
            ]}
            stroke={STROKE_COLOR_LIGHT}
            strokeWidth={STROKE_WIDTH}
          />
        )}
    </>
  );
}
