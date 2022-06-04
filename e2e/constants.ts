import os from 'os';

export const CLASP: string = os.type() === 'Windows_NT' ? 'clasp.cmd' : 'clasp';

export const TEST_CODE_JS = "function test() { Logger.log('test'); }";

const SCRIPT_SRC_PATH = "./scripts_src";

// Paths
export const MULTI_CLASP_PATHS = {
  SCRIPT_SRC: SCRIPT_SRC_PATH,
  TEST_CODE_JS: SCRIPT_SRC_PATH + '/code.js',
};

