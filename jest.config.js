module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 80,
      functions: 80,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/database/*',
    '<rootDir>/models/*',
    '<rootDir>/schema/*',
    '<rootDir>/types/*',
    '<rootDir>/validations/*',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: [
    '<rootDir>/.jest/typeormMocks.js',
  ],
};
