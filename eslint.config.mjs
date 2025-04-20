/**
 * @module eslint.config.mjs
 */
// @ts-check

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
import { flatConfigs as eslintPluginImport } from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint';

const directory = dirname(fileURLToPath(import.meta.url));

const lintConfig = tseslint.config(
  {
    ignores: [
      //
    ],
  },
  eslint.configs.recommended,

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  eslintPluginImport.recommended,

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
      'simple-import-sort': simpleImportSort,
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
);

// eslint-disable-next-line import/no-default-export
export default lintConfig;
