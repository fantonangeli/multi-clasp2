import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test PUSH command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running PUSH with "--force" for project %s', ()=>{
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "push", "--force"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Pushed 3 files.');
    expect(result.status).toBe(0);
  });

});
