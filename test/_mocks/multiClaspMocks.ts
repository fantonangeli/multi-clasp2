import { jest } from '@jest/globals';

export const execMock = jest.fn();
export const getOptionsMock = jest.fn(() => "");
export const writeFileMock = jest.fn((_p: any, _d: any, _e: any, cb: any) => cb?.(null));
export const unlinkMock = jest.fn((_p: any, cb: any) => cb?.(null));
export const readFileSyncMock = jest.fn();
export const writeFileSyncMock = jest.fn();

jest.unstable_mockModule("fs", () => {
  const actual = jest.requireActual<typeof import("fs")>("fs");
  return {
    ...actual,
    readFileSync: readFileSyncMock,
    writeFile: writeFileMock,
    writeFileSync: writeFileSyncMock,
    unlink: unlinkMock,
  };
});

jest.unstable_mockModule("../../src/utils.js", () => ({
  execShellCommand: execMock,
  getOptions: getOptionsMock,
  parseJsonOrDie: <T>(value: string): T => JSON.parse(value) as T,
}));

export function resetMultiClaspMocks() {
  execMock.mockReset();
  getOptionsMock.mockReset();
  getOptionsMock.mockReturnValue("");
  writeFileMock.mockClear();
  unlinkMock.mockClear();
  readFileSyncMock.mockReset();
  writeFileSyncMock.mockClear();
}

export function mockForeach(scriptIds: string[]) {
  readFileSyncMock.mockReturnValue(JSON.stringify(scriptIds.map((scriptId) => ({ scriptId }))));
}
