/**
 * The Fisher-Yates (also known as Knuth) shuffle algorithm.
 * Returns a shuffled copy of the input array.
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  // Don't mutate the original array.
  const clonedArr = [...array];

  for (let i = clonedArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [clonedArr[i], clonedArr[j]] = [clonedArr[j], clonedArr[i]];
  }

  return clonedArr;
}
