import * as fs from 'fs';
import * as util from 'util';
import * as child_process from 'child_process';
const exec = util.promisify(child_process.exec);
import { Config } from './config';


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
        const { stdout } = await exec(`clasp ${command} ${options}`);
        console.log(stdout);
    } catch (e) {
        console.error(e.stderr); 
        return false;
    }

    return true;
}
