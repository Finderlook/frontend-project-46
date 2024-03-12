import _ from 'lodash';
import { readFile, getExt } from './utilits.js';
import parser from './parsers.js';

const genDiff = (filePath1, filePath2, format) => {
  const fileData1 = readFile(filePath1);
  const fileData2 = readFile(filePath2);
  const fileExt1 = getExt(filePath1);
  const fileExt2 = getExt(filePath2);
  const fileObj1 = parser(fileData1, fileExt1);
  const fileObj2 = parser(fileData2, fileExt2);
  const keysSort = _.sortBy([...new Set([...Object.keys(fileObj1), ...Object.keys(fileObj2)])]);
  const diff = keysSort
    .map((key) => {
      const value1 = fileObj1[key];
      const value2 = fileObj2[key];
      if (!_.has(fileObj1, key)) {
        return `  + ${key}: ${value2}`;
      }
      if (!_.has(fileObj2, key)) {
        return `  - ${key}: ${value1}`;
      }
      if (fileObj1[key] === fileObj2[key]) {
        return `    ${key}: ${value1}`;
      }
      return [`  - ${key}: ${value1}\n  + ${key}: ${value2}`];
    });
  const resultDiff = ['{', ...diff, '}'].join('\n');
  console.log(format);
  return resultDiff;
};

export default genDiff;
