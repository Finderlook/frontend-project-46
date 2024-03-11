import fs from 'fs';
import path from 'path';
import process from 'process';

const getFilePath = (fileName) => {
  const dirName = process.cwd(fileName);
  const fullPath = path.resolve(dirName, fileName);
  return fullPath;
};

const getExt = (fileName) => path.extname(fileName);

const readFile = (filePath) => {
  const fileData = fs.readFileSync(getFilePath(filePath), 'utf-8');
  return fileData;
};

export { readFile, getExt };
