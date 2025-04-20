/**
 * Validates if a value is a non-empty object (not null, not an array, has at least one property).
 *
 * @param value - The value to check
 * @returns True if the value is a non-null object with at least one property
 *
 * @example
 * // Returns true
 * isNonEmptyObj({ foo: 'bar' });
 *
 * @example
 * // Returns false
 * isNonEmptyObj({});
 * isNonEmptyObj(null);
 * isNonEmptyObj(undefined);
 * isNonEmptyObj([]);
 * isNonEmptyObj('string');
 * isNonEmptyObj(123);
 */
export function isNonEmptyObj(
  value: unknown,
): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === `object` &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
}
