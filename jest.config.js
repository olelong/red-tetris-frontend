module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(png|css)$": "<rootDir>/fileTransformer.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
};
