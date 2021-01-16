module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          edge: '17',
          ie: '10',
          firefox: '50',
          chrome: '64',
          safari: '11.1',
        },
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
