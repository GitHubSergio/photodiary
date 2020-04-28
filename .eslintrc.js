module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [1],
    'react/jsx-indent': [0],
    'react/sort-comp': [0],
    'react/destructuring-assignment': [0],
    'react/forbid-prop-types': [0],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'no-use-before-define': 'off',
    semi: ['error', 'always'],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
  },
  env: {
    'jest': true,
  },
};
