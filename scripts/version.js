/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// A script to handle versioning and ensure all related changes are in a single, atomic commit.

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// 1. Get the version type from the command line arguments.
const versionType = process.argv[2];
if (!versionType) {
  console.error('Error: No version type specified.');
  console.error('Usage: npm run version <patch|minor|major|prerelease>');
  process.exit(1);
}

// 2. Bump the version in package.json but DO NOT create a git commit or tag.
// The --no-git-tag-version flag is key here.
run(`npm version --no-git-tag-version ${versionType}`);

// 3. Run our custom script to update dependencies and the sandbox URI.
// This script now runs *before* the commit is made.
run('node scripts/update-cli-core-dependency.js');

// 4. Get the new version number from the root package.json
const rootPackageJsonPath = resolve(process.cwd(), 'package.json');
const newVersion = JSON.parse(readFileSync(rootPackageJsonPath, 'utf-8')).version;

const commitMessage = `chore(release): v${newVersion}`;
console.log(
  `All files updated. Committing version v${newVersion} with message: "${commitMessage}"...`
);

// 5. Add all the changed files to the git staging area.
run('git add package.json package-lock.json packages/cli/package.json');

// 6. Create the atomic commit with all changes.
run(`git commit --no-edit -m "${commitMessage}"`);

// 7. Create the git tag to match the commit.
run(`git tag -a "v${newVersion}" -m "${commitMessage}"`);

console.log(`Successfully committed and tagged v${newVersion}.`);
