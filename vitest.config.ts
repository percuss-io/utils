import { defineConfig } from 'vitest/config';

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
