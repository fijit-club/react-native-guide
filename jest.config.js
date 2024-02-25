/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
};

module.exports = config;
