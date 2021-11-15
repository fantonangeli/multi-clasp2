import {getOptions} from "../src/utils";

describe('utils.js tests', () => {
  describe('getOptions', () => {
    test('wrong inputs', () => {
      expect(getOptions([])).toBe("");
      expect(getOptions(undefined)).toBe("");
    })
    test('good inputs', () => {
      expect(getOptions(["node", "multi-clasp", "push"])).toBe("");
      expect(getOptions(["node", "multi-clasp", "push", "-f"])).toBe("-f");
      expect(getOptions(["node", "multi-clasp", "push", "-f", "-g", "what"])).toBe("-f -g what");
      expect(getOptions(["node", "multi-clasp", "run", "-p", '\'["what"]\''])).toBe("-p '[\"what\"]'");
    })
  });
});
