import { jest } from '@jest/globals';
import { execMock, getOptionsMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { genericAction } = await import("../src/common.js");

describe("multi-clasp list-deployments -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "list-deployments"];
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("executes npx clasp list-deployments", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp list-deployments ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp list-deployments ");
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
