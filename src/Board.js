const { Grid } = require("./Grid.js");

class Board {
  constructor(numColumns, numRows) {
    if (!Number.isInteger(numColumns) || !Number.isInteger(numRows)) {
      throw new Error("numColumns and numRows must be integers");
    }

    if (numColumns < 0 || numRows < 0) {
      throw new Error("Out of bounds");
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

  set numRows(_value) {
    throw new Error("Cannot set numRows");
  }

  /**
   * @returns {number}
   */
  get numColumns() {
    return this._numColumns;
  }

  set numColumns(_value) {
    throw new Error("Cannot set numColumns");
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {'unknown' | 'space' | 'filled'} nextStatus
   * @returns {this}
   */
  changeStatus(x, y, nextStatus) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("x and y must be integers");
    }

    if (x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows) {
      throw new Error("Out of bounds");
    }

    this._grid.set(x, y, nextStatus);

    return this;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  fill(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("x and y must be integers");
    }

    if (x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows) {
      throw new Error("Out of bounds");
    }

    this._grid.set(x, y, "filled");

    return this;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  clear(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("x and y must be integers");
    }

    if (x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows) {
      throw new Error("Out of bounds");
    }

    this._grid.set(x, y, "unknown");

    return this;
  }

  /**
   * @returns {Generator<{ id: string; x: number; y: number; status: 'unknown' | 'space' | 'filled'; }>}
   */
  *cells() {
    for (let y = 0; y < this._numRows; y++) {
      for (let x = 0; x < this._numColumns; x++) {
        const id = `(${x},${y})`;
        const status = this._grid.get(x, y);
        yield { id, x, y, status };
      }
    }
  }

  /**
   * @returns {Generator<('unknown' | 'space' | 'filled')[]>}
   */
  *rows() {
    for (let y = 0; y < this._numRows; y++) {
      yield this._grid.getRow(y).slice(0, this._numColumns);
    }
  }

  /**
   * @returns {Generator<('unknown' | 'space' | 'filled')[]>}
   */
  *columns() {
    for (let x = 0; x < this._numColumns; x++) {
      yield this._grid.getColumn(x).slice(0, this._numRows);
    }
  }

  /**
   * @returns {Generator<number[]>}
   */
  *rowClues() {
    for (const row of this.rows()) {
      yield Board._calcClue(row);
    }
  }

  /**
   * @returns {Generator<number[]>}
   */
  *columnClues() {
    for (const column of this.columns()) {
      yield Board._calcClue(column);
    }
  }

  /**
   * @param {('unknown' | 'space' | 'filled')[]} cells
   * @returns {number[]}
   */
  static _calcClue(cells) {
    const clue = [];

    let count = 0;
    for (const status of cells) {
      if (status === "filled") {
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
      throw new Error("numColumns and numRows must be integers");
    }

    if (numColumns < 0 || numRows < 0) {
      throw new Error("Out of bounds");
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
    return `v1;${this._numColumns}x${this._numRows};${this._grid.serialize()}`;
  }

  /**
   * @param {string} str
   * @returns {Board}
   */
  static deserialize(str) {
    const matches = str.match(/^v1;(\d+x\d+);(.+)$/);

    if (matches == null) {
      throw new Error("Invalid format");
    }

    const size = matches[1];
    const data = matches[2];
    const [numColumns, numRows] = size.split("x").map(Number);

    if (numColumns < 0 || numRows < 0) {
      throw new Error("Out of bounds");
    }

    const board = new Board(numColumns, numRows);

    const grid = Grid.deserialize(data);
    board._grid = grid;

    return board;
  }
}
exports.Board = Board;
