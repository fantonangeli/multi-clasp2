import { jest } from '@jest/globals';
import { execMock, getOptionsMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { genericAction } = await import("../src/common.js");

describe("multi-clasp show-file-status -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "show-file-status"];
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp show-file-status", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp show-file-status ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp show-file-status ");
  });

  it("--json: executes npx clasp show-file-status --json", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--json");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp show-file-status --json");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp show-file-status --json");
  });

  it("exits(1) if clasp fails", async () => {
    mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    getOptionsMock.mockReturnValue("");
    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
