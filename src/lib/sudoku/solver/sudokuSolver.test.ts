import { describe, it, expect, beforeEach } from "vitest";
import { solveSudoku, hasUniqueSolution } from "./sudokuSolver";
import type { SudokuGrid, SudokuCell } from "$lib/types";
import { createEmptyGrid, createSolvedGrid } from "../utils/gridUtils";

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */


const cloneGrid = (grid: SudokuGrid): SudokuGrid =>
  grid.map(row => row.map(cell => ({ ...cell }))) as unknown as SudokuGrid;

let solvedGrid: SudokuGrid;

beforeEach(() => {
  solvedGrid = createSolvedGrid();
});

/* ------------------------------------------------------------------ */
/* Tests */
/* ------------------------------------------------------------------ */

describe("Sudoku Solver", () => {
  it("returns the same grid if already solved", () => {
    const result = solveSudoku(solvedGrid);

    expect(result.isSolvable).toBe(true);
    expect(result.solvedGrid).toEqual(solvedGrid);
  });

  it("solves a partially filled grid", () => {
    const grid = cloneGrid(solvedGrid);
    grid[0][0].value = null;
    grid[4][4].value = null;
    grid[8][8].value = null;

    const result = solveSudoku(grid);

    expect(result.isSolvable).toBe(true);
    expect(result.solvedGrid).toBeDefined();
    expect(result.solvedGrid).toEqual(solvedGrid);
  });

  it("solves an empty grid", () => {
    const emptyGrid: SudokuGrid = createEmptyGrid();

    const result = solveSudoku(emptyGrid);

    expect(result.isSolvable).toBe(true);
    expect(result.solvedGrid).toBeDefined();
  });

  it("detects an unsolvable grid", () => {
    const invalidGrid = cloneGrid(solvedGrid);
    expect(invalidGrid[0][0].value).toBe(5);
    invalidGrid[0][0].value = 9; // duplicate in row

    const result = solveSudoku(invalidGrid);

    expect(result.isSolvable).toBe(false);
    expect(result.solvedGrid).toBeUndefined();
  });

  it("detects a unique solution", () => {
    const grid = cloneGrid(solvedGrid);
    grid[0][0].value = null;
    grid[1][1].value = null;

    expect(hasUniqueSolution(grid)).toBe(true);
  });

  it("detects multiple solutions", () => {
    const ambiguousGrid: SudokuGrid = createEmptyGrid();

    expect(hasUniqueSolution(ambiguousGrid)).toBe(false);
  });

  it("rejects an invalid starting grid", () => {
    const grid = cloneGrid(solvedGrid);
    grid[0][0].value = grid[0][1].value; // duplicate

    expect(hasUniqueSolution(grid)).toBe(false);
    });
});
