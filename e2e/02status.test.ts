import {spawnSync} from 'child_process';
import {readMultiClaspConfig} from '../src/common';
import {E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS, NODE} from './constants';

describe('Test STATUS command', () => {

  beforeAll(() => {
    expect(readMultiClaspConfig()).not.toEqual([]);
  });

  it.each(E2E_PROJECTS_NAMES)('Running STATUS for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "status"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain(`└─ scripts_src/appsscript.json
└─ scripts_src/code.js
└─ scripts_src/page.html`);
    expect(result.status).toBe(0);
  });

  it.each(E2E_PROJECTS_NAMES)('Running STATUS with "--json" for project %s', ()=>{
    expect(true).toBe(true);
    const result = spawnSync(NODE, [MULTI_CLASP_PATHS.MULTI_CLASP, "status", "--json"], {
      encoding: 'utf8',
    });
    expect(result.stdout).toContain(`{\"filesToPush\":[\"scripts_src/appsscript.json\",\"scripts_src/code.js\",\"scripts_src/page.html\"],\"untrackedFiles\":[]}`);
    expect(result.status).toBe(0);
  });

});

