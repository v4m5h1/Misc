module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    moduleNameMapper: {
        "\\.(jpg|png|svg)$": "../mocks/dummyLogo.js",
    },
    testEnvironment: "jsdom",
};
