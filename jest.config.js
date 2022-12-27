module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom:[
    '<rootDir>/src/**/*.{ts,tsx}',
    '<rootDir>/src/main/adapters/**/*.{ts, tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/domain/model/**/*',
    '!<rootDir>/src/domain/usecases/**/*',
    '!<rootDir>/src/data/usecases/index.ts',
    '!<rootDir>/src/data/protocols/cache/**/*',
    '!<rootDir>/src/presentation/protocols/**/*',
    '!<rootDir>/src/validation/protocols/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/presentation/components/loading/**/*',
    '!<rootDir>/src/presentation/pages/index.tsx',
    '!<rootDir>/src/presentation/components/private-route/**/*',
    '!<rootDir>/src/presentation/pages/survey-list/components/error/**/*',
    '!**/*.d.ts'
  ],
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
    '@faker-js/faker': '@faker-js/faker',
    'firebase/database': 'firebase/database',
  }
};
