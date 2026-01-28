/**
 * Keyboard input handling utilities for Sudoku cell navigation and input.
 */

export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * Parse arrow key to navigation direction.
 */
export function getNavigationDirection(key: string): Direction | null {
	switch (key) {
		case 'ArrowUp':
			return 'up';
		case 'ArrowDown':
			return 'down';
		case 'ArrowLeft':
			return 'left';
		case 'ArrowRight':
			return 'right';
		default:
			return null;
	}
}

/**
 * Calculate next cell position from navigation.
 * Clamps to grid boundaries (0-8).
 */
export function getNextCell(
	row: number,
	col: number,
	direction: Direction
): { row: number; col: number } {
	switch (direction) {
		case 'up':
			return { row: Math.max(0, row - 1), col };
		case 'down':
			return { row: Math.min(8, row + 1), col };
		case 'left':
			return { row, col: Math.max(0, col - 1) };
		case 'right':
			return { row, col: Math.min(8, col + 1) };
	}
}

/**
 * Parse key to cell value input.
 * Returns number 1-9 for digit keys, 0 for clear keys, null for non-input.
 */
export function parseInputKey(key: string): number | null {
	if (key >= '1' && key <= '9') {
		return Number(key);
	}
	if (key === 'Backspace' || key === 'Delete' || key === '0') {
		return 0;
	}
	return null;
}
