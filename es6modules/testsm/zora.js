import * as Zora from 'https://unpkg.com/zora@4.0.2/dist/bundle/module.js';

const harness = Zora.createHarness();

export let test = harness.test;

harness.report()
  //.then(() => console.log('doney done'))
  .catch((...args) => console.error(args));