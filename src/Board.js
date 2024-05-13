const { Grid } = require('./Grid.js');

class Board {
  constructor(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error('width and height must be integers');
    }

    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }

    this._width = width;
    this._height = height;
    this._grid = new Grid(width, height);
  }

  /**
   * @returns {number}
   */
  get width() {
    return this._width;
  }

  set width(_value) {
    throw new Error('Cannot set width');
  }

  /**
   * @returns {number}
   */
  get height() {
    return this._height;
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

    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
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

    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      throw new Error('Out of bounds');
    }

    this._grid.set(x, y, false);

    return this;
  }

  /**
   * @returns {Generator<{ id: string; x: number; y: number; filled: boolean; }>}
   */
  * cells() {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
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
    for (const row of this._grid.rows()) {
      yield row.slice(0, this._width);
    }
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  * columns() {
    for (let x = 0; x < this._width; x++) {
      yield this._grid.getColumn(x).slice(0, this._height);
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
   * @param {number} width
   * @param {number} height
   * @returns {this}
   */
  resize(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error('width and height must be integers');
    }

    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }

    this._width = width;
    this._height = height;
    this._grid.expand(width, height);

    return this;
  }

  /**
   * @returns {string}
   */
  serialize() {
    return `${this._width}x${this._height};${this._grid.serialize()}`;
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
    const [width, height] = size.split('x').map(Number);

    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }

    const board = new Board(width, height);

    const grid = Grid.deserialize(data);
    board._grid = grid;

    return board;
  }
}
exports.Board = Board;
