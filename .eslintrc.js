module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@next/next/no-img-element': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
