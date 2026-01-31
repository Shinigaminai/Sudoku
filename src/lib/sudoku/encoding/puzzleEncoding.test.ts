import { describe, it, expect } from 'vitest';
import { encodePuzzle, decodePuzzle } from './puzzleEncoding';
import type { SudokuGrid } from '$lib/sudoku/types';
import { createSolvedGrid } from '../utils/gridUtils';

/**
 * Fully solved grid with a mixed fixed mask
 */
const solvedGrid: SudokuGrid = createSolvedGrid();

describe('puzzle encoding / decoding', () => {
	it('encodes and decodes a puzzle losslessly', () => {
		const { solutionB64, initMaskB64 } = encodePuzzle(solvedGrid);

		const decoded = decodePuzzle(solutionB64, initMaskB64);

		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				const original = solvedGrid[r][c];
				const reconstructed = decoded[r][c];

				expect(reconstructed.fixed).toBe(original.fixed);
				expect(reconstructed.value).toBe(original.value);
			}
		}
	});

	it('is deterministic for the same input grid', () => {
		const a = encodePuzzle(solvedGrid);
		const b = encodePuzzle(solvedGrid);

		expect(a.solutionB64).toBe(b.solutionB64);
		expect(a.initMaskB64).toBe(b.initMaskB64);
	});

	it('throws on invalid base64url input', () => {
		expect(() => decodePuzzle('invalid!char', 'AAAA')).toThrow();

		expect(() => decodePuzzle('AAAA', 'invalid!char')).toThrow();
	});
});
