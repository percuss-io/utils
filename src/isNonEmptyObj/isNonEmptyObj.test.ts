/**
 * $ npx vitest isNonEmptyObj
 */

import { describe, expect, it } from 'vitest';
import { isNonEmptyObj } from './isNonEmptyObj';

describe('isNonEmptyObj', () => {
  it('should return true for non-empty objects', () => {
    expect(isNonEmptyObj({ foo: 'bar' })).toBe(true);
    expect(isNonEmptyObj({ a: 1, b: 2 })).toBe(true);
  });

  it('should return false for empty objects', () => {
    expect(isNonEmptyObj({})).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNonEmptyObj(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNonEmptyObj(undefined)).toBe(false);
  });

  it('should return false for arrays', () => {
    expect(isNonEmptyObj([])).toBe(false);
    expect(isNonEmptyObj([1, 2, 3])).toBe(false);
  });

  it('should return false for strings', () => {
    expect(isNonEmptyObj('string')).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isNonEmptyObj(123)).toBe(false);
  });
});
