#! /usr/bin/env node

import * as fs from 'fs';
import { Command } from 'commander';
import { Config } from './config';
import { runClasp } from './common';
import {version} from '../package.json';

const program = new Command();

/**
 * commander action to run clasp.
 *
 * @returns
 */
async function genericAction(): Promise<void> {
  let retVal=true;

  for (let i = 0, len = clasps.length; i < len; i++) {
    retVal = await runClasp(clasps[i], process.argv[2], process.argv.slice(3).join(' '));
    if (!retVal) {
      return;
    }
  }

  fs.unlink(Config.CLASP_FILENAME, (err) => {
    if (err) throw err;
  });
}

const clasps = JSON.parse(fs.readFileSync(Config.MULTICLASP_FILENAME, Config.UTF_8 as BufferEncoding).toString());

program
  .command('status')
  .description('Lists files that will be pushed by clasp')
  .option('--json', 'Show status in JSON form')
  .action(genericAction);

program
  .command('push')
  .description('Update the remote project')
  .option('-f, --force', 'Forcibly overwrites the remote manifest.')
  .action(genericAction);

program
  .command('open [scriptId]')
  .description('Open a script')
  .option('--webapp', 'Open web application in the browser')
  .option('--creds', 'Open the URL to create credentials')
  .option('--addon', 'List parent IDs and open the URL of the first one')
  .action(genericAction);

program.version(version);

program.parse();
