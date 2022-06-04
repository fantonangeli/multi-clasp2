/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["<rootDir>/e2e/**/*test.ts"],
    testSequencer: "./e2e/testSequencer.js"
};
