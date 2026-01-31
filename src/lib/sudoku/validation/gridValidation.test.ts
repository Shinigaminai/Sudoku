import { describe, it, expect, beforeEach } from 'vitest';
import {
	isValidGroup,
	validateRows,
	validateColumns,
	validateBoxes,
	validateGrid
} from './gridValidation';

import type { SudokuCell, SudokuGrid, SudokuValue } from '$lib/sudoku/types';

// Helper to create a cell
const cell = (value: SudokuValue, fixed = false): SudokuCell => ({ value, fixed });

// Fully valid solved Sudoku grid for testing
const createSolvedGrid = (): SudokuGrid => [
	[cell(5), cell(3), cell(4), cell(6), cell(7), cell(8), cell(9), cell(1), cell(2)],
	[cell(6), cell(7), cell(2), cell(1), cell(9), cell(5), cell(3), cell(4), cell(8)],
	[cell(1), cell(9), cell(8), cell(3), cell(4), cell(2), cell(5), cell(6), cell(7)],
	[cell(8), cell(5), cell(9), cell(7), cell(6), cell(1), cell(4), cell(2), cell(3)],
	[cell(4), cell(2), cell(6), cell(8), cell(5), cell(3), cell(7), cell(9), cell(1)],
	[cell(7), cell(1), cell(3), cell(9), cell(2), cell(4), cell(8), cell(5), cell(6)],
	[cell(9), cell(6), cell(1), cell(5), cell(3), cell(7), cell(2), cell(8), cell(4)],
	[cell(2), cell(8), cell(7), cell(4), cell(1), cell(9), cell(6), cell(3), cell(5)],
	[cell(3), cell(4), cell(5), cell(2), cell(8), cell(6), cell(1), cell(7), cell(9)]
];

let solvedGrid = createSolvedGrid();

beforeEach(() => {
	// Create a fresh solved grid for every test
	solvedGrid = createSolvedGrid();
});

describe('Sudoku grid validation', () => {
	it('validates a fully correct grid', () => {
		expect(validateRows(solvedGrid)).toBe(true);
		expect(validateColumns(solvedGrid)).toBe(true);
		expect(validateBoxes(solvedGrid)).toBe(true);
		expect(validateGrid(solvedGrid)).toBe(true);
	});

	it('detects duplicates in a row', () => {
		const invalid = solvedGrid;
		invalid[0][0].value = invalid[0][1].value; // duplicate in first row
		expect(validateRows(invalid)).toBe(false);
		expect(validateGrid(invalid)).toBe(false);
	});

	it('detects duplicates in a column', () => {
		const invalid = solvedGrid;
		invalid[0][0].value = invalid[1][0].value; // duplicate in first column
		expect(validateColumns(invalid)).toBe(false);
		expect(validateGrid(invalid)).toBe(false);
	});

	it('detects duplicates in a box', () => {
		const invalid = solvedGrid;
		invalid[0][0].value = invalid[1][1].value; // duplicate in top-left box
		expect(validateBoxes(invalid)).toBe(false);
		expect(validateGrid(invalid)).toBe(false);
	});
});
