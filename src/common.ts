import * as fs from 'fs';
import * as util from 'util';
import * as child_process from 'child_process';
const exec = util.promisify(child_process.exec);
import { Config } from './config';


/**
 * Push a Clasp configuration
 *
 * @param {SingleClasp} clasp the single clasp config
 * @return true if ok, false otherwise
 */
export async function pushClasp(clasp:SingleClasp) {
    if(!clasp || !clasp.scriptId) {
        return false;
    }

    await fs.writeFile(Config.CLASP_FILENAME, JSON.stringify(clasp, null, 2) , Config.UTF_8 as BufferEncoding, async (err) => {
        if (err) throw err;
    });
    console.log('Pushing scriptId:', clasp.scriptId);

    try {
        const { stdout } = await exec('clasp push');
        console.log('stdout:', stdout);
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
        return false;
    }

    return true;
}
