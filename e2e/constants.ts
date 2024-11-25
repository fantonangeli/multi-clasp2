import * as os from 'os';
import * as path from 'path';

export const NODE = 'node';
export const CLASP: string = os.type() === 'Windows_NT' ? 'clasp.cmd' : 'clasp';

const BUILD_PATH = path.join('build', 'src');
const SCRIPT_SRC_PATH = path.join('.', 'scripts_src');

// Paths
export const MULTI_CLASP_PATHS = {
  SCRIPT_SRC: SCRIPT_SRC_PATH,
  MULTI_CLASP: path.join(BUILD_PATH, 'index.js'),
};

export const E2E_PROJECTS_NAMES = ['multi-clasp2-e2e-1', 'multi-clasp2-e2e-2'];
