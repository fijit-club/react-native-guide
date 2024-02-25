module.exports = {
  root: true,
  extends: ['@react-native'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:import/recommended',
        'plugin:jest/recommended',
        'plugin:react/jsx-runtime',
        'plugin:perfectionist/recommended-natural',
      ],
      rules: {
        'no-console': 'off',
        'object-shorthand': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports', disallowTypeAnnotations: false },
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react-native/no-unused-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-single-element-style-arrays': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-raw-text': ['error', { skip: ['CustomText'] }],
        'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
        '@typescript-eslint/no-shadow': 'error',
        curly: ['error', 'multi-or-nest', 'consistent'],
        // ? ref: https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/#eslint-support
        'react-hooks/exhaustive-deps': [
          'error',
          { additionalHooks: '(useAnimatedStyle|useDerivedValue|useAnimatedProps)' },
        ],
        'import/no-unresolved': 'off',
        'perfectionist/sort-objects': 'off',
      },
      settings: {
        'import/ignore': ['react-native'],
      },
    },
  ],
};
