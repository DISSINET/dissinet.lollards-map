module.exports = {
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.spec.(ts|tsx)"],
  testEnvironment: "jsdom",
  verbose: true,
  silent: false,
  setupFiles: ["./tests/setup.ts"],
  setupFilesAfterEnv: ["./tests/setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  }
};
