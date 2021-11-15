import * as fs from "fs";
import { runClasp } from '../src/common';

jest.mock('../src/utils', () => ({
  __esModule: true, // this property makes it work
  execShellCommand: jest.fn().mockResolvedValue({error: null, stdout: "", stderr: ""}),
}));

jest.mock("fs", () => ({
    writeFile: jest.fn().mockResolvedValue(true),
}));

describe('common.js tests', () => {
    describe('runClasp push', () => {
        test('with wrong inputs', async () => {
            expect(await runClasp({scriptId:null, rootDir:null}, "push", "")).toBeFalsy();
            expect(await runClasp({scriptId:"", rootDir:null}, "push", "")).toBeFalsy();
            expect(await runClasp(undefined, undefined, undefined)).toBeFalsy();
        });

        test('valid inputs', async () => {
            expect(await runClasp({scriptId:"123", rootDir:"src"}, "push", "")).toBeTruthy();
            expect(fs.writeFile).toHaveBeenCalledTimes(1);
        });
    });
});
