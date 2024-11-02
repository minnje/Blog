import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
   { ignores: ['dist'] },
   {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         parser: parserTypescript,
         globals: globals.browser,
      },
      plugins: {
         react: pluginReact,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
      },
      rules: {
         ...pluginReact.configs.recommended.rules,
         ...pluginReact.configs['jsx-runtime'].rules,
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
         ],
         'react/jsx-uses-react': 'error',
         'react-hooks/rules-of-hooks': 'error',
         'react-hooks/exhaustive-deps': 'warn',
         '@typescript-eslint/no-unused-vars': 'error',
         '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
         ],
         '@typescript-eslint/no-explicit-any': 'warn',
      },
      settings: {
         react: {
            version: 'detect',
         },
      },
   },
   {
      files: ['**/*.{js,mjs,cjs}'],
      rules: pluginJs.configs.recommended.rules,
   },
   {
      files: ['**/*.{ts,tsx}'],
      rules: {
         ...pluginTypescript.configs['eslint-recommended'].overrides[0].rules,
         ...pluginTypescript.configs['recommended'].rules,
         '@typescript-eslint/no-explicit-any': 'warn',
      },
   }
);
