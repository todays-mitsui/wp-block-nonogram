import { bitsToString, stringToBits, transpose } from "./util";

// ========================================================================== //

export type Grids = boolean[][];

export interface Board {
  width: number;
  height: number;
  grids: Grids;
}

export type Clue = number[];

export interface Clues {
  rowClues: Clue[];
  columnClues: Clue[];
}

// ========================================================================== //

export function newBoard(width: number, height: number): Board {
  if (width <= 0 || height <= 0) {
    throw new Error("Width and height must be greater than 0");
  }

  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    throw new Error("Width and height must be integers");
  }

  let grids = Array.from({ length: height }, () => Array(width).fill(false));

  return { width, height, grids };
}

// ========================================================================== //

export function getGrids(board: Board): boolean[][] {
  const { width, height, grids } = board;
  return grids.slice(0, height).map((row) => row.slice(0, width));
}

export function getSize(board: Board): readonly [number, number] {
  const { width, height } = board;
  return [width, height] as const;
}

// ========================================================================== //

export function resizeBoard(
  board: Board,
  width: number,
  height: number,
): Board {
  return resizeHeight(resizeWidth(board, width), height);
}

function resizeWidth(board: Board, width: number): Board {
  const { width: oldWidth, height, grids } = board;

  if (width <= oldWidth) {
    return { width, height, grids };
  } else {
    const gap = width - oldWidth;
    const newGrids = grids.map((row) => row.concat(Array(gap).fill(false)));
    return { width, height, grids: newGrids };
  }
}

function resizeHeight(board: Board, height: number): Board {
  const { width, height: oldHeight, grids } = board;

  if (height <= oldHeight) {
    return { width, height, grids };
  } else {
    const gap = height - oldHeight;
    const newGrids = grids.concat(Array(gap).fill(Array(width).fill(false)));
    return { width, height, grids: newGrids };
  }
}

// ========================================================================== //

export function fillCell(board: Board, x: number, y: number): Board {
  const { width, height, grids } = board;

  if (x < 0 || x >= width || y < 0 || y >= height) {
    throw new Error("Out of range");
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error("x and y must be integers");
  }

  const newGrids = grids.map((row, j) =>
    row.map((cell, i) => (i === x && j === y) ? true : cell)
  );
  return { width, height, grids: newGrids };
}

export function clearCell(board: Board, x: number, y: number): Board {
  const { width, height, grids } = board;

  if (x < 0 || x >= width || y < 0 || y >= height) {
    throw new Error("Out of range");
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error("x and y must be integers");
  }

  const newGrids = grids.map((row, j) =>
    row.map((cell, i) => (i === x && j === y) ? false : cell)
  );
  return { width, height, grids: newGrids };
}

// ========================================================================== //

export function calcClues(board: Board): Clues {
  return { rowClues: rowClues(board), columnClues: columnClues(board) };
}

function rowClues(board: Board): Clue[] {
  const grids = getGrids(board);
  return grids.map((row) => calcClue(row));
}

function columnClues(board: Board): Clue[] {
  const grids = getGrids(board);
  return transpose(grids).map((column) => calcClue(column));
}

function calcClue(cells: boolean[]): Clue {
  const clue: Clue = [];

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

// ========================================================================== //

export function serializeBoard(board: Board): string {
  const { width, height, grids } = board;
  return `${width}x${height};${
    grids.map((row) => bitsToString(row)).join(";")
  }`;
}

export function deserializeBoard(str: string): Board {
  const [size, ...data] = str.split(";");
  const [width, height] = size.split("x").map(Number);
  const grids = data.map((row) => stringToBits(row));
  return { width, height, grids };
}
