import { jest } from '@jest/globals';
import { execMock, getOptionsMock, mockForeach, resetMultiClaspMocks } from "./_mocks/multiClaspMocks.js";

const { genericAction } = await import("../src/common.js");

describe.each(['open-script', 'open-web-app', 'open-container'])("multi-clasp %s -> execShellCommand", (openCommand) => {
  const realArgv = process.argv.slice();

  beforeEach(() => {
    process.argv = ["node", "multi-clasp", openCommand];
    resetMultiClaspMocks();
    execMock.mockResolvedValue({ error: null, stdout: "ok", stderr: "" });
  });

  afterEach(() => {
    process.argv = realArgv;
  });

  it(`no options: executes npx clasp ${openCommand}`, async () => {
    mockForeach(["AAA", "BBB"]);
    getOptionsMock.mockReturnValue("");

    await genericAction();

    expect(execMock).toHaveBeenCalledTimes(2);
    expect(execMock.mock.calls[0][0]).toBe(`npx clasp ${openCommand} `);
    expect(execMock.mock.calls[1][0]).toBe(`npx clasp ${openCommand} `);
  });

  it("exits(1) if clasp fails", async () => {
    mockForeach(["AAA"]);
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => undefined) as any);

    execMock.mockResolvedValue({ error: new Error("boom"), stdout: "", stderr: "fail" });

    await genericAction();

    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
