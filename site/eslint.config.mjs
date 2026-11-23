import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'tests/visual/sorties/'] },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // Paramètre préfixé par « _ » : volontairement inutilisé (ex. fonctions branchées en phase 4).
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];
