module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  ignorePatterns: '*.test.js',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    camelcase: 'off'
  }
}
