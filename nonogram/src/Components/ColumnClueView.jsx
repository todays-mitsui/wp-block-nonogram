import { Group, Text } from "react-konva";

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

  return (
    <Group>
      {texts.map((text, index) => (
        <Text
          key={index}
          text={text}
          fontSize={fontSize}
          fill={fill}
          x={left}
          y={bottom - (index * 1.5 + 1.5) * fontSize}
          width={width}
          align="center"
        />
      ))}
    </Group>
  );
}
