import { execMock, resetMultiClaspMocks, writeFileMock } from "./_mocks/multiClaspMocks.js";

const { runClasp } = await import("../src/common.js");

describe("common.js tests", () => {
  beforeEach(() => {
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "", stderr: "" });
  });

  describe("runClasp push", () => {
    test("with wrong inputs", async () => {
      expect(await runClasp({ scriptId: null, rootDir: null } as any, "push", "")).toBeFalsy();
      expect(await runClasp({ scriptId: "", rootDir: null } as any, "push", "")).toBeFalsy();
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
