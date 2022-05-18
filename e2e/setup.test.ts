import {spawnSync} from 'child_process';
import {CLASP, SCRIPT_SRC_PATH} from './constants';
import {Config} from '../src/config';
import {readClaspConfig, writeMultiClaspConfig} from '../src/common';

const CLASP_JSON_BASE_PATH = SCRIPT_SRC_PATH + "/";

describe('Generate the empty projects', () => {
  const multiClaspConfig: MultiClasp = [];

  beforeAll(() => {
    spawnSync('rm', [Config.MULTICLASP_FILENAME]);
  });

  afterAll(() => {
      spawnSync('rm', [CLASP_JSON_BASE_PATH + Config.CLASP_FILENAME]);
  });

  describe.each(["multi-clasp2-e2e-1" , "multi-clasp2-e2e-2" ])('Creating project %s', (projectName)=>{
    it(`create the standalone empty project "${projectName}" to Google Drive`, () => {
      spawnSync('rm', [CLASP_JSON_BASE_PATH + Config.CLASP_FILENAME]);
      const result = spawnSync(CLASP, ['create', '--type', 'Standalone', '--title', projectName, '--rootDir', SCRIPT_SRC_PATH], {
        encoding: 'utf8',
      });
      expect(result.stdout).toContain('Created new Standalone script: https://script.google.com/d/');
      expect(result.status).toBe(0);
      // .clasp.json is created in "scripts_src" due a Clasp bug
      const claspJson = readClaspConfig(CLASP_JSON_BASE_PATH);
      expect(claspJson).toHaveProperty("scriptId");
      expect(claspJson.scriptId).not.toBe("");
      multiClaspConfig.push(claspJson);
    });
  });

  it("create a multi-clasp config file", () => {
      expect(()=>writeMultiClaspConfig(multiClaspConfig)).not.toThrowError();
  })

});
