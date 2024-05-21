const MIN_PADDING = 8;
const MAX_FONT_SIZE = 20;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} maxNumRowClues
 * @param {number} maxNumColumnClues
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{
 *  offsetLeft: number;
 *  offsetTop: number;
 *  cluesFontSize: number;
 *  cluesWidth: number;
 *  cluesHeight: number;
 *  cellSize: number;
 * }}
 */
export function calcLayout(
  canvasWidth,
  canvasHeight,
  maxNumRowClues,
  maxNumColumnClues,
  numRows,
  numColumns,
) {
  const {
    cluesFontSize,
    cluesWidth,
    cluesHeight,
    cellSize,
  } = calcCellSize(canvasWidth, canvasHeight, [maxNumRowClues, numColumns], [
    maxNumColumnClues,
    numRows,
  ]);

  const boardWidth = cluesWidth + numColumns * cellSize;
  const offsetLeft = (canvasWidth - boardWidth) / 2;

  const boardHeight = cluesHeight + numRows * cellSize;
  const offsetTop = (canvasHeight - boardHeight) / 2;

  return {
    offsetLeft,
    offsetTop,
    cluesFontSize,
    cluesWidth,
    cluesHeight,
    cellSize,
  };
}

const FONT_SIZE_RATIO = 0.45; // fontSize / cellSize
export const HORIZONTAL_PADDING_RATIO = 0.15; // padding / fontSize
export const VERTICAL_PADDING_RATIO = 0.25; // padding / fontSize

const ROW_CLUE_CELL_ASPECT_RATIO = (1 + 2 * HORIZONTAL_PADDING_RATIO) *
  FONT_SIZE_RATIO;
const COLUMN_CLUE_CELL_ASPECT_RATIO = (1 + 2 * VERTICAL_PADDING_RATIO) *
  FONT_SIZE_RATIO;

const MAX_CLUE_CELL_WIDTH = (1 + 2 * HORIZONTAL_PADDING_RATIO) * MAX_FONT_SIZE;
const MAX_CLUE_CELL_HEIGHT = (1 + 2 * VERTICAL_PADDING_RATIO) * MAX_FONT_SIZE;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {[number, number]} numHorizontalCells
 * @param {[number, number]} numVerticalCells
 */
function calcCellSize(
  canvasWidth,
  canvasHeight,
  numHorizontalCells,
  numVerticalCells,
) {
  {
    // まず ROW_CLUE_CELL_ASPECT_RATIO, COLUMN_CLUE_CELL_ASPECT_RATIO を用いて cellSize を計算する
    // このロジックだと fontSize = cellSize * FONT_SIZE_RATIO が MAX_FONT_SIZE を超えることがある
    // MAX_FONT_SIZE を超えるとは、fontSize が大きすぎるということであり cluesWidth, cluesHeight が大きすぎるということ
    // 逆に、cluesWidth, cluesHeight をもっと小さくできる余地がある
    const boardWidth = canvasWidth - 2 * MIN_PADDING;
    const boardHeight = canvasHeight - 2 * MIN_PADDING;
    const cellSize = Math.min(
      boardWidth /
        (numHorizontalCells[0] * ROW_CLUE_CELL_ASPECT_RATIO +
          numHorizontalCells[1]),
      boardHeight /
        (numVerticalCells[0] * COLUMN_CLUE_CELL_ASPECT_RATIO +
          numVerticalCells[1]),
    );
    const fontSize = cellSize * FONT_SIZE_RATIO;

    if (fontSize <= MAX_FONT_SIZE) {
      return {
        cluesFontSize: fontSize,
        cluesWidth: ROW_CLUE_CELL_ASPECT_RATIO * cellSize *
          numHorizontalCells[0],
        cluesHeight: COLUMN_CLUE_CELL_ASPECT_RATIO * cellSize *
          numVerticalCells[0],
        cellSize,
      };
    }
  }

  {
    // というわけで前段のロジックで算出した fontSize が大きすぎる場合には、ここから先のロジックで計算し直す
    // fontSize は MAX_FONT_SIZE で確定できる
    // FONT_SIZE_RATIO, HORIZONTAL_PADDING_RATIO, VERTICAL_PADDING_RATIO から cellSize を逆算する
    const gridWidth = canvasWidth -
      MAX_CLUE_CELL_WIDTH * numHorizontalCells[0] - 2 * MIN_PADDING;
    const gridHeight = canvasHeight -
      MAX_CLUE_CELL_HEIGHT * numVerticalCells[0] - 2 * MIN_PADDING;
    const cellSize = Math.min(
      gridWidth / numHorizontalCells[1],
      gridHeight / numVerticalCells[1],
    );

    return {
      cluesFontSize: MAX_FONT_SIZE,
      cluesWidth: MAX_CLUE_CELL_WIDTH * numHorizontalCells[0],
      cluesHeight: MAX_CLUE_CELL_HEIGHT * numVerticalCells[0],
      cellSize,
    };
  }
}
