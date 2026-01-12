import * as fs from 'fs';

export function readJson(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}
