import { Group, Text } from "react-konva";
import { VERTICAL_PADDING_RATIO } from "../lib/calcLayout";

/**
 * @param {{
 *  clue: number[];
 *  completion: boolean | null;
 *  fontSize: number;
 *  left: number;
 *  bottom: number;
 *  width: number;
 * }} props
 * @returns {JSX.Element}
 */
export function ColumnClueView({
  clue,
  completion,
  fontSize,
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
          fill={completion ? "#bbb" : "black"}
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
