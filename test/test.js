const fs = require("fs");
const util = require('util');
const { pushClasp } = require('../src/common.js');

jest.mock('util', () => ({
    promisify: jest.fn(() => {
        return jest.fn().mockResolvedValue({ stdout: true});
    })
}));

jest.mock("fs", () => ({
    writeFile: jest.fn().mockResolvedValue(),
}));

describe('common.js tests', () => {
    describe('pushClasp', () => {
        test('with wrong inputs', async () => {
            expect(await pushClasp({scriptId:null, rootDir:null})).toBeFalsy();
            expect(await pushClasp({scriptId:"", rootDir:null})).toBeFalsy();
            expect(await pushClasp()).toBeFalsy();
        });

        test('valid inputs', async () => {
            expect(await pushClasp({scriptId:"123", rootDir:"src"})).toBeTruthy();
            expect(fs.writeFile).toHaveBeenCalledTimes(1);
        });
    });
});
