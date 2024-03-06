import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return fileData;
};

const parser = (data) => {
  const parsData = JSON.parse(data);
  return parsData;
};

const genDiff = (filePath1, filePath2) => {
  const fileData1 = readFile(filePath1);
  const fileData2 = readFile(filePath2);
  const fileObj1 = parser(fileData1);
  const fileObj2 = parser(fileData2);
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
  return resultDiff;
};

export default genDiff;
