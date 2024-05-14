const { bitsToString, stringToBits } = require('./util.js');

export class Grid {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error('width and height must be integers');
    }

    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }

    this._width = width;
    this._height = height;
    this._cells = new Uint8ClampedArray(width * height);
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
  get(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error('x and y must be integers');
    }

    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      throw new Error('Out of bounds');
    }

    return !!this._cells[y * this._width + x];
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {boolean} active
   * @returns {this}
   */
  set(x, y, active) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error('x and y must be integers');
    }

    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      throw new Error('Out of bounds');
    }

    this._cells[y * this._width + x] = active ? 1 : 0;
    return this;
  }

  /**
   * @param {number} y
   * @returns {boolean[]}
   */
  getRow(y) {
    if (!Number.isInteger(y)) {
      throw new Error('y must be an integer');
    }

    if (y < 0 || y >= this._height) {
      throw new Error('Out of bounds');
    }

    return Array.from(this._cells.subarray(y * this._width, (y + 1) * this._width)).map(Boolean);
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  * rows() {
    for (let y = 0; y < this._height; y++) {
      yield this.getRow(y);
    }
  }

  /**
   * @param {number} x
   * @returns {boolean[]}
   */
  getColumn(x) {
    if (!Number.isInteger(x)) {
      throw new Error('x must be an integer');
    }

    if (x < 0 || x >= this._width) {
      throw new Error('Out of bounds');
    }

    const column = [];

    for (let y = 0; y < this._height; y++) {
      column.push(this.get(x, y));
    }

    return column;
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  * columns() {
    for (let x = 0; x < this._width; x++) {
      yield this.getColumn(x);
    }
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

    if (width < this._width) {
      this._shrinkHorizontally(width);
    } else if (width > this._width) {
      this._expandHorizontally(width);
    }

    if (height < this._height) {
      this._shrinkVertically(height);
    } else if (height > this._height) {
      this._expandVertically(height);
    }

    return this;
  }

  /**
   * @param {number} width
   * @returns {this}
   */
  _expandHorizontally(width) {
    const newCells = new Uint8ClampedArray(width * this._height);

    for (let y = 0; y < this._height; y++) {
      newCells.set(
        this._cells.subarray(y * this._width, (y + 1) * this._width),
        y * width
      );
    }

    this._width = width;
    this._cells = newCells;

    return this;
  }

  /**
   * @param {number} width
   * @returns {this}
   */
  _shrinkHorizontally(width) {
    const filledIndexes = [...this.rows()]
      .flatMap((row) => {
        return row
          .map((filled, index) => filled ? index : null)
          .filter((index) => index != null);
      });
    const maxFilledIndex = Math.max(...filledIndexes);

    const newWidth = Math.max(width, maxFilledIndex + 1);

    if (newWidth === this._width) { return this; }

    const newCells = new Uint8ClampedArray(newWidth * this._height);
    for (let y = 0; y < this._height; y++) {
      newCells.set(
        this._cells.subarray(y * this._width, y * this._width + newWidth),
        y * newWidth
      );
    }

    this._width = width;
    this._cells = newCells;

    return this;
  }

  /**
   * @param {number} height
   * @returns {this}
   */
  _expandVertically(height) {
    const newCells = new Uint8ClampedArray(this._width * height);

    newCells.set(this._cells);

    this._height = height;
    this._cells = newCells;

    return this;
  }

  /**
   * @param {number} height
   * @returns {this}
   */
  _shrinkVertically(height) {
    const maxFilledIndex = [...this.rows()].findLastIndex((row) => row.some(Boolean))

    const newHeight = Math.max(height, maxFilledIndex + 1);

    if (newHeight === this._height) { return this; }

    this._height = newHeight;
    this._cells = this._cells.slice(0, this._width * newHeight);

    return this;
  }

  /**
   * @returns {string}
   */
  serialize() {
    return `${this._width}x${this._height};${bitsToString(this._cells.map(Boolean))}`;
  }

  /**
   * @param {string} str
   * @returns {Grid}
   */
  static deserialize(str) {
    const [size, data] = str.split(';');
    const [width, height] = size.split('x').map(Number);

    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }

    const grid = new Grid(width, height);

    const cells = stringToBits(data).slice(0, width * height).map(Number);
    grid._cells = new Uint8ClampedArray(cells);

    return grid;
  }
}
