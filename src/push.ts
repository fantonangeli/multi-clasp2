import {foreachClasp, runClasp} from "./common";

interface CommandOption {
  readonly retry?: string;
  readonly force?: boolean;
}

/**
 * Get Clasp Arguments.
 *
 * @param options.nondev {boolean} If we want to push the last deployed version vs the latest code.
 * @param options.retry {number} If the push of an App Script fail with it will retry n times
 * @returns {string} the command arguments
 */
function getPushClaspArgs(options: CommandOption): string{
  let claspArgs = "";

  if (!options) {
    return claspArgs;
  }

  claspArgs += options.force?" --force":"";
  
  return claspArgs;
}

/**
 * Uploads all files into the script.google.com filesystem.
 * @param options.watch {boolean} If true, runs `clasp push` when any local file changes. Exit with ^C.
 * @param options.retry {number} If the push of an App Script fail with it will retry n times
 */
export default async (options: CommandOption): Promise<void> => {
  const retry = parseInt(options.retry);

  foreachClasp(async (claspConfig)=>{
    let retVal = false;

    for (let r = 0; r < retry; r++) {
      retVal = await runClasp(claspConfig, process.argv[2], getPushClaspArgs(options));
      if(retVal){
        break;
      }
    }
    if(!retVal){
      process.exit(1);
    }
  });
};
