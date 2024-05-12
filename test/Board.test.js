import { Board } from '../src/Board';

describe('Board', () => {
  test('constructor', () => {
    const board = new Board(3, 5);
    expect(board.width).toBe(3);
    expect(board.height).toBe(5);
  });
});
