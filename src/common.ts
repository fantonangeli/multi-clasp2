import * as fs from 'fs';
import { Config } from './config';
import {execShellCommand, getOptions} from './utils';


/**
 * Push a Clasp configuration
 *
 * @param claspConfig the single clasp config
 * @param command the clasp command to execute
 * @param options the command options
 * @return true if ok, false otherwise
 */
export async function runClasp(claspConfig:SingleClasp, command: string, options = "") {
    if(!claspConfig || !claspConfig.scriptId || !command) {
        return false;
    }

    await fs.writeFile(Config.CLASP_FILENAME, JSON.stringify(claspConfig, null, 2) , Config.UTF_8 as BufferEncoding, async (err) => {
        if (err) throw err;
    });
    console.log('Elaborating scriptId:', claspConfig.scriptId);

    try {
        // const { stdout } = await exec(`npx clasp ${command} ${options}`);
        const { error, stdout, stderr } = await execShellCommand(`npx clasp ${command} ${options}`);
        console.log(stdout);
        if (error) {
          console.log(stderr);
          return false;
        }
    } catch (e) {
        console.error(e.stderr); 
        return false;
    }

    return true;
}

/**
 * Read a Multi Clasp Config.
 *
 * @returns array of SingleClasp 
 */
export function readMultiClaspConfig(): SingleClasp[] {
  return JSON.parse(fs.readFileSync(Config.MULTICLASP_FILENAME, Config.UTF_8 as BufferEncoding).toString());
}

/**
 * commander action to run clasp.
 *
 * @returns
 */
export async function foreachClasp(fn:(claspConfig:SingleClasp)=>Promise<void>):Promise<void> {
  const clasps = readMultiClaspConfig();

  for (let i = 0, len = clasps.length; i < len; i++) {
    await fn(clasps[i]);
  }

  fs.unlink(Config.CLASP_FILENAME, (err) => {
    if (err) throw err;
  });
}

/**
 * commander action to run clasp.
 *
 * @returns
 */
export async function genericAction(): Promise<void> {
  foreachClasp(async (claspConfig)=>{
    const retVal = await runClasp(claspConfig, process.argv[2], getOptions());
    if(!retVal){
      process.exit(1);
    }
  });
}
