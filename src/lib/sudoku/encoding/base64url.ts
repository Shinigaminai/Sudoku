/**
 * Base64url encoding/decoding for BigInt values.
 * Uses RFC 4648 base64url alphabet (URL-safe, no padding).
 */

const BASE64URL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Encodes a BigInt to a base64url string (RFC 4648, no padding).
 * @param num - The BigInt value to encode
 * @returns The base64url encoded string
 */
export function toBase64url(num: bigint): string {
	if (num === 0n) return 'A';

	// Convert BigInt to bytes (big-endian)
	const bytes: number[] = [];
	let n = num;
	while (n > 0n) {
		bytes.unshift(Number(n & 0xffn));
		n >>= 8n;
	}

	// Encode bytes to base64url
	let result = '';
	for (let i = 0; i < bytes.length; i += 3) {
		const b0 = bytes[i];
		const b1 = bytes[i + 1] ?? 0;
		const b2 = bytes[i + 2] ?? 0;

		result += BASE64URL_ALPHABET[b0 >> 2];
		result += BASE64URL_ALPHABET[((b0 & 0x03) << 4) | (b1 >> 4)];

		if (i + 1 < bytes.length) {
			result += BASE64URL_ALPHABET[((b1 & 0x0f) << 2) | (b2 >> 6)];
		}
		if (i + 2 < bytes.length) {
			result += BASE64URL_ALPHABET[b2 & 0x3f];
		}
	}

	return result;
}

/**
 * Decodes a base64url string back to BigInt.
 * @param str - The base64url encoded string
 * @returns The decoded BigInt value
 * @throws Error if the string contains invalid base64url characters
 */
export function fromBase64url(str: string): bigint {
	if (!str || str.length === 0) {
		throw new Error('Invalid base64url string: empty input');
	}

	// Validate and build lookup
	const lookup: Record<string, number> = {};
	for (let i = 0; i < BASE64URL_ALPHABET.length; i++) {
		lookup[BASE64URL_ALPHABET[i]] = i;
	}

	// Validate all characters
	for (const char of str) {
		if (lookup[char] === undefined) {
			throw new Error(`Invalid base64url character: ${char}`);
		}
	}

	// Decode base64url to bytes
	const bytes: number[] = [];
	for (let i = 0; i < str.length; i += 4) {
		const c0 = lookup[str[i]];
		const c1 = lookup[str[i + 1]] ?? 0;
		const c2 = lookup[str[i + 2]] ?? 0;
		const c3 = lookup[str[i + 3]] ?? 0;

		bytes.push((c0 << 2) | (c1 >> 4));
		if (i + 2 <= str.length) {
			bytes.push(((c1 & 0x0f) << 4) | (c2 >> 2));
		}
		if (i + 3 <= str.length) {
			bytes.push(((c2 & 0x03) << 6) | c3);
		}
	}

	// Calculate actual byte count from base64url string length
	const padding = str.length % 4;
	let actualByteCount = Math.floor(str.length / 4) * 3;
	if (padding === 2) actualByteCount += 1;
	else if (padding === 3) actualByteCount += 2;
	else if (padding === 1) actualByteCount += 0; // Should not happen with valid base64url

	// Trim to actual byte count
	const trimmedBytes = bytes.slice(0, actualByteCount);

	// Convert bytes to BigInt (big-endian)
	let result = 0n;
	for (const byte of trimmedBytes) {
		result = (result << 8n) | BigInt(byte);
	}

	return result;
}
