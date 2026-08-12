import { jest } from '@jest/globals';
import { execMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { default: push } = await import("../src/push.js");

describe("multi-clasp push -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "push"];
    resetMultiClaspMocks();
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp push", async () => {
    mockForeach(["AAA", "BBB"]);
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "1" } as any);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push ");
  });

  it("--force: executes npx clasp push --force", async () => {
    mockForeach(["AAA", "BBB"]);
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "1", force: true });

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push  --force");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push  --force");
  });

  it("retry: fails once then succeeds", async () => {
    mockForeach(["AAA"]);

    execMock
      .mockResolvedValueOnce({ error: new Error("boom"), stdout: "", stderr: "fail" })
      .mockResolvedValueOnce({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "2" } as any);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push ");
  });

  it("retry: exits(1) if all retries fail", async () => {
    mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await push({ retry: "2" } as any);

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
