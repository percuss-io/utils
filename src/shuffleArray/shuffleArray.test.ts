/**
 * $ npx vitest shuffleArray
 */

import { describe, expect, it, vi } from 'vitest';

import { shuffleArray } from './shuffleArray';

describe(`shuffleArray`, () => {
  it(`should return a new array with the same elements in a different order`, () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);

    expect(result).toHaveLength(input.length);
    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toContain(3);
    expect(result).toContain(4);
    expect(result).toContain(5);
    expect(result).not.toBe(input); // Ensure it`s a new array.
  });

  it(`should not mutate the original array`, () => {
    const input = [1, 2, 3];
    const copy = [...input];

    shuffleArray(input);

    expect(input).toEqual(copy);
  });

  it(`should return the same array if it has 0 or 1 items`, () => {
    expect(shuffleArray([])).toEqual([]);
    expect(shuffleArray([42])).toEqual([42]);
  });

  it(`should return a predictable result when Math.random is mocked`, () => {
    const input = [`a`, `b`, `c`, `d`, `e`, `f`, `g`];

    // For i from 6 to 1, we need 6 calls to Math.random
    // We`ll define j = Math.floor(random() * (i + 1))
    // This specific sequence ensures deterministic swapping.
    const mockRandomValues = [0.1, 0.3, 0.5, 0.2, 0.6, 0.0];
    let callCount = 0;

    vi.spyOn(Math, `random`).mockImplementation(
      // eslint-disable-next-line
      () => mockRandomValues[callCount++],
    );

    const result = shuffleArray(input);

    // Manual step-through of Fisher-Yates based on mock values:
    // i=6 → j=floor(0.1*7)=0 → swap(6,0): g b c d e f a
    // i=5 → j=floor(0.3*6)=1 → swap(5,1): g f c d e b a
    // i=4 → j=floor(0.5*5)=2 → swap(4,2): g f e d c b a
    // i=3 → j=floor(0.2*4)=0 → swap(3,0): d f e g c b a
    // i=2 → j=floor(0.6*3)=1 → swap(2,1): d e f g c b a
    // i=1 → j=floor(0.0*2)=0 → swap(1,0): e d f g c b a

    expect(result).toEqual([`e`, `d`, `f`, `g`, `c`, `b`, `a`]);

    vi.restoreAllMocks();
  });
});
