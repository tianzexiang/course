module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: '*.test.js',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
