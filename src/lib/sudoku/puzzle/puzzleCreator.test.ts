import { describe, it, expect } from 'vitest';
import { generateSolvedGrid } from '../generator/sudokuGenerator';
import { createPuzzle, DifficultyPrefillMap } from './puzzleCreator';
import { validateGrid } from '../validation/gridValidation';
import { EmptyCellValue, type SudokuValue } from '../types';

describe('Puzzle Creation', () => {
	it('creates puzzles with correct number of fixed cells per difficulty', () => {
		const solved = generateSolvedGrid(123);

		const difficulties = DifficultyPrefillMap;

		for (const [level, prefilled] of Object.entries(difficulties)) {
			const puzzle = createPuzzle(solved, 123, level as any);

			const countFilledValues = puzzle.flat().filter((c) => c.value !== EmptyCellValue).length;
			expect(countFilledValues).toBe(81);

			const countFixedValues = puzzle.flat().filter((c) => c.fixed === true).length;
			expect(countFixedValues).toBe(prefilled);
		}
	});

	it('produces deterministic puzzles for the same seed and difficulty', () => {
		const solved = generateSolvedGrid(42);

		const puzzleA = createPuzzle(solved, 42, 'medium');
		const puzzleB = createPuzzle(solved, 42, 'medium');

		expect(puzzleA).toEqual(puzzleB);
	});

	it('produces different puzzles for different seeds', () => {
		const solved = generateSolvedGrid(42);

		const puzzleA = createPuzzle(solved, 1, 'medium');
		const puzzleB = createPuzzle(solved, 2, 'medium');

		expect(puzzleA).not.toEqual(puzzleB);
	});

	it('does not modify solved grid values outside removed cells', () => {
		const solved = generateSolvedGrid(99);
		const puzzle = createPuzzle(solved, 99, 'hard');

		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				if (puzzle[r][c].value !== EmptyCellValue) {
					expect(puzzle[r][c].value).toBe(solved[r][c].value);
				}
			}
		}
	});

	it('produces puzzles that are still valid grids', () => {
		const solved = generateSolvedGrid(7);
		const puzzle = createPuzzle(solved, 7, 'medium');

		expect(validateGrid(puzzle)).toBe(true);
	});
});
