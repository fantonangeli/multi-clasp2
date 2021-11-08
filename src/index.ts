#! /usr/bin/env node

import * as fs from 'fs';
import * as minimist from 'minimist';

const rootCommand = process.argv[2];

const argv = minimist(process.argv.slice(2));
import { Config } from './config';

import { pushClasp } from './common';

const clasps = JSON.parse(fs.readFileSync(Config.MULTICLASP_FILENAME, Config.UTF_8 as BufferEncoding).toString());
({
  async push() {
    console.log("rootCommand ", rootCommand);
    console.log("argv ", process.argv);
      for (let i = 0, len = clasps.length; i < len; i++) {
          let retVal=false;
          for (let r = 1; r <= (argv.retry || 1); r++) {
              retVal=await pushClasp(clasps[i]);
              if (retVal) break;
          }
          if(!retVal) return false;
      }

      fs.unlink(Config.CLASP_FILENAME, (err) => {
          if (err) throw err;
      });
  },
})[rootCommand]();
