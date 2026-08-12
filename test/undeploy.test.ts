import { jest } from '@jest/globals';
import { execMock, getOptionsMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { genericAction } = await import("../src/common.js");

describe("multi-clasp undeploy -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "undeploy"];
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp undeploy", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp undeploy ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp undeploy ");
  });

  it("--all: executes npx clasp undeploy --all", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--all");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp undeploy --all");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp undeploy --all");
  });

  it("exits(1) if clasp fails", async () => {
    mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    getOptionsMock.mockReturnValue("--all");
    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
