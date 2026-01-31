import { type SudokuGrid, type Difficulty, EmptyCellValue } from '$lib/sudoku/types';
import { cloneGrid } from '../utils/gridUtils';
import { createSeededRng } from '../generator/seededRng';
import { shuffle } from '../generator/shuffle';

export const DifficultyPrefillMap: Record<Difficulty, number> = {
	solved: 81,
	easy: 45,
	medium: 36,
	hard: 27,
	expert: 18
};

/**
 * Create a playable Sudoku puzzle from a solved grid.
 *
 * @param solvedGrid Fully solved grid
 * @param seed Numeric seed for deterministic removal
 * @param difficulty {@link Difficulty} Difficulty level of the puzzle
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

	// Fix all cells
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			grid[r][c].fixed = true;
		}
	}

	// Unfix some cells
	for (let i = 0; i < cellsToRemove; i++) {
		const idx = indices[i];
		const row = Math.floor(idx / 9);
		const col = idx % 9;

		// grid[row][col].value = EmptyCellValue;
		grid[row][col].fixed = false;
	}

	return grid;
}
