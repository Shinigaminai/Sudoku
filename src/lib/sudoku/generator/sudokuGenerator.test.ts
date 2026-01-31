import { describe, it, expect } from 'vitest';
import { generateSolvedGrid } from './sudokuGenerator';
import { validateGrid } from '../validation/gridValidation';
import { cloneGrid } from '../utils/gridUtils';
import { solveSudoku } from '../solver/sudokuSolver';
import { EmptyCellValue, type SudokuValue } from '../types';

describe('Sudoku Generator', () => {
	const seeds = [42, 99, 999, 7, 12345, 0];

	it('generates a valid completed grid', () => {
		const grid = generateSolvedGrid(42);

		expect(validateGrid(grid)).toBe(true);
	});

	it('produces deterministic output for the same seed', () => {
		const gridA = generateSolvedGrid(12345);
		const gridB = generateSolvedGrid(12345);

		expect(gridA).toEqual(gridB);
	});

	it('produces different grids for different seeds', () => {
		const gridA = generateSolvedGrid(1);
		const gridB = generateSolvedGrid(2);

		expect(gridA).not.toEqual(gridB);
	});

	it('produces grids that are compatible with the solver', () => {
		const grid = generateSolvedGrid(999);
		const clone = cloneGrid(grid);
		const result = solveSudoku(clone);

		expect(result.isSolvable).toBe(true);
		expect(result.solvedGrid).toEqual(grid);
	});

	seeds.forEach((seed) => {
		it('produces solved puzzle without EmptyCellValue', () => {
			const solved = generateSolvedGrid(seed);
			const allValues: SudokuValue[] = solved.flat().map((cell) => cell.value);
			expect(allValues).not.toContain(EmptyCellValue);
		});
	});
});
