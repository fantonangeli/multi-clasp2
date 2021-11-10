#! /usr/bin/env node

import * as fs from 'fs';
import { Command } from 'commander';
import { Config } from './config';
import { genericAction, readMultiClaspConfig, runClasp } from './common';
import {version} from '../package.json';

const program = new Command();

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

program.command('deployments')
  .description('List deployment ids of a script')
  .action(genericAction);

program
  .command('deploy')
  .description('Deploy a project')
  .option('-V, --versionNumber <version>', 'The project version') // We can't use `version` in subcommand
  .option('-d, --description <description>', 'The deployment description')
  .action(genericAction);

program
  .command('undeploy [deploymentId]')
  .description('Undeploy a deployment of a project')
  .option('-a, --all', 'Undeploy all deployments')
  .action(genericAction);

program
  .command('version [description]')
  .description('Creates an immutable version of the script')
  .action(genericAction);

program
  .command('versions')
  .description('List versions of a script')
  .action(genericAction);

program.version(version, '-v, --version', 'output the current version');
program.parse();
