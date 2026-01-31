import { describe, it, expect } from 'vitest';
import {
	FilledCellValues as SudokuValues,
	type SudokuCell,
	type SudokuGrid
} from '$lib/sudoku/types';
import { encodeSolutionGrid, decodeSolutionGrid } from './solutionEncoding';
import { createCell } from '../utils/gridUtils';

describe('Solution Encoding with fixed mask', () => {
	const createTestGrid = (): SudokuGrid => {
		const grid = [];

		for (let r = 0; r < 9; r++) {
			const row = [];
			for (let c = 0; c < 9; c++) {
				row.push({
					value: ((r * 3 + c) % 9) + 1, // 1–9 repeated
					fixed: (r + c) % 2 === 0 // every other cell fixed
				} as SudokuCell);
			}
			grid.push(row);
		}

		// Add some nulls
		grid[0][0].value = 0;
		grid[8][8].value = 0;

		return grid as unknown as SudokuGrid;
	};

	it('should encode and decode grid preserving values and fixed flags', () => {
		const grid = createTestGrid();

		const encoded = encodeSolutionGrid(grid);
		const decoded = decodeSolutionGrid(encoded);

		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				expect(decoded[r][c].value).toBe(grid[r][c].value);
			}
		}
	});

	it('should produce a reversible encoding', () => {
		const grid = createTestGrid();
		const encoded1 = encodeSolutionGrid(grid);
		const decoded = decodeSolutionGrid(encoded1);
		const encoded2 = encodeSolutionGrid(decoded);

		expect(encoded2).toBe(encoded1);
	});

	SudokuValues.forEach((cellValue) => {
		it(`should handle sudoku value ${cellValue}`, () => {
			const grid: SudokuGrid = Array.from({ length: 9 }, () =>
				Array.from({ length: 9 }, () => createCell(cellValue, false))
			) as unknown as SudokuGrid;

			const encoded = encodeSolutionGrid(grid);
			const decoded = decodeSolutionGrid(encoded);

			for (let r = 0; r < 9; r++) {
				for (let c = 0; c < 9; c++) {
					expect(decoded[r][c].value).toBe(cellValue);
				}
			}
		});
	});
});
