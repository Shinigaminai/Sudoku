/**
 * Encodes a 2D boolean grid into a hexadecimal string.
 * Works for any size 2D array.
 */
export function encodeMask(mask: boolean[][]): string {
	// Flatten 2D array into binary string
	const binaryString = mask
		.flat()
		.map((bit) => (bit ? '1' : '0'))
		.join('');

	// Convert to BigInt and then to hex
	const bigIntValue = BigInt(`0b${binaryString}`);
	return bigIntValue.toString(16);
}

/**
 * Decodes a hexadecimal string back into a 2D boolean grid.
 * @param maskHex The hex string to decode
 * @param rows Number of rows in the resulting grid
 * @param cols Number of columns in the resulting grid
 */
export function decodeMask(maskHex: string, rows: number, cols: number): boolean[][] {
	if (!/^[0-9a-fA-F]+$/.test(maskHex)) {
		throw new Error('Invalid hex string');
	}

	const size = rows * cols;

	// Convert hex → binary string
	const binaryString = BigInt(`0x${maskHex}`).toString(2).padStart(size, '0');

	// Convert to array of booleans
	const bits = binaryString.split('').map((bit) => bit === '1');

	// Split flat array into rows
	const grid: boolean[][] = [];
	for (let r = 0; r < rows; r++) {
		grid.push(bits.slice(r * cols, (r + 1) * cols));
	}

	return grid;
}
