import { describe, it, expect } from 'vitest';
import { toBase64url, fromBase64url } from './base64url';

describe('Base64url Encoding / Decoding', () => {
	it('should encode and decode zero', () => {
		const encoded = toBase64url(0n);
		expect(encoded).toBe('A');
		expect(fromBase64url(encoded)).toBe(0n);
	});

	it('should encode and decode small values', () => {
		const values = [1n, 42n, 255n, 1000n];
		for (const val of values) {
			const encoded = toBase64url(val);
			const decoded = fromBase64url(encoded);
			expect(decoded).toBe(val);
		}
	});

	it('should encode and decode large values (81-digit decimal)', () => {
		// Representative of a full Sudoku grid encoded as digits
		const bigValue = BigInt(
			'123456789234567891345678912456789123567891234678912345789123456891234567912345678'
		);
		const encoded = toBase64url(bigValue);
		const decoded = fromBase64url(encoded);
		expect(decoded).toBe(bigValue);
	});

	it('should produce URL-safe characters only', () => {
		const value = BigInt('999999999999999999999999999999');
		const encoded = toBase64url(value);
		// Base64url uses only A-Z, a-z, 0-9, - and _
		expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
	});

	it('should throw on invalid base64url characters', () => {
		expect(() => fromBase64url('abc!def')).toThrow('Invalid base64url character');
		expect(() => fromBase64url('abc+def')).toThrow('Invalid base64url character');
		expect(() => fromBase64url('abc/def')).toThrow('Invalid base64url character');
		expect(() => fromBase64url('abc=def')).toThrow('Invalid base64url character');
	});

	it('should throw on empty input', () => {
		expect(() => fromBase64url('')).toThrow('Invalid base64url string: empty input');
	});

	it('should be reversible for various BigInt values', () => {
		const testValues = [
			0n,
			1n,
			63n, // Single base64 character boundary
			64n,
			255n, // Single byte max
			256n,
			4095n, // Two base64 characters
			4096n,
			BigInt('18446744073709551615'), // Max uint64
			BigInt('123456789012345678901234567890')
		];

		for (const val of testValues) {
			const encoded = toBase64url(val);
			const decoded = fromBase64url(encoded);
			expect(decoded).toBe(val);
		}
	});
});
