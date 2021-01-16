module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: auto,
      },
    ],
  },
  globals: {
    localStorage: true,
  },
};
