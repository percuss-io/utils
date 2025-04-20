/**
 * Sleep for the specified number of milliseconds.
 *
 * @example
 * ```ts
 * await sleep(1000); // waits for 1 second
 * ```
 */
export function sleep(millis: number): Promise<void> {
  if (typeof millis !== `number` || !Number.isFinite(millis) || millis < 0) {
    throw new TypeError(
      `sleep(millis): expected a non-negative finite number, got ${millis}`,
    );
  }

  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}
