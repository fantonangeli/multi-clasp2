jest.mock("fs", () => {
  const actual = jest.requireActual("fs");
  return {
    ...actual,
    writeFile: jest.fn((_p: any, _d: any, _e: any, cb: any) => cb?.(null)),
    unlink: jest.fn((_p: any, cb: any) => cb?.(null)),
  };
});

jest.mock("../../src/utils", () => ({
  execShellCommand: jest.fn(),
  getOptions: jest.fn(() => ""),
}));

jest.mock("../../src/common", () => {
  const actual = jest.requireActual("../../src/common");
  const utils = jest.requireMock("../../src/utils");
  const foreachClasp = jest.fn();

  return {
    ...actual,
    foreachClasp,
    genericAction: jest.fn(async () => {
      await foreachClasp(async (claspConfig: SingleClasp) => {
        const retVal = await actual.runClasp(
          claspConfig,
          process.argv[2],
          utils.getOptions(),
        );
        if (!retVal) {
          process.exit(1);
        }
      });
    }),
  };
});

const common = jest.requireMock("../../src/common") as typeof import("../../src/common");
const utils = jest.requireMock("../../src/utils") as typeof import("../../src/utils");

export const foreachMock = common.foreachClasp as unknown as jest.Mock;
export const execMock = utils.execShellCommand as unknown as jest.Mock;
export const getOptionsMock = utils.getOptions as unknown as jest.Mock;

export function mockForeach(scriptIds: string[]) {
  const tasks: Promise<any>[] = [];
  foreachMock.mockImplementation((fn: any) => {
    for (const scriptId of scriptIds) {
      tasks.push(fn({ scriptId }));
    }
  });
  return tasks;
}
