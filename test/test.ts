import * as fs from "fs";
import { pushClasp } from '../src/common';

jest.mock('util', () => ({
    promisify: jest.fn(() => {
        return jest.fn().mockResolvedValue({ stdout: true});
    })
}));

jest.mock("fs", () => ({
    writeFile: jest.fn().mockResolvedValue(true),
}));

describe('common.js tests', () => {
    describe('pushClasp', () => {
        test('with wrong inputs', async () => {
            expect(await pushClasp({scriptId:null, rootDir:null})).toBeFalsy();
            expect(await pushClasp({scriptId:"", rootDir:null})).toBeFalsy();
            expect(await pushClasp(undefined)).toBeFalsy();
        });

        test('valid inputs', async () => {
            expect(await pushClasp({scriptId:"123", rootDir:"src"})).toBeTruthy();
            expect(fs.writeFile).toHaveBeenCalledTimes(1);
        });
    });
});
