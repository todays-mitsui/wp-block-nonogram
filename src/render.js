/**
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {(canvas: HTMLCanvasElement, width: number, height: number) => void}
 */
export function createRender(numRows, numColumns) {
  const text = `numRows: ${numRows}, numColumns: ${numColumns}`;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  return (canvas) => {
    const ctx = canvas.getContext('2d');

    if (!ctx) { return; }

    const { paddingLeft, paddingTop, gridWidth, gridHeight } = calcLayout(canvas.width, canvas.height, numRows, numColumns);

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#ccc';
    ctx.strokeRect(paddingLeft, paddingTop, CLUES_WIDTH + gridWidth, CLUES_HEIGHT + gridHeight);

    ctx.fillStyle = '#cdc';
    ctx.fillRect(paddingLeft + CLUES_WIDTH + 1, paddingTop + 1, gridWidth - 2, CLUES_HEIGHT);

    ctx.fillStyle = '#bcd';
    ctx.fillRect(paddingLeft + 1, paddingTop + CLUES_HEIGHT + 1, CLUES_WIDTH, gridHeight - 2);

    ctx.fillStyle = '#ddd';
    ctx.fillRect(paddingLeft + CLUES_WIDTH + 1, paddingTop + CLUES_HEIGHT + 1, gridWidth - 2, gridHeight - 2);

    ctx.fillStyle = "red";
    ctx.font = "20px serif";
    ctx.fillText(text, 10, 50);
  }
}

const MIN_PADDING = 20;
const CLUES_WIDTH = 100;
const CLUES_HEIGHT = 100;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ paddingLeft: number; paddingTop: number; gridWidth: number; gridHeight: number; }}
 */
function calcLayout(canvasWidth, canvasHeight, numRows, numColumns) {
  const { gridWidth, gridHeight } = calcGridSize(canvasWidth, canvasHeight, numRows, numColumns);

  const boardWidth = gridWidth + CLUES_WIDTH;
  const paddingLeft = (canvasWidth - boardWidth) / 2;

  const boardHeight = gridHeight + CLUES_HEIGHT;
  const paddingTop = (canvasHeight - boardHeight) / 2;

  return { paddingLeft, paddingTop, gridWidth, gridHeight };
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ cellSize: number; gridWidth: number; gridHeight: number; }}
 */
function calcGridSize(canvasWidth, canvasHeight, numRows, numColumns) {
  const cellSize = Math.min(
    (canvasWidth - CLUES_WIDTH - 2 * MIN_PADDING) / numColumns,
    (canvasHeight - CLUES_HEIGHT - 2 * MIN_PADDING) / numRows,
  );

  return {
    cellSize,
    gridWidth: cellSize * numColumns,
    gridHeight: cellSize * numRows,
  };
}
