export interface SeededRng {
	/**
	 * Returns a floating point number in the range [0, 1)
	 * Deterministic based on initial seed.
	 */
	next(): number;
}

/**
 * Creates a deterministic seeded random number generator.
 * Uses a simple Linear Congruential Generator (LCG).
 *
 * @param seed Any integer value
 */
export function createSeededRng(seed: number): SeededRng {
	// Force seed into unsigned 32-bit space
	let state = seed >>> 0;

	return {
		next(): number {
			// LCG parameters (Numerical Recipes)
			state = (1664525 * state + 1013904223) >>> 0;
			return state / 0xffffffff;
		}
	};
}
