import { expect, test } from '@jest/globals';
import { readFile } from '../src/utilits.js';
import genDiff from '../src/index.js';

const resultStylish = readFile('__fixtures__/resultStylish.txt');
const resultPlain = readFile('__fixtures__/resultPlain.txt');
const json1 = '__fixtures__/file1.json';
const json2 = '__fixtures__/file2.json';
const yaml1 = '__fixtures__/file1.yaml';
const yaml2 = '__fixtures__/file2.yaml';

test.each([
  [json1, json2, resultStylish],
  [yaml1, yaml2, resultStylish],
])('genDiff Stylish', (a, b, exp) => {
  expect(genDiff(a, b)).toEqual(exp);
});

test.each([
  [json1, json2, resultPlain],
  [yaml1, yaml2, resultPlain],
])('genDiff Plain', (a, b, exp) => {
  expect(genDiff(a, b)).toEqual(exp);
});
