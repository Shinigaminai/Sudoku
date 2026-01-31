import {
	isSudokuValue,
	type SudokuCell,
	type SudokuGrid,
	type SudokuValue
} from '$lib/sudoku/types';
import { encodeSolutionGrid, decodeSolutionGrid } from './solutionEncoding';
import { encodeMask, decodeMask } from './maskEncoding';
import { createCell } from '../utils/gridUtils';

/**
 * Encode a Sudoku puzzle into URL-safe primitives.
 *
 * - solutionB64 encodes the full solved grid (base64url)
 * - initMaskB64 encodes which cells are initially visible (base64url)
 */
export function encodePuzzle(grid: SudokuGrid): {
	solutionB64: string;
	initMaskB64: string;
} {
	const solutionB64 = encodeSolutionGrid(grid);

	const initMaskB64 = encodeMask(grid.map((row) => row.map((cell) => cell.fixed)));

	return {
		solutionB64,
		initMaskB64
	};
}

/**
 * Decode a Sudoku puzzle from URL primitives.
 *
 * Reconstructs the full grid and applies fixed/editable state
 * based on the init mask.
 */
export function decodePuzzle(solutionB64: string, initMaskB64: string): SudokuGrid {
	const solutionGrid = decodeSolutionGrid(solutionB64);
	const initMask = decodeMask(initMaskB64, 9, 9);

	return solutionGrid.map((row: SudokuCell[], r) =>
		row.map((cell, c) => {
			const fixed = initMask[r][c];
			const value: SudokuValue = cell.value;

			if (!isSudokuValue(value)) {
				throw new Error(`Invalid Sudoku value at row ${r}, col ${c}: ${value}`);
			}

			return createCell(value, fixed);
		})
	) as SudokuGrid;
}

/**
 * Checks if a string is a valid puzzle encoding.
 * Valid format: "{solutionB64}:{initMaskB64}"
 * Both parts must be valid base64url strings.
 */
export function isPuzzleEncoding(value: string): boolean {
	if (typeof value !== 'string') return false;

	const parts = value.split(':');
	if (parts.length !== 2) return false;

	const [solutionB64, initMaskB64] = parts;

	// Base64url regex: one or more A-Z, a-z, 0-9, - or _
	const base64urlRegex = /^[A-Za-z0-9_-]+$/;

	return base64urlRegex.test(solutionB64) && base64urlRegex.test(initMaskB64);
}
