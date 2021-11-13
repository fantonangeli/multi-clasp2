import {getRunClaspArgs} from "../src/run";


describe('run.ts tests', ()=>{
  test('wrong inputs', () => {
    expect(()=>(getRunClaspArgs("", {nondev:false, params:''}))).toThrow("Invalid json");
  });
  test('good inputs', () => {
    expect(getRunClaspArgs("testFunc", {nondev:false, params:'[]'})).toBe("testFunc --params '[]'");
    expect(getRunClaspArgs("testFunc", {nondev:false, params:'["dino"]'})).toBe("testFunc --params '[\"dino\"]'");
    expect(getRunClaspArgs("testFunc", {nondev:true, params:'["dino", "pepe"]'})).toBe("testFunc --nondev --params '[\"dino\",\"pepe\"]'");
  });
})
