import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    coverage: {
      exclude: [`**/node_modules/**`, `**/dist/**`],
      reporter: [`text`, `html`],
    },
    environment: `node`,
    include: [`**/*.test.ts`],
  },
});
