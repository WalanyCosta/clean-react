module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom:[
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/domain/model/**/*',
    '!<rootDir>/src/domain/usecases/**/*',
    '!<rootDir>/src/presentation/protocols/**/*',
    '!<rootDir>/src/validation/protocols/**/*',
    '!<rootDir>/src/data/protocols/cache/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/main/test/**/*',
    '!**/*.d.ts'
  ],
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
};
