import {spawnSync} from 'child_process';
import {CLASP, E2E_PROJECTS_NAMES, MULTI_CLASP_PATHS} from './constants';
import {Config} from '../src/config';
import {readClaspConfig, writeMultiClaspConfig} from '../src/common';
import * as fs from 'fs';
import * as path from 'path';

const CLASP_JSON_BASE_PATH = path.join(MULTI_CLASP_PATHS.SCRIPT_SRC, "/");

describe('Generate the empty projects', () => {
  const multiClaspConfig: MultiClasp = [];

  const removeFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Cross-platform method to delete a file
    }
  };

  beforeAll(() => {
    removeFile(Config.MULTICLASP_FILENAME);
  });

  afterAll(() => {
    removeFile(path.join(CLASP_JSON_BASE_PATH, Config.CLASP_FILENAME));
  });

  describe.each(E2E_PROJECTS_NAMES)('Creating project %s', (projectName) => {
    it(`create the standalone empty project "${projectName}" to Google Drive`, () => {
      removeFile(path.join(CLASP_JSON_BASE_PATH, Config.CLASP_FILENAME));
      const result = spawnSync(CLASP, ['create', '--type', 'Standalone', '--title', projectName, '--rootDir', MULTI_CLASP_PATHS.SCRIPT_SRC], {
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

  it("create a multi-clasp config file", async () => {
    expect(async () => {
      await writeMultiClaspConfig(multiClaspConfig);
    }).not.toThrowError();
  });
});
