/**
 * $ npx vitest sleep
 */

import { describe, expect, it, vi } from 'vitest';
import { sleep } from './sleep';

describe(`sleep`, () => {
  it(`should resolve after the specified time`, async () => {
    const start = Date.now();
    const duration = 1000; // 1 second.

    await sleep(duration);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(duration);
  });

  it(`should resolve immediately if duration is 0`, async () => {
    const start = Date.now();

    await sleep(0);

    const end = Date.now();

    // This should resolve almost immediately.
    expect(end - start).toBeLessThan(10);
  });

  it(`should call setTimeout with the correct duration`, () => {
    const setTimeoutSpy = vi.spyOn(globalThis, `setTimeout`);

    sleep(500);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 500);
  });
});
