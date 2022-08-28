module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/no-cycle': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-array-index-key': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',

    // 'no-restricted-imports': [
    //   'warn',
    //   {
    //     patterns: [
    //       {
    //         group: ['**/../../[a-zA-Z]*/[a-zA-Z]*/**'],
    //         message: 'File not exposed from the module. Consider exporting it from an index',
    //       },
    //     ],
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/*.cjs', 'vite.config.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
