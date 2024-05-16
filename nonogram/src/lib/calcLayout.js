const MIN_PADDING = 8;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} cluesWidth
 * @param {number} cluesHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ offsetLeft: number; offsetTop: number; cellSize: number; }}
 */
export function calcLayout(
  canvasWidth,
  canvasHeight,
  cluesWidth,
  cluesHeight,
  numRows,
  numColumns,
) {
  const cellSize = calcCellSize(
    canvasWidth,
    canvasHeight,
    cluesWidth,
    cluesHeight,
    numRows,
    numColumns,
  );

  const gridWidth = cellSize * numColumns + 1;
  const boardWidth = cluesWidth + gridWidth;
  const offsetLeft = (canvasWidth - boardWidth) / 2;

  const gridHeight = cellSize * numRows + 1;
  const boardHeight = cluesHeight + gridHeight;
  const offsetTop = (canvasHeight - boardHeight) / 2;

  return { offsetLeft, offsetTop, cellSize };
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ cellSize: number; gridWidth: number; gridHeight: number; }}
 */
function calcCellSize(
  canvasWidth,
  canvasHeight,
  cluesWidth,
  cluesHeight,
  numRows,
  numColumns,
) {
  const gridWidth = canvasWidth - cluesWidth - 2 * MIN_PADDING;
  const gridHeight = canvasHeight - cluesHeight - 2 * MIN_PADDING;

  const cellSize = Math.min(
    (gridWidth - 1) / numColumns,
    (gridHeight - 1) / numRows,
  );

  return cellSize;
}
