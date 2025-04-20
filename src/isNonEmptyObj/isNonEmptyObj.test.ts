/**
 * $ npx vitest isNonEmptyObj
 */

import { describe, expect, it } from 'vitest';

import { isNonEmptyObj } from './isNonEmptyObj';

describe(`isNonEmptyObj`, () => {
  it(`should return true for non-empty objects`, () => {
    expect(isNonEmptyObj({ foo: `bar` })).toBe(true);
    expect(isNonEmptyObj({ a: 1, b: 2 })).toBe(true);
  });

  it(`should return false for empty objects`, () => {
    expect(isNonEmptyObj({})).toBe(false);
  });

  it(`should return false for null`, () => {
    expect(isNonEmptyObj(null)).toBe(false);
  });

  it(`should return false for arrays`, () => {
    expect(isNonEmptyObj([])).toBe(false);
    expect(isNonEmptyObj([1, 2, 3])).toBe(false);
  });

  it(`should return false for non-object types`, () => {
    expect(isNonEmptyObj(undefined)).toBe(false); // eslint-disable-line no-undefined
    expect(isNonEmptyObj(true)).toBe(false);
    expect(isNonEmptyObj(false)).toBe(false);
    expect(isNonEmptyObj(Symbol(`symbol`))).toBe(false);
    expect(isNonEmptyObj(`string`)).toBe(false);
    expect(isNonEmptyObj(123)).toBe(false);
  });

  it(`should return false for objects with only inherited properties`, () => {
    const proto = { inherited: `yep` };
    const obj = Object.create(proto);

    expect(isNonEmptyObj(obj)).toBe(false);
  });

  it(`should return false for objects with only symbol keys`, () => {
    const sym = Symbol(`foo`);
    const obj = { [sym]: `bar` };

    expect(isNonEmptyObj(obj)).toBe(false);
  });

  it(`should return false for Object.create(null) with no props`, () => {
    expect(isNonEmptyObj(Object.create(null))).toBe(false);
  });

  it(`should return true for Object.create(null) with props`, () => {
    const obj = Object.create(null);

    obj.foo = `bar`;

    expect(isNonEmptyObj(obj)).toBe(true);
  });
});
