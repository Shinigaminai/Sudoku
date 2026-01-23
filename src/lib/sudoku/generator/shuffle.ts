import type { SeededRng } from "./seededRng";

/**
 * Deterministically shuffles an array in-place using a seeded RNG.
 * Uses Fisher-Yates algorithm.
 *
 * @param array The array to shuffle
 * @param rng A seeded RNG
 * @returns The shuffled array (same reference)
 */
export function shuffle<T>(array: T[], rng: SeededRng): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
