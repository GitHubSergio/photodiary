// eslint-disable-next-line import/no-extraneous-dependencies
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  preset: '@testing-library/react-native',
  setupFiles: [
    ...jestPreset.setupFiles,
    './__mocks__/@react-native-community/async-storage.js',
  ],
  setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
  moduleDirectories: ['node_modules', 'test-utils.js', '<rootDir>/app/utils/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!react-native)/'],
};
