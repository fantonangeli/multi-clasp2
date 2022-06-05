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

    await writeClaspConfig(claspConfig);

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
  return JSON.parse(fs.readFileSync(Config.MULTICLASP_FILENAME, Config.UTF_8 as BufferEncoding).toString() || "[]");
}

/**
 * Read a Clasp Config.
 * @param basePath the base path to read
 * @returns the object with the configuration
 */
export function readClaspConfig(basePath = ''): SingleClasp {
  return JSON.parse(fs.readFileSync(basePath + Config.CLASP_FILENAME, Config.UTF_8 as BufferEncoding).toString());
}

/**
 * Write a Clasp Config.
 * @param config the clasp configuration
 * @param basePath the base path to write
 * @returns the object with the configuration
 */
export async function writeClaspConfig(config:SingleClasp, basePath = ''): Promise<void> {
    return fs.writeFile(basePath + Config.CLASP_FILENAME, JSON.stringify(config, null, 2) , Config.UTF_8 as BufferEncoding, async (err) => {
        if (err) throw err;
    });
}

/**
 * Write a Multi clasp Config.
 * @param config the multi-clasp configuration
 * @param basePath the base path to write
 * @returns the object with the configuration
 */
export function writeMultiClaspConfig(config:SingleClasp[], basePath = ''): void {
    return fs.writeFileSync(basePath + Config.MULTICLASP_FILENAME, JSON.stringify(config, null, 2), Config.UTF_8 as BufferEncoding);
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
