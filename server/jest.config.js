module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEach: [],
  testTimeout: 20000,
  forceExit: true,
  clearMocks: true,
};
