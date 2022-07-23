import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test VERSION command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running VERSION for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "version", "'Test version'"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Created version');
    expect(result.status).toBe(0);
  });

});


describe('Test VERSIONS command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running VERSIONS for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "versions"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Versions ~');
    expect(result.stdout).toContain('Test version');
    expect(result.status).toBe(0);
  });

});

