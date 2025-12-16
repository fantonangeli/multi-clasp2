import { foreachMock, execMock, getOptionsMock, mockForeach } from "./_mocks/multiClaspMocks";
import { genericAction } from "../src/common";

describe("multi-clasp open -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "open"];
    foreachMock.mockReset();
    execMock.mockReset();
    getOptionsMock.mockReset();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp open", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp open ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp open ");
  });

  it("--webapp: executes npx clasp open --webapp", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--webapp");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp open --webapp");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp open --webapp");
  });

  it("--creds: executes npx clasp open --creds", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--creds");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp open --creds");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp open --creds");
  });

  it("--addon: executes npx clasp open --addon", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--addon");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp open --addon");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp open --addon");
  });

  it("all options: executes npx clasp open --webapp --creds --addon", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--webapp --creds --addon");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp open --webapp --creds --addon");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp open --webapp --creds --addon");
  });

  it("exits(1) if clasp fails", async () => {
    const tasks = mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    getOptionsMock.mockReturnValue("--webapp");
    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();
    await Promise.all(tasks);

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
