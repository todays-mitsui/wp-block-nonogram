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
 *  cluesWidth: number;
 *  cluesHeight: number;
 *  cellSize: number;
 * }}
 */
export function calcLayout(
  canvasWidth,
  canvasHeight,
  // cluesWidth,
  // cluesHeight,
  maxNumRowClues,
  maxNumColumnClues,
  numRows,
  numColumns,
) {
  // const cellSize = calcCellSize(
  //   canvasWidth,
  //   canvasHeight,
  //   cluesWidth,
  //   cluesHeight,
  //   numRows,
  //   numColumns,
  // );

  const cellSize = calcCellSize(
    canvasWidth,
    canvasHeight,
    maxNumRowClues,
    maxNumColumnClues,
    numRows,
    numColumns,
  )

  const gridWidth = cellSize * numColumns + 1;
  const cluesWidth = Math.min(cellSize, 2 * MAX_FONT_SIZE) * maxNumRowClues;
  const boardWidth = cluesWidth + gridWidth;
  const offsetLeft = (canvasWidth - boardWidth) / 2;

  const gridHeight = cellSize * numRows + 1;
  const cluesHeight = Math.min(cellSize, 2 * MAX_FONT_SIZE) * maxNumColumnClues;
  const boardHeight = cluesHeight + gridHeight;
  const offsetTop = (canvasHeight - boardHeight) / 2;

  return { offsetLeft, offsetTop, cluesWidth, cluesHeight, cellSize };
}

// /**
//  * @param {number} canvasWidth
//  * @param {number} canvasHeight
//  * @param {number} numRows
//  * @param {number} numColumns
//  * @returns {{ cellSize: number; gridWidth: number; gridHeight: number; }}
//  */
// function calcCellSize(
//   canvasWidth,
//   canvasHeight,
//   cluesWidth,
//   cluesHeight,
//   numRows,
//   numColumns,
// ) {
//   const gridWidth = canvasWidth - cluesWidth - 2 * MIN_PADDING;
//   const gridHeight = canvasHeight - cluesHeight - 2 * MIN_PADDING;

//   const cellSize = Math.min(
//     (gridWidth - 1) / numColumns,
//     (gridHeight - 1) / numRows,
//   );

//   return cellSize;
// }

function calcCellSize(
  canvasWidth,
  canvasHeight,
  maxNumRowClues,
  maxNumColumnClues,
  numRows,
  numColumns,
) {
  const cellSize = Math.min(
    (canvasWidth - 2 * MIN_PADDING - 1) / (maxNumRowClues + numColumns),
    (canvasHeight - 2 * MIN_PADDING - 1) / (maxNumColumnClues + numRows),
  );

  if (cellSize <= 2 * MAX_FONT_SIZE) {
    return cellSize;
  }

  const gridWidth = canvasWidth - 2 * MAX_FONT_SIZE * maxNumRowClues - 2 * MIN_PADDING;
  const gridHeight = canvasHeight - 2 * MAX_FONT_SIZE * maxNumColumnClues - 2 * MIN_PADDING;

  return Math.min(
    (gridWidth - 1) / numColumns,
    (gridHeight - 1) / numRows,
  );
}
