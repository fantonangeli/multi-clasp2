import { execMock } from "./_mocks/multiClaspMocks";
import * as fs from "fs";
import { runClasp } from "../src/common";

const writeFileMock = fs.writeFile as unknown as jest.Mock;

describe("common.js tests", () => {
  beforeEach(() => {
    execMock.mockReset();
    execMock.mockResolvedValue({ error: null, stdout: "", stderr: "" });
    writeFileMock.mockClear();
  });

  describe("runClasp push", () => {
    test("with wrong inputs", async () => {
      expect(await runClasp({ scriptId: null, rootDir: null }, "push", "")).toBeFalsy();
      expect(await runClasp({ scriptId: "", rootDir: null }, "push", "")).toBeFalsy();
      expect(await runClasp(undefined as any, undefined as any, undefined as any)).toBeFalsy();
    });

    test("valid inputs", async () => {
      expect(await runClasp({ scriptId: "123", rootDir: "src" }, "push", "")).toBeTruthy();
      expect(writeFileMock).toHaveBeenCalledTimes(1);
      expect(execMock).toHaveBeenCalledTimes(1);
      expect(execMock.mock.calls[0][0]).toBe("npx clasp push ");
    });
  });
});
