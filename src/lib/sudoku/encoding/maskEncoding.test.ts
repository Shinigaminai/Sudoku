import { describe, it, expect } from 'vitest';
import { encodeMask, decodeMask } from './maskEncoding';

describe('Mask Encoding / Decoding', () => {
	it('should correctly encode and decode a 9x9 grid', () => {
		const grid = Array.from(
			{ length: 9 },
			(_, r) => Array.from({ length: 9 }, (_, c) => (r + c) % 2 === 0) // alternating true/false
		);

		const encoded = encodeMask(grid);
		expect(typeof encoded).toBe('string');
		expect(encoded.length).toBeGreaterThan(0);

		const decoded = decodeMask(encoded, 9, 9);

		expect(decoded.length).toBe(9);
		expect(decoded[0].length).toBe(9);

		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				expect(decoded[r][c]).toBe(grid[r][c]);
			}
		}
	});

	it('should handle a fully false grid', () => {
		const grid = Array.from({ length: 5 }, () => Array(5).fill(false));

		const encoded = encodeMask(grid);
		const decoded = decodeMask(encoded, 5, 5);

		for (let r = 0; r < 5; r++) {
			for (let c = 0; c < 5; c++) {
				expect(decoded[r][c]).toBe(false);
			}
		}
	});

	it('should handle a fully true grid', () => {
		const grid = Array.from({ length: 3 }, () => Array(4).fill(true));

		const encoded = encodeMask(grid);
		const decoded = decodeMask(encoded, 3, 4);

		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 4; c++) {
				expect(decoded[r][c]).toBe(true);
			}
		}
	});

	it('should handle non-square grids', () => {
		const grid = [
			[true, false, true],
			[false, true, false]
		]; // 2x3

		const encoded = encodeMask(grid);
		const decoded = decodeMask(encoded, 2, 3);

		expect(decoded).toEqual(grid);
	});

	it('should throw for invalid hex input', () => {
		expect(() => decodeMask('ZZZ', 3, 3)).toThrow('Invalid hex string');
	});
});
