import { foreachMock, execMock, mockForeach } from "./_mocks/multiClaspMocks";
import push from "../src/push";

describe("multi-clasp push -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "push"];
    foreachMock.mockReset();
    execMock.mockReset();
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp push", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "1" } as any);
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push ");
  });

  it("--force: executes npx clasp push --force", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "1", force: true });
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push  --force");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push  --force");
  });

  it("retry: fails once then succeeds", async () => {
    const tasks = mockForeach(["AAA"]);

    execMock
      .mockResolvedValueOnce({ error: new Error("boom"), stdout: "", stderr: "fail" })
      .mockResolvedValueOnce({ error: null, stdout: "ok", stderr: "" });

    await push({ retry: "2" } as any);
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp push ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp push ");
  });

  it("retry: exits(1) if all retries fail", async () => {
    const tasks = mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await push({ retry: "2" } as any);
    await Promise.all(tasks);

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
