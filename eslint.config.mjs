/**
 * @module eslint.config.mjs
 */
// @ts-check

// eslint-disable-next-line simple-import-sort/imports
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import {
  baseRules,
  deprecatedNodeCommonJsRules,
  disabledBasePersonalRules,
  disabledTypescriptExtensionRules,
  disabledTypescriptPersonalRules,
  importRules,
  simpleImportSortRules,
  sortDestructureKeysRules,
  stylisticRules,
  typescriptRules,
} from '@percuss.io/eslint-config-ericcarraway';
import stylistic from '@stylistic/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import { defineConfig } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';

const directory = dirname(fileURLToPath(import.meta.url));

const lintConfig = defineConfig(
  {
    ignores: [
      //
    ],
  },

  eslint.configs.recommended,
  tseslintConfigs.strictTypeChecked,
  tseslintConfigs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            //
            `.prettierrc.cjs`,
            `*.cjs`,
            `*.js`,
            `*.mjs`,
            `*.config.ts`,
          ],
        },
        tsconfigRootDir: directory,
      },
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,

      // @ts-expect-error TypeScript types are problematic for this plugin.
      'sort-destructure-keys': sortDestructureKeys,
    },
  },
  {
    rules: {
      ...baseRules,
      ...deprecatedNodeCommonJsRules,
      ...disabledBasePersonalRules,
      ...disabledTypescriptExtensionRules,
      ...disabledTypescriptPersonalRules,
      ...importRules,
      ...simpleImportSortRules,
      ...sortDestructureKeysRules,
      ...stylisticRules,
      ...typescriptRules,
    },
  },
  {
    files: [`./eslint.config.mjs`, `./tsup.config.ts`, `./vitest.config.ts`],
    rules: {
      'import/no-default-export': `off`,
    },
  },
);

export default lintConfig;
