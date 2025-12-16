import { foreachMock, execMock, getOptionsMock, mockForeach } from "./_mocks/multiClaspMocks";
import { genericAction } from "../src/common";

describe("multi-clasp undeploy -> execShellCommand", () => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", "undeploy"];
    foreachMock.mockReset();
    execMock.mockReset();
    getOptionsMock.mockReset();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it("no options: executes npx clasp undeploy", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp undeploy ");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp undeploy ");
  });

  it("--all: executes npx clasp undeploy --all", async () => {
    const tasks = mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("--all");

    await genericAction();
    await Promise.all(tasks);

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe("npx clasp undeploy --all");
    expect(execMock.mock.calls[1][0]).toBe("npx clasp undeploy --all");
  });

  it("exits(1) if clasp fails", async () => {
    const tasks = mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    getOptionsMock.mockReturnValue("--all");
    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();
    await Promise.all(tasks);

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
