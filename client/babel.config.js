module.exports = {
  presets: [
    ['next/babel']
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
        ['@babel/preset-react']
      ]
    }
  }
};
