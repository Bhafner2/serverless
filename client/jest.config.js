const debug = false;

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      diagnostics: true,
      isolatedModules: true,
    },
  },
  verbose: true,
  collectCoverageFrom: ['**/src/**/?(*.)+(ts)?(x)'],
  testMatch: ['**/src/**/+(*.)+(spec|test).+(ts|js)?(x)'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/cypress/'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    '.+\\.(css|styl|less|sass|scss|pcss)$': 'jest-css-modules-transform',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setupJest.ts'],
  coverageReporters: ['lcov'],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'jest-junit',
        outputName: 'jenkins-junit.xml',
      },
    ],
  ],
};

if (debug) {
  console.log(config);
}

module.exports = config;
