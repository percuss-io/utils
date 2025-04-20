import { defineConfig } from 'tsup';

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
  splitting: true,
  treeshake: true,
});
