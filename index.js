#! /usr/bin/env node

const fs = require('fs');

const rootCommand = process.argv[2];
const commandOptions =process.argv.slice(3);

const argv = require('minimist')(process.argv.slice(2));
const { CLASP_FILENAME, MULTICLASP_FILENAME, UTF_8 } = require('./src/config.js');

const { pushClasp } = require('./src/common.js');

const clasps = JSON.parse(fs.readFileSync(MULTICLASP_FILENAME, UTF_8));
({
  async push(commandOptions) {
      for (let i = 0, len = clasps.length; i < len; i++) {
          let retVal=false;
          for (let r = 1; r <= (argv.retry || 1); r++) {
              retVal=await pushClasp(clasps[i]);
              if (retVal) break;
          }
          if(!retVal) return false;
      }

      fs.unlink(CLASP_FILENAME, (err) => {
          if (err) throw err;
      });
  },
})[rootCommand](commandOptions);
