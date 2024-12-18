module.exports = {
  //   moduleNameMapper: {
  // "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/dist",
  // "^react-router/dom$":
  //   "<rootDir>/node_modules/react-router/dist/production/dom-export.js",
  //   },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    // "\\.(png)$": "<rootDir>/src/assets/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "\\.(png)$": "<rootDir>/fileTransformer.js",
  },
  globals: {
    "babel-jest": {
      configFile: "./babel.config.js",
    },
  },
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules"],
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  injectGlobals: true,
};
