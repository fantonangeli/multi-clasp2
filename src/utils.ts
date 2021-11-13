import {MultiClaspErrors} from "./mutli-clasp-errors";

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
