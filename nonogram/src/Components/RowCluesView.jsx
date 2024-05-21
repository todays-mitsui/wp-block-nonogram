import { Group } from "react-konva";
import { RowClueView } from "./RowClueView";

/**
 * @param {{
 * 		clues: number[][];
 * 		fontSize: number;
 * 		fill: string;
 * 		top: number;
 * 		left: number;
 * 		cellSize: number;
 * 		cluesWidth: number;
 * }} props
 * @returns {JSX.Element}
 */
export function RowCluesView({
  clues,
  fontSize,
  fill,
  top,
  left,
  cellSize,
  cluesWidth,
}) {
  return (
    <Group>
      {clues.map((clue, index) => (
        <RowClueView
          key={index}
          clue={clue}
          fontSize={fontSize}
          fill={fill}
          top={top + cellSize * index}
          right={left + cluesWidth}
          width={cluesWidth}
          height={cellSize}
        />
      ))}
    </Group>
  );
}
