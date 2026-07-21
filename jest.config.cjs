/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["<rootDir>/test/**/*.ts"],
    testPathIgnorePatterns: ["/test/_mocks/"],
    modulePathIgnorePatterns: ["<rootDir>/build/"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};
