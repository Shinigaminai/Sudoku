import { describe, it, expect } from 'vitest';
import { createSeededRng } from './seededRng';
import { shuffle } from './shuffle';

describe('Deterministic shuffle', () => {
	it('produces the same shuffle for the same seed', () => {
		const arrA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const arrB = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		const rngA = createSeededRng(12345);
		const rngB = createSeededRng(12345);

		const shuffledA = shuffle(arrA, rngA);
		const shuffledB = shuffle(arrB, rngB);

		expect(shuffledA).toEqual(shuffledB);
	});

	it('produces different shuffles for different seeds', () => {
		const arrA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const arrB = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		const rngA = createSeededRng(1);
		const rngB = createSeededRng(2);

		const shuffledA = shuffle(arrA, rngA);
		const shuffledB = shuffle(arrB, rngB);

		expect(shuffledA).not.toEqual(shuffledB);
	});

	it('shuffles all elements without losing or duplicating', () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const original = [...arr];
		const rng = createSeededRng(42);

		const shuffled = shuffle(arr, rng);
		expect(shuffled.sort()).toEqual(original);
	});

	it('shuffles in-place and returns the same reference', () => {
		const arr = [1, 2, 3, 4];
		const rng = createSeededRng(123);

		const result = shuffle(arr, rng);

		expect(result).toBe(arr);
	});

	it('works with empty and single-element arrays', () => {
		const empty: number[] = [];
		const single = [1];

		const rng = createSeededRng(10);

		expect(shuffle(empty, rng)).toEqual([]);
		expect(shuffle(single, rng)).toEqual([1]);
	});
});
