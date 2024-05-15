import { Text } from "react-konva";

/**
 * @param {{
 * 		clue: number[];
 * 		fontSize: number;
 * 		fill: string;
 * 		top: number;
 * 		left: number;
 * 		height: number;
 * 		width: number;
 * }} props
 * @returns {JSX.Element}
 */
export function RowClueView({
  clue,
  fontSize,
  fill,
  top,
  left,
  height,
  width,
}) {
  const text = clue.map((num) => num.toString()).join("  ");

  return (
    <Text
      text={text}
      fontSize={fontSize}
      fill={fill}
      x={left}
      y={top}
      width={width - fontSize * 0.5}
      height={height}
      align="right"
      verticalAlign="middle"
    />
  );
}
