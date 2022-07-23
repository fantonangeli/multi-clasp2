import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test DEPLOYMENTS command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running DEPLOYMENTS for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "deployments"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('1 Deployment');
    expect(result.status).toBe(0);
  });

});

describe('Test DEPLOY command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running DEPLOY for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "deploy"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Created version');
    expect(result.status).toBe(0);
  });

});

describe('Test UNDEPLOY command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running UNDEPLOY for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "undeploy"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain('Undeployed');
    expect(result.status).toBe(0);
  });

});

