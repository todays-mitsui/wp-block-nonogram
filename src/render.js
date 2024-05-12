/**
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {(canvas: HTMLCanvasElement, width: number, height: number) => void}
 */
function createRender(numRows, numColumns) {
  const text = `numRows: ${numRows}, numColumns: ${numColumns}`;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  return (canvas) => {
    const ctx = canvas.getContext('2d');

    if (!ctx) { return; }

    const { paddingLeft, paddingTop, gridWidth, gridHeight, cellSize } = calcLayout(canvas.width, canvas.height, numRows, numColumns);

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#eee';
    ctx.fillRect(paddingLeft + CLUES_WIDTH, paddingTop, gridWidth, CLUES_HEIGHT);
    ctx.fillRect(paddingLeft, paddingTop + CLUES_HEIGHT, CLUES_WIDTH, gridHeight);

    for (let i = 0; i <= numRows; i++) {
      ctx.beginPath();
      ctx.strokeStyle = i % 5 === 0 || i === numRows ? '#333' : '#aaa';

      const y = paddingTop + CLUES_HEIGHT + i * cellSize;
      const xStart = paddingLeft;
      const xEnd = paddingLeft + CLUES_WIDTH + gridWidth;
      ctx.moveTo(xStart, y);
      ctx.lineTo(xEnd, y);

      ctx.stroke();
    }
    for (let i = 0; i <= numColumns; i++) {
      ctx.beginPath();
      ctx.strokeStyle = i % 5 === 0 || i === numColumns ? '#333' : '#aaa';

      const x = paddingLeft + CLUES_WIDTH + i * cellSize;
      const yStart = paddingTop;
      const yEnd = paddingTop + CLUES_HEIGHT + gridHeight;
      ctx.moveTo(x, yStart);
      ctx.lineTo(x, yEnd);

      ctx.stroke();
    }

    ctx.fillStyle = "red";
    ctx.font = "20px serif";
    ctx.fillText(text, 10, 50);
  }
}
exports.createRender = createRender;

const MIN_PADDING = 8;
const CLUES_WIDTH = 100;
const CLUES_HEIGHT = 100;

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ paddingLeft: number; paddingTop: number; gridWidth: number; gridHeight: number; cellSize: number; }}
 */
function calcLayout(canvasWidth, canvasHeight, numRows, numColumns) {
  const { cellSize, gridWidth, gridHeight } = calcGridSize(canvasWidth, canvasHeight, numRows, numColumns);

  const boardWidth = gridWidth + CLUES_WIDTH;
  const paddingLeft = (canvasWidth - boardWidth) / 2;

  const boardHeight = gridHeight + CLUES_HEIGHT;
  const paddingTop = (canvasHeight - boardHeight) / 2;

  return { paddingLeft, paddingTop, gridWidth, gridHeight, cellSize };
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} numRows
 * @param {number} numColumns
 * @returns {{ cellSize: number; gridWidth: number; gridHeight: number; }}
 */
function calcGridSize(canvasWidth, canvasHeight, numRows, numColumns) {
  const gridWidth = canvasWidth - CLUES_WIDTH - 2 * MIN_PADDING;
  const gridHeight = canvasHeight - CLUES_HEIGHT - 2 * MIN_PADDING;

  const cellSize = Math.min(
    (gridWidth - 1) / numColumns,
    (gridHeight - 1) / numRows,
  );

  return {
    cellSize,
    gridWidth: cellSize * numColumns + 1,
    gridHeight: cellSize * numRows + 1,
  };
}
