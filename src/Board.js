const { Grid } = require('./Grid.js');

class Board {
  constructor(numColumns, numRows) {
    if (!Number.isInteger(numColumns) || !Number.isInteger(numRows)) {
      throw new Error('numColumns and numRows must be integers');
    }

    if (numColumns < 0 || numRows < 0) {
      throw new Error('Out of bounds');
    }

    this._numColumns = numColumns;
    this._numRows = numRows;
    this._grid = new Grid(numColumns, numRows);
  }

  /**
   * @returns {number}
   */
  get numRows() {
    return this._numRows;
  }

  /**
   * @returns {number}
   */
  get numColumns() {
    return this._numColumns;
  }

  /**
   * @returns {number}
   */
  get width() {
    console.warn('get width is deprecated');
    console.trace();
    return this._numColumns;
  }

  set width(_value) {
    throw new Error('Cannot set width');
  }

  /**
   * @returns {number}
   */
  get height() {
    console.warn('get height is deprecated');
    console.trace();
    return this._numRows;
  }

  set height(_value) {
    throw new Error('Cannot set height');
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  fill(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error('x and y must be integers');
    }

    if (x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows) {
      throw new Error('Out of bounds');
    }

    this._grid.set(x, y, true);

    return this;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  clear(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error('x and y must be integers');
    }

    if (x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows) {
      throw new Error('Out of bounds');
    }

    this._grid.set(x, y, false);

    return this;
  }

  /**
   * @returns {Generator<{ id: string; x: number; y: number; filled: boolean; }>}
   */
  * cells() {
    for (let y = 0; y < this._numRows; y++) {
      for (let x = 0; x < this._numColumns; x++) {
        const id = `(${x},${y})`;
        const filled = this._grid.get(x, y);
        yield { id, x, y, filled };
      }
    }
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  * rows() {
    for (let y = 0; y < this._numRows; y++) {
      yield this._grid.getRow(y).slice(0, this._numColumns);
    }
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  * columns() {
    for (let x = 0; x < this._numColumns; x++) {
      yield this._grid.getColumn(x).slice(0, this._numRows);
    }
  }

  /**
   * @returns {Generator<number[]>}
   */
  * rowClues() {
    for (const row of this.rows()) {
      yield Board._calcClue(row);
    }
  }

  /**
   * @returns {Generator<number[]>}
   */
  * columnClues() {
    for (const column of this.columns()) {
      yield Board._calcClue(column);
    }
  }

  /**
   * @param {boolean[]} cells
   * @returns {number[]}
   */
  static _calcClue(cells) {
    const clue = [];

    let count = 0;
    for (const cell of cells) {
      if (cell) {
        count++;
      } else if (count > 0) {
        clue.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      clue.push(count);
    }

    return clue.length === 0 ? [0] : clue;
  }

  /**
   * @param {number} numColumns
   * @param {number} numRows
   * @returns {this}
   */
  resize(numColumns, numRows) {
    if (!Number.isInteger(numColumns) || !Number.isInteger(numRows)) {
      throw new Error('numColumns and numRows must be integers');
    }

    if (numColumns < 0 || numRows < 0) {
      throw new Error('Out of bounds');
    }

    this._numColumns = numColumns;
    this._numRows = numRows;
    this._grid.resize(numColumns, numRows);

    return this;
  }

  /**
   * @returns {string}
   */
  serialize() {
    return `${this._numColumns}x${this._numRows};${this._grid.serialize()}`;
  }

  /**
   * @param {string} str
   * @returns {Board}
   */
  static deserialize(str) {
    const matches = str.match(/^(\d+x\d+);(.+)$/);

    if (matches == null) {
      throw new Error('Invalid format');
    }

    const size = matches[1];
    const data = matches[2];
    const [numColumns, numRows] = size.split('x').map(Number);

    if (numColumns < 0 || numRows < 0) {
      throw new Error('Out of bounds');
    }

    const board = new Board(numColumns, numRows);

    const grid = Grid.deserialize(data);
    board._grid = grid;

    return board;
  }
}
exports.Board = Board;
