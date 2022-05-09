import fs from 'fs';
import path from 'path';
import { PORTAL9_DATA_ABSOLUTE_PATH } from '../../common/constants';

export const createDirectoryIfNotExists = (directory: string): void  => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  };
};

export const createDataDirectoryIfNotExists = (directory?: string) => {
  const absoluteRoute = directory ? path.join(PORTAL9_DATA_ABSOLUTE_PATH, directory) : PORTAL9_DATA_ABSOLUTE_PATH;
  if (!fs.existsSync(absoluteRoute)) {
    fs.mkdirSync(absoluteRoute);
  };
}

export const getDataDirectoryRelative = (directory?: string) => {
  return path.join(PORTAL9_DATA_ABSOLUTE_PATH, directory);
}
