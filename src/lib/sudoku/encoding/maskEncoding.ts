import { toBase64url, fromBase64url } from './base64url';

/**
 * Encodes a 2D boolean grid into a base64url string.
 * Works for any size 2D array.
 */
export function encodeMask(mask: boolean[][]): string {
	// Flatten 2D array into binary string
	const binaryString = mask
		.flat()
		.map((bit) => (bit ? '1' : '0'))
		.join('');

	// Convert to BigInt and then to base64url
	const bigIntValue = BigInt(`0b${binaryString}`);
	return toBase64url(bigIntValue);
}

/**
 * Decodes a base64url string back into a 2D boolean grid.
 * @param encoded The base64url string to decode
 * @param rows Number of rows in the resulting grid
 * @param cols Number of columns in the resulting grid
 */
export function decodeMask(encoded: string, rows: number, cols: number): boolean[][] {
	if (!/^[A-Za-z0-9_-]+$/.test(encoded)) {
		throw new Error('Invalid base64url string');
	}

	const size = rows * cols;

	// Convert base64url → BigInt → binary string
	const bigIntValue = fromBase64url(encoded);
	const binaryString = bigIntValue.toString(2).padStart(size, '0');

	// Convert to array of booleans
	const bits = binaryString.split('').map((bit) => bit === '1');

	// Split flat array into rows
	const grid: boolean[][] = [];
	for (let r = 0; r < rows; r++) {
		grid.push(bits.slice(r * cols, (r + 1) * cols));
	}

	return grid;
}
