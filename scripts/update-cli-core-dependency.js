import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const newVersion = process.env.npm_package_version;
if (!newVersion) {
  console.error('Error: npm_package_version environment variable not set.');
  console.error('This script should be run as part of an npm version lifecycle script.');
  process.exit(1);
}

const cliPackageJsonPath = resolve(process.cwd(), 'packages/cli/package.json');
const cliPackageJson = JSON.parse(readFileSync(cliPackageJsonPath, 'utf-8'));

cliPackageJson.dependencies['@google/gemini-cli-core'] = newVersion;

writeFileSync(cliPackageJsonPath, JSON.stringify(cliPackageJson, null, 2) + '\n');

console.log(`Updated @google/gemini-cli-core to version ${newVersion} in ${cliPackageJsonPath}`);
