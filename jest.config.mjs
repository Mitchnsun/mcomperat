import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next-intl$': '<rootDir>/test-utils/next-intl.ts',
  },
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['hooks/**/*.ts', 'lib/**/*.ts'],
};

export default createJestConfig(customJestConfig);
