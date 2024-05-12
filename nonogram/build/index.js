/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controls/BoardSize.jsx":
/*!************************************!*\
  !*** ./src/Controls/BoardSize.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoardSize: () => (/* binding */ BoardSize)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/Board */ "../src/Board.js");




/**
 * @param {{
 * 		board: Board;
 * 		numRows: number;
 * 		numColumns: number;
 * 		setAttributes: (newParam: { boardData: string }) => void;
 * }} param
 * @returns
 */
function BoardSize({
  board,
  numRows,
  numColumns,
  setAttributes
}) {
  const setNumRows = numRowsStr => {
    const numRows = parseInt(numRowsStr, 10);
    if (numRows > 0) {
      board.resize(numColumns, numRows);
      setAttributes({
        boardData: board.serialize()
      });
    }
  };
  const setNumColumns = numColumnsStr => {
    const numColumns = parseInt(numColumnsStr, 10);
    if (numColumns > 0) {
      board.resize(numColumns, numRows);
      setAttributes({
        boardData: board.serialize()
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "\u76E4\u9762\u306E\u30B5\u30A4\u30BA",
    initialOpen: "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, "\u884C\u6570"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    onChange: setNumRows,
    shiftStep: 5,
    value: numRows,
    min: 1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, "\u5217\u6570"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    onChange: setNumColumns,
    shiftStep: 5,
    value: numColumns,
    min: 1
  })));
}

/***/ }),

/***/ "./src/edit.jsx":
/*!**********************!*\
  !*** ./src/edit.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controls_BoardSize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controls/BoardSize */ "./src/Controls/BoardSize.jsx");
/* harmony import */ var _src_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/render */ "../src/render.js");
/* harmony import */ var _src_Board__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/Board */ "../src/Board.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");










/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes
}) {
  /** @type {{ boardData: string }} */
  const {
    boardData
  } = attributes;
  console.info({
    boardData
  });
  const board = boardData == null ? new _src_Board__WEBPACK_IMPORTED_MODULE_6__.Board(15, 15) : _src_Board__WEBPACK_IMPORTED_MODULE_6__.Board.deserialize(boardData);
  const blockRootRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const canvasRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const blockRoot = blockRootRef.current;
    const canvas = canvasRef.current;
    const render = (0,_src_render__WEBPACK_IMPORTED_MODULE_5__.createRender)(board.width, board.height);
    const resizerCleanup = initResizer(blockRoot, canvas, render);
    return () => {
      resizerCleanup();
    };
  }, [boardData]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: blockRootRef
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Controls_BoardSize__WEBPACK_IMPORTED_MODULE_4__.BoardSize, {
    board: board,
    numRows: board.height,
    numColumns: board.width,
    setAttributes: setAttributes
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("canvas", {
    width: 10,
    height: 10,
    ref: canvasRef
  })));
}
const ASPECT_RATIO = 2 / 3;

/**
 * @param {HTMLDivElement} blockRoot
 * @param {HTMLCanvasElement} canvas
 * @param {(canvas: HTMLCanvasElement) => void} render
 */
function initResizer(blockRoot, canvas, render) {
  const observer = new ResizeObserver(entries => {
    const newWidth = entries[0]?.contentRect?.width;
    if (newWidth == null) {
      return;
    }
    const [width, height] = [newWidth, newWidth * ASPECT_RATIO];
    canvas.width = width;
    canvas.height = height;
    render(canvas);
  });
  observer.observe(blockRoot);
  return () => observer.unobserve(blockRoot);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.jsx");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
function save() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, 'Nonogram – hello from the saved content!');
}

/***/ }),

/***/ "../src/Board.js":
/*!***********************!*\
  !*** ../src/Board.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const {
  Grid
} = __webpack_require__(/*! ./Grid.js */ "../src/Grid.js");
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
   * @returns {Generator<{ x: number; y: number; filled: boolean; }>}
   */
  *cells() {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const filled = this._grid.get(x, y);
        yield {
          x,
          y,
          filled
        };
      }
    }
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  *rows() {
    for (const row of this._grid.rows()) {
      yield row.slice(0, this._width);
    }
  }

  /**
   * @returns {Generator<boolean[]>}
   */
  *columns() {
    for (const column of this._grid.columns()) {
      yield column.slice(0, this._height);
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
    return clue;
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

/***/ }),

/***/ "../src/Grid.js":
/*!**********************!*\
  !*** ../src/Grid.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Grid)
/* harmony export */ });
const {
  bitsToString,
  stringToBits
} = __webpack_require__(/*! ./util.js */ "../src/util.js");
class Grid {
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
  *rows() {
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
  *columns() {
    for (let x = 0; x < this._width; x++) {
      yield this.getColumn(x);
    }
  }

  /**
   * @param {number} width
   * @param {number} height
   * @returns {this}
   */
  expand(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error('width and height must be integers');
    }
    if (width < 0 || height < 0) {
      throw new Error('Out of bounds');
    }
    if (width > this._width) {
      this._expandHorizontally(width);
    }
    if (height > this._height) {
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
      newCells.set(this._cells.subarray(y * this._width, (y + 1) * this._width), y * width);
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

/***/ }),

/***/ "../src/render.js":
/*!************************!*\
  !*** ../src/render.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

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
  return canvas => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const {
      paddingLeft,
      paddingTop,
      gridWidth,
      gridHeight,
      cellSize
    } = calcLayout(canvas.width, canvas.height, numRows, numColumns);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  };
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
  const {
    cellSize,
    gridWidth,
    gridHeight
  } = calcGridSize(canvasWidth, canvasHeight, numRows, numColumns);
  const boardWidth = gridWidth + CLUES_WIDTH;
  const paddingLeft = (canvasWidth - boardWidth) / 2;
  const boardHeight = gridHeight + CLUES_HEIGHT;
  const paddingTop = (canvasHeight - boardHeight) / 2;
  return {
    paddingLeft,
    paddingTop,
    gridWidth,
    gridHeight,
    cellSize
  };
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
  const cellSize = Math.min((gridWidth - 1) / numColumns, (gridHeight - 1) / numRows);
  return {
    cellSize,
    gridWidth: cellSize * numColumns + 1,
    gridHeight: cellSize * numRows + 1
  };
}

/***/ }),

/***/ "../src/util.js":
/*!**********************!*\
  !*** ../src/util.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

const BASE64_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * @param {boolean[]} bits
 * @returns {string}
 */
function bitsToString(bits) {
  let str = '';
  for (const b6 of chunks(bits, 6)) {
    const index = (b6[0] ? 0b100000 : 0b000000) + (b6[1] ? 0b010000 : 0b000000) + (b6[2] ? 0b001000 : 0b000000) + (b6[3] ? 0b000100 : 0b000000) + (b6[4] ? 0b000010 : 0b000000) + (b6[5] ? 0b000001 : 0b000000);
    str += BASE64_CHARACTERS.charAt(index);
  }
  return str;
}
exports.bitsToString = bitsToString;

/**
 * @param {string} str
 * @returns {boolean[]}
 */
function stringToBits(str) {
  const charToIndex = new Map();
  BASE64_CHARACTERS.split("").forEach((c, i) => charToIndex.set(c, i));
  const bits = str.split("").flatMap(c => {
    const index = charToIndex.get(c);
    if (index == null) {
      throw new Error("Invalid character");
    }
    return [!!(index & 0b100000), !!(index & 0b010000), !!(index & 0b001000), !!(index & 0b000100), !!(index & 0b000010), !!(index & 0b000001)];
  });
  return bits;
}
exports.stringToBits = stringToBits;

/**
 * @template T
 * @param {T[]} array
 * @param {number} size
 * @returns {Generator<T[]>}
 */
function* chunks(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"todays-mitsui/nonogram","version":"0.1.0","title":"Nonogram","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"attributes":{"numRows":{"type":"number","default":15},"numColumns":{"type":"number","default":15},"boardData":{"type":"string","default":null}},"textdomain":"nonogram","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunknonogram"] = globalThis["webpackChunknonogram"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map