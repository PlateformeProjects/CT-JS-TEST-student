export default {
  testEnvironment: "jsdom",
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  clearMocks: true
};
