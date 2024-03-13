import { readFile, getExt } from './utilits.js';
import parser from './parsers.js';
import getDiffTree from './buildDiffTree.js';
import format from './formatters/stylish.js';

const genDiff = (filePath1, filePath2) => {
  const fileData1 = readFile(filePath1);
  const fileData2 = readFile(filePath2);
  const fileExt1 = getExt(filePath1);
  const fileExt2 = getExt(filePath2);
  const fileObj1 = parser(fileData1, fileExt1);
  const fileObj2 = parser(fileData2, fileExt2);
  const diff = getDiffTree(fileObj1, fileObj2);
  const form = format(diff);
  return form;
};

export default genDiff;
