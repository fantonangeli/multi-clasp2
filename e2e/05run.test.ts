import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test RUN command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running RUN for project %s', ()=>{
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "run", "testSum", "-p", "[5, 4]"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain(`Running in dev mode`);
    expect(result.status).toBe(0);
  });

});

