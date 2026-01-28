/**
 * Drag gesture handling utilities for Sudoku cell input.
 */

export const DRAG_CONFIG = {
	PIXELS_PER_STEP: 28,
	TAP_MAX_DURATION: 200,
	TAP_MAX_DISTANCE: 10
} as const;

export interface DragState {
	startX: number;
	startY: number;
	startValue: number;
	startTime: number;
}

export interface DragResult {
	value: number;
	hasDragged: boolean;
}

/**
 * Calculate new cell value based on drag gesture.
 * Horizontal drag = clear, vertical/diagonal = increment/decrement.
 */
export function calculateDragValue(clientX: number, clientY: number, state: DragState): DragResult {
	const deltaX = clientX - state.startX;
	const deltaY = state.startY - clientY; // up = positive
	const absX = Math.abs(deltaX);
	const absY = Math.abs(deltaY);
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	const hasDragged = distance >= DRAG_CONFIG.TAP_MAX_DISTANCE;

	// Determine drag type based on dominant axis
	// Horizontal: clear cell (only if predominantly horizontal)
	// Vertical/Diagonal: increment/decrement based on Y
	const isHorizontal = absX > absY * 2;

	let value: number;
	if (isHorizontal && absX >= DRAG_CONFIG.PIXELS_PER_STEP) {
		// Horizontal drag: clear cell
		value = 0;
	} else {
		// Vertical, diagonal, or moved back from horizontal: use Y-axis for direction
		const direction = deltaY >= 0 ? 1 : -1;
		const steps = Math.round(absY / DRAG_CONFIG.PIXELS_PER_STEP);
		value = state.startValue + steps * direction;
		value = Math.max(0, Math.min(9, value));
	}

	return { value, hasDragged };
}

/**
 * Determine if gesture was a tap (not a drag).
 */
export function isTapGesture(hasDragged: boolean, duration: number): boolean {
	return !hasDragged && duration < DRAG_CONFIG.TAP_MAX_DURATION;
}

/**
 * Calculate next value for tap gesture (cycles 0-9).
 */
export function getNextTapValue(currentValue: number): number {
	return (currentValue + 1) % 10;
}
