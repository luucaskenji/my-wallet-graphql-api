module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/database/*',
    '<rootDir>/models/*',
    '<rootDir>/schema/*',
    '<rootDir>/types/*',
    '<rootDir>/validations/*',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['/__tests__/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
