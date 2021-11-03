const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { CLASP_FILENAME, MULTICLASP_FILENAME, UTF_8 } = require('./config.js');

/**
 * @typedef {{scriptId: string, rootDir: string}} SingleClasp
 */

/**
 * Push a Clasp configuration
 *
 * @param {SingleClasp} clasp the single clasp config
 * @return true if ok, false otherwise
 */
async function pushClasp(clasp) {
    if(!clasp || !clasp.scriptId) {
        return false;
    }

    await fs.writeFile(CLASP_FILENAME, JSON.stringify(clasp, null, 2) , UTF_8, async (err) => {
        if (err) throw err;
    });
    console.log('Pushing scriptId:', clasp.scriptId);

    try {
        const { stdout, stderr } = await exec('clasp push');
        console.log('stdout:', stdout);
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
        return false;
    }

    return true;
}

module.exports = {
    pushClasp,
};
