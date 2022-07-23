import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test OPEN command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running OPEN with for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "open"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Opening script: https://script.google.com/d/');
    expect(result.status).toBe(0);
  });

});

