import { Group, Text } from "react-konva";
import { HORIZONTAL_PADDING_RATIO } from '../lib/calcLayout';

/**
 * @param {{
 * 		clue: number[];
 * 		fontSize: number;
 * 		fill: string;
 * 		top: number;
 * 		right: number;
 * 		height: number;
 * }} props
 * @returns {JSX.Element}
 */
export function RowClueView({
  clue,
  fontSize,
  fill,
  top,
  right,
  height,
}) {
  const texts = clue.map((num) => num.toString()).reverse();
  const unitSize = (1 + 2 * HORIZONTAL_PADDING_RATIO) * fontSize ;

  return (
    <Group>
      {texts.map((text, index) => (
        <Text
          key={index}
          text={text}
          fontSize={fontSize}
          fill={fill}
          x={right - (index + 1) * unitSize}
          y={top}
          width={Math.min(height, unitSize)}
          height={height}
          align="center"
          verticalAlign="middle"
          wrap="none"
        />
      ))}
    </Group>
  );
}
