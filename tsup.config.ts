// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    `src/index.ts`,
    `src/isNonEmptyObj/isNonEmptyObj.ts`,
    `src/shuffleArray/shuffleArray.ts`,
    `src/sleep/sleep.ts`,
  ],
  format: [`cjs`, `esm`],
  outExtension({ format }) {
    return {
      // eslint-disable-next-line @stylistic/multiline-ternary
      js: format === `cjs` ? `.cjs` : `.js`,
    };
  },
  splitting: true,
  treeshake: true,
});
