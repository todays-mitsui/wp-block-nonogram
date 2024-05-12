import { Grid } from '../src/Grid';

describe('Grid', () => {
  describe('constructor', () => {
    it('should create a grid with the given dimensions', () => {
      const grid = new Grid(3, 5);
      expect(grid.width).toBe(3);
      expect(grid.height).toBe(5);
    });
  });

  test('get/set', () => {
    const grid = new Grid(3, 3);

    expect(grid.get(1, 1)).toBe(false);

    grid.set(1, 1, true);
    expect(grid.get(1, 1)).toBe(true);

    grid.set(1, 1, false);
    expect(grid.get(1, 1)).toBe(false);
  });

  test('rows', () => {
    const grid = new Grid(3, 5);

    grid.set(1, 1, true);
    grid.set(0, 2, true);

    expect([...grid.rows()]).toEqual([
      [false, false, false],
      [false, true, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  test('columns', () => {
    const grid = new Grid(3, 5);

    grid.set(1, 1, true);
    grid.set(0, 2, true);

    expect([...grid.columns()]).toEqual([
      [false, false, true, false, false],
      [false, true, false, false, false],
      [false, false, false, false, false],
    ]);
  });

  test('expand', () => {
    const grid = new Grid(3, 3);

    grid.set(1, 1, true);

    expect(grid.width).toBe(3);
    expect(grid.height).toBe(3);
    expect(grid.get(1, 1)).toBe(true);

    grid.expand(5, 5);

    expect(grid.width).toBe(5);
    expect(grid.height).toBe(5);
    expect(grid.get(1, 1)).toBe(true);
  });
});
