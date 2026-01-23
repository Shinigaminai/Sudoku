import type { SudokuGrid, Difficulty } from "$lib/types";
import { cloneGrid } from "../utils/gridUtils";
import { createSeededRng } from "../generator/seededRng";
import { shuffle } from "../generator/shuffle";

const DifficultyPrefillMap: Record<Difficulty, number> = {
  easy: 45,
  medium: 36,
  hard: 27,
  expert: 18, // or whatever prefill count you want
};

/**
 * Create a playable Sudoku puzzle from a solved grid.
 *
 * @param solvedGrid Fully solved grid
 * @param seed Numeric seed for deterministic removal
 * @param difficulty "easy" | "medium" | "hard"
 */
export function createPuzzle(
  solvedGrid: SudokuGrid,
  seed: number,
  difficulty: Difficulty
): SudokuGrid {
  const prefillCount = DifficultyPrefillMap[difficulty];
  if (!prefillCount) throw new Error(`Invalid difficulty: ${difficulty}`);

  const grid = cloneGrid(solvedGrid);
  const rng = createSeededRng(seed);

  // Flatten cell indices [0..80]
  const indices = Array.from({ length: 81 }, (_, i) => i);
  shuffle(indices, rng);

  // Number of cells to remove
  const cellsToRemove = 81 - prefillCount;

  for (let i = 0; i < cellsToRemove; i++) {
    const idx = indices[i];
    const row = Math.floor(idx / 9);
    const col = idx % 9;

    grid[row][col].value = null;
    grid[row][col].fixed = false;
  }

  // Ensure remaining cells are fixed
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c].value !== null) grid[r][c].fixed = true;
    }
  }

  return grid;
}
