// import * as Sequencer from '@jest/test-sequencer';
const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  /**
   * Sort test to determine order of execution
   * Sorting is applied after sharding
   */
  sort(tests) {
    // Test structure information
    const copyTests = Array.from(tests);
      return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
