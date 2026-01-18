/**
 * Encodes an array of 81 booleans into a hex string.
 */
export function encodeInitMaskToHex(mask: boolean[]): string {
  if (mask.length !== 81) {
    throw new Error("Initial mask must have exactly 81 entries");
  }

  const binaryString = mask
    .map((bit) => (bit ? "1" : "0"))
    .join("");

  const bigIntValue = BigInt(`0b${binaryString}`);
  return bigIntValue.toString(16);
}

/**
 * Decodes a hex string back into an array of 81 booleans.
 */
export function decodeInitMaskHex(hex: string): boolean[] {
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error("Invalid hex string");
  }

  const binaryString = BigInt(`0x${hex}`)
    .toString(2)
    .padStart(81, "0");

  if (binaryString.length !== 81) {
    throw new Error("Decoded mask must have exactly 81 bits");
  }

  return binaryString.split("").map((bit) => bit === "1");
}
