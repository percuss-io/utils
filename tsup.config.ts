import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    `src/index.ts`,
    `src/arrays/index.ts`,
    `src/sleep/index.ts`,
    `src/valid8/index.ts`,
  ],
  format: [`cjs`, `esm`],
  splitting: true,
  treeshake: true,
});
