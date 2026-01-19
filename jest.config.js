module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/packages/core/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@bdmakers/agent-data-parser$': '<rootDir>/packages/core/src',
    '^@bdmakers/agent-data-parser-renderers$': '<rootDir>/packages/renderers/src',
    '^@bdmakers/agent-data-parser-react-native$': '<rootDir>/packages/react-native/src',
    '^@bdmakers/agent-data-parser-web$': '<rootDir>/packages/web/src',
  },
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/index.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: [],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
