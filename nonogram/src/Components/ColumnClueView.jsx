import { Group, Text } from "react-konva";
import { VERTICAL_PADDING_RATIO } from "../lib/calcLayout";

/**
 * @param {{
 * 		clue: number[];
 * 		fontSize: number;
 * 		fill: string;
 * 		left: number;
 * 		bottom: number;
 * 		width: number;
 * }} props
 * @returns {JSX.Element}
 */
export function ColumnClueView({
  clue,
  fontSize,
  fill,
  left,
  bottom,
  width,
}) {
  const texts = clue.map((num) => num.toString()).reverse();
  const unitSize = (1 + 2 * VERTICAL_PADDING_RATIO) * fontSize;

  return (
    <Group>
      {texts.map((text, index) => (
        <Text
          key={index}
          text={text}
          fontSize={fontSize}
          fill={fill}
          x={left}
          y={bottom - (index + 1) * unitSize}
          width={width}
          height={Math.min(width, unitSize)}
          align="center"
          verticalAlign="middle"
          wrap="none"
        />
      ))}
    </Group>
  );
}
