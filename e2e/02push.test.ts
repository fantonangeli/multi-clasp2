import {spawnSync} from 'child_process';
import * as fs from 'fs';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Generate the empty projects', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Pushing project %s', (projectName)=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "push"], {
      encoding: 'utf8',
    });
    console.log('result', result);
    expect(result.stdout).toContain('Pushed 3 files.');
    expect(result.status).toBe(0);
  });

});
