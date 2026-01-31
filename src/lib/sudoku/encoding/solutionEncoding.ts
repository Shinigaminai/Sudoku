import type { SudokuCell, SudokuGrid, SudokuValue } from '$lib/sudoku/types';
import { isSudokuValue } from '$lib/sudoku/types';

/** Flatten grid into array of numbers (0–9) */
function flattenGrid(grid: SudokuGrid): SudokuValue[] {
	return grid.flat().map((cell) => {
		const value = cell.value;
		if (!isSudokuValue(value)) {
			throw new Error(`Invalid Sudoku value: ${value}`);
		}
		return value;
	});
}

/** Unflatten digits into Sudoku grid */
function unflattenGrid(digits: SudokuValue[]): SudokuGrid {
	if (digits.length !== 81) {
		throw new Error('Expected exactly 81 digits to unflatten Sudoku grid');
	}

	const grid: SudokuCell[][] = [];
	for (let r = 0; r < 9; r++) {
		const row: SudokuCell[] = [];
		for (let c = 0; c < 9; c++) {
			const value = digits[r * 9 + c];
			if (!isSudokuValue(value)) {
				throw new Error(`Invalid Sudoku value at row ${r}, col ${c}: ${value}`);
			}
			row.push({
				value,
				fixed: false // fixed is restored separately via initMaskHex
			});
		}
		grid.push(row);
	}

	return grid as SudokuGrid;
}

/** Encode grid values into hex string (solutionHex) */
export function encodeSolutionGrid(grid: SudokuGrid): string {
	const digits = flattenGrid(grid);
	return BigInt(digits.join('')).toString(16);
}

/** Decode solutionHex into a Sudoku grid */
export function decodeSolutionGrid(solutionHex: string): SudokuGrid {
	if (!/^[0-9a-fA-F]+$/.test(solutionHex)) {
		throw new Error('Invalid hex string for solution encoding');
	}

	const decimalString = BigInt(`0x${solutionHex}`).toString(10).padStart(81, '0');
	const digits = decimalString.split('').map(Number) as SudokuValue[];

	return unflattenGrid(digits);
}
