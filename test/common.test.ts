import * as fs from "fs";
import { getOptions, runClasp } from '../src/common';

jest.mock('util', () => ({
    promisify: jest.fn(() => {
        return jest.fn().mockResolvedValue({ stdout: true});
    })
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

  describe('getOptions', () => {
    test('wrong inputs', () => {
      expect(getOptions([])).toBe("");
      expect(getOptions(undefined)).toBe("");
    })
    test('good inputs', () => {
      expect(getOptions(["node", "multi-clasp", "push"])).toBe("");
      expect(getOptions(["node", "multi-clasp", "push", "-f"])).toBe("-f");
      expect(getOptions(["node", "multi-clasp", "push", "-f", "-g", "what"])).toBe("-f -g what");
      expect(getOptions(["node", "multi-clasp", "run", "-p", '\'["what"]\''])).toBe("-p '[\"what\"]'");
    })
  });
});
