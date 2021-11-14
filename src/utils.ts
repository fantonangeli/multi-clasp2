import {MultiClaspErrors} from "./mutli-clasp-errors";
import * as child_process from 'child_process';

/**
 * Parses input string into a valid JSON object or throws a `ClaspError` error.
 * @param value JSON string.
 */
export const parseJsonOrDie = <T>(value: string): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw MultiClaspErrors.InvalidJson;
  }
};

/**
 * Get the Options for the clasp command.
 *
 * @param args array of arguments
 * @returns the string with the options, "" otherwise
 */
export function getOptions (args:string[]=process.argv):string {
  if (!args) {
    return "";
  }
  return args.slice(3).join(' ');
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd the shell command to execute.
 * @return the promise
 */
export function execShellCommand(cmd: string):Promise<{error: child_process.ExecException | null, stdout: string, stderr: string}> {
  return new Promise((resolve) => {
    child_process.exec(cmd, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}
