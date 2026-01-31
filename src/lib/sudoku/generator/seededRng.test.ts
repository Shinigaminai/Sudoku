import { describe, it, expect } from 'vitest';
import { createSeededRng } from './seededRng';

describe('Seeded RNG', () => {
	it('produces deterministic output for the same seed', () => {
		const rngA = createSeededRng(12345);
		const rngB = createSeededRng(12345);

		const valuesA = Array.from({ length: 10 }, () => rngA.next());
		const valuesB = Array.from({ length: 10 }, () => rngB.next());

		expect(valuesA).toEqual(valuesB);
	});

	it('produces different output for different seeds', () => {
		const rngA = createSeededRng(1);
		const rngB = createSeededRng(2);

		const valuesA = Array.from({ length: 10 }, () => rngA.next());
		const valuesB = Array.from({ length: 10 }, () => rngB.next());

		expect(valuesA).not.toEqual(valuesB);
	});

	it('always returns values in the range [0, 1)', () => {
		const rng = createSeededRng(999);

		for (let i = 0; i < 1000; i++) {
			const value = rng.next();
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThan(1);
		}
	});

	it('advances internal state on each call', () => {
		const rng = createSeededRng(42);

		const first = rng.next();
		const second = rng.next();
		const third = rng.next();

		expect(first).not.toBe(second);
		expect(second).not.toBe(third);
		expect(third).not.toBe(first);
	});

	it('handles negative seeds deterministically', () => {
		const rngA = createSeededRng(-123);
		const rngB = createSeededRng(-123);

		const valuesA = Array.from({ length: 5 }, () => rngA.next());
		const valuesB = Array.from({ length: 5 }, () => rngB.next());

		expect(valuesA).toEqual(valuesB);
	});
});
