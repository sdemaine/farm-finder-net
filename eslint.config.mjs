import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next'; // Import Next.js ESLint config

export default [
  // JavaScript and TypeScript common settings
  js.configs.recommended,

  // Apply Next.js ESLint config (including core-web-vitals)
  nextConfig,

  // TypeScript-specific settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser, // Set the parser
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'react-refresh/only-export-components': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },

  // Import resolver for TypeScript
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
];
