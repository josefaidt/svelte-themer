module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  plugins: ['svelte3', 'jest'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
    'jest/globals': true,
  },
}
