import type { SudokuGrid, SudokuCell, SudokuValue } from "$lib/types";
import { validateGrid } from "../validation/gridValidation";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface SolverResult {
  solvedGrid?: SudokuGrid;
  isSolvable: boolean;
}

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

// Deep clone to avoid mutating input
const cloneGrid = (grid: SudokuGrid): SudokuGrid =>
  grid.map(row => row.map(cell => ({ ...cell }))) as unknown as SudokuGrid;

// Find the first empty cell (row-major order)
const findEmptyCell = (
  grid: SudokuGrid
): { row: number; col: number } | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        return { row, col };
      }
    }
  }
  return null;
};

// Try values 1–9
const CANDIDATES: SudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* ------------------------------------------------------------------ */
/* Core Backtracking Solver */
/* ------------------------------------------------------------------ */

const solveInternal = (
  grid: SudokuGrid,
  solutions: SudokuGrid[],
  stopAfter: number
): void => {
  if (solutions.length >= stopAfter) return;

  const empty = findEmptyCell(grid);
  if (!empty) {
    // Found a complete solution
    solutions.push(cloneGrid(grid));
    return;
  }

  const { row, col } = empty;

  for (const value of CANDIDATES) {
    grid[row][col].value = value;

    if (validateGrid(grid)) {
      solveInternal(grid, solutions, stopAfter);
    }

    if (solutions.length >= stopAfter) return;
  }

  // Backtrack
  grid[row][col].value = null;
};

/* ------------------------------------------------------------------ */
/* Public API */
/* ------------------------------------------------------------------ */

/**
 * Solves a Sudoku puzzle.
 * Returns the first found solution, if any.
 */
export function solveSudoku(grid: SudokuGrid): SolverResult {
  if (!validateGrid(grid)) {
    return { isSolvable: false };
  }

  const workingGrid = cloneGrid(grid);
  const solutions: SudokuGrid[] = [];

  solveInternal(workingGrid, solutions, 1);

  if (solutions.length === 0) {
    return { isSolvable: false };
  }

  return {
    isSolvable: true,
    solvedGrid: solutions[0],
  };
}

/**
 * Checks whether a Sudoku puzzle has exactly one solution.
 */
export function hasUniqueSolution(grid: SudokuGrid): boolean {
  if (!validateGrid(grid)) {
    return false;
  }

  const workingGrid = cloneGrid(grid);
  const solutions: SudokuGrid[] = [];

  solveInternal(workingGrid, solutions, 2);

  return solutions.length === 1;
}
