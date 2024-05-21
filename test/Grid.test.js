import { Grid } from "./src/Model/Grid";

describe("Grid", () => {
  describe("constructor", () => {
    it("should create a grid with the given dimensions", () => {
      const grid = new Grid(3, 5);
      expect(grid._numColumns).toBe(3);
      expect(grid._numRows).toBe(5);
    });
  });

  test("get/set", () => {
    const grid = new Grid(3, 3);

    expect(grid.get(1, 1)).toBe("unknown");

    grid.set(1, 1, "filled");
    expect(grid.get(1, 1)).toBe("filled");

    grid.set(1, 1, "space");
    expect(grid.get(1, 1)).toBe("space");

    grid.set(1, 1, "unknown");
    expect(grid.get(1, 1)).toBe("unknown");
  });

  test("rows", () => {
    const grid = new Grid(3, 5);

    grid.set(1, 1, "filled");
    grid.set(0, 2, "filled");

    expect([...grid.rows()]).toEqual([
      ["unknown", "unknown", "unknown"],
      ["unknown", "filled", "unknown"],
      ["filled", "unknown", "unknown"],
      ["unknown", "unknown", "unknown"],
      ["unknown", "unknown", "unknown"],
    ]);
  });

  test("columns", () => {
    const grid = new Grid(3, 5);

    grid.set(1, 1, "filled");
    grid.set(0, 2, "filled");

    expect([...grid.columns()]).toEqual([
      ["unknown", "unknown", "filled", "unknown", "unknown"],
      ["unknown", "filled", "unknown", "unknown", "unknown"],
      ["unknown", "unknown", "unknown", "unknown", "unknown"],
    ]);
  });

  test("resize", () => {
    const grid = new Grid(3, 3);

    grid.set(1, 1, "filled");

    expect(grid._numColumns).toBe(3);
    expect(grid._numRows).toBe(3);
    expect(grid.get(1, 1)).toBe("filled");

    grid.resize(5, 5);

    expect(grid._numColumns).toBe(5);
    expect(grid._numRows).toBe(5);
    expect(grid.get(1, 1)).toBe("filled");
  });
});
