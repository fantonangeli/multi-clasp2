import {foreachClasp, runClasp} from "./common";
import {parseJsonOrDie} from "./utils";

interface CommandOption {
  readonly nondev: boolean;
  readonly params: string;
}

/**
 * Get Clasp Arguments.
 *
 * @param functionName {string} The function name within the Apps Script project.
 * @param options.nondev {boolean} If we want to run the last deployed version vs the latest code.
 * @param options.params {string} JSON string of parameters to be input to function.
 * @returns {string} the command arguments
 */
export function getRunClaspArgs(functionName="", options: CommandOption): string{
  let claspArgs = functionName || "";
  const {params: jsonString = '[]'} = options;
  const parameters = parseJsonOrDie<string[]>(jsonString);

  if (!options) {
    return claspArgs;
  }

  claspArgs += options.nondev?" --nondev":"";
  
  claspArgs += " --params '"+JSON.stringify(parameters)+"'";

  return claspArgs;
}

/**
 * Executes an Apps Script function. Requires clasp login --creds.
 * @param functionName {string} The function name within the Apps Script project.
 * @param options.nondev {boolean} If we want to run the last deployed version vs the latest code.
 * @param options.params {string} JSON string of parameters to be input to function.
 * @see https://developers.google.com/apps-script/api/how-tos/execute
 * @requires `clasp login --creds` to be run beforehand.
 */
export default async (functionName: string, options: CommandOption): Promise<void> => {
  const claspArgs = getRunClaspArgs(functionName, options);

  foreachClasp(async (claspConfig)=>{
    await runClasp(claspConfig, process.argv[2], claspArgs);
  });
}
