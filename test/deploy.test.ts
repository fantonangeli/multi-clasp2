import { jest } from '@jest/globals';
import { execMock, getOptionsMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { genericAction } = await import("../src/common.js");

describe("multi-clasp deploy -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "deploy"];
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp deploy", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp deploy ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp deploy ");
  });

  it("--versionNumber: executes npx clasp deploy --versionNumber 7", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--versionNumber 7");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp deploy --versionNumber 7");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp deploy --versionNumber 7");
  });

  it("--description: executes npx clasp deploy --description hello", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--description hello");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp deploy --description hello");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp deploy --description hello");
  });

  it("both: executes npx clasp deploy --versionNumber 7 --description hello", async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--versionNumber 7 --description hello");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp deploy --versionNumber 7 --description hello");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp deploy --versionNumber 7 --description hello");
  });

  it("exits(1) if clasp fails", async () => {
    mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    getOptionsMock.mockReturnValue("--versionNumber 7");
    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
