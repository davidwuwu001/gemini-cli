# NPM Workspaces

This project uses [NPM Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) to manage the packages within this monorepo. This simplifies development by allowing us to manage dependencies and run scripts across multiple packages from the root of the project.

## How it Works

The root `package.json` file defines the workspaces for this project:

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

This tells NPM that any folder inside the `packages` directory is a separate package that should be managed as part of the workspace.

## Benefits of Workspaces

*   **Simplified Dependency Management**: Running `npm install` from the root of the project will install all dependencies for all packages in the workspace and link them together. This means you don't need to run `npm install` in each package's directory.
*   **Automatic Linking**: Packages within the workspace can depend on each other. When you run `npm install`, NPM will automatically create symlinks between the packages. This means that when you make changes to one package, the changes are immediately available to other packages that depend on it.
*   **Simplified Script Execution**: You can run scripts in any package from the root of the project using the `--workspace` flag. For example, to run the `build` script in the `cli` package, you can run `npm run build --workspace @google/gemini-cli`.

## Package Overview

This monorepo contains two main packages: `@google/gemini-cli` and `@google/gemini-cli-core`.

### `@google/gemini-cli`

This is the main package for the Gemini CLI. It is responsible for the user interface, command parsing, and all other user-facing functionality.

When this package is published, it is bundled into a single executable file. This bundle includes all of the package's dependencies, including `@google/gemini-cli-core`. This means that whether a user installs the package with `npm install -g @google/gemini-cli` or runs it directly with `npx @google/gemini-cli`, they are using this single, self-contained executable.

### `@google/gemini-cli-core`

This package contains the core logic for interacting with the Gemini API. It is responsible for making API requests, handling authentication, and managing the local cache.

This package is not bundled. When it is published, it is published as a standard Node.js package with its own dependencies. This allows it to be used as a standalone package in other projects, if needed. All transpiled js code in the `dist` folder is included in the package.

## Versioning and Publishing

All packages in this monorepo are versioned together from the root `package.json` file. When a new version is released, the version number in the root `package.json` is updated, and all packages are published with that version.

### Publishing to NPM

When we are ready to publish a new version of the packages to npm, the following steps are taken:

1.  The version number in the root `package.json` is updated.
2.  The `publish:release` script is run from the root of the project. This script builds all the packages, prepares them for publishing, and then publishes them to npm.

When the packages are published, the `workspace:*` dependencies are replaced with the actual version number of the published package. This ensures that when a user installs a package from npm, they get the correct version of its dependencies.

### NPX Installation

When a user runs `npx @google/gemini-cli`, npm downloads the `@google/gemini-cli` package and its dependencies from the npm registry. Because the `workspace:*` dependencies were replaced with the actual version numbers during publishing, npm is able to resolve and download the correct versions of all the required packages.

## Local Testing and Validation

It is crucial to test any changes to the packaging and publishing process locally before committing them. This ensures that the packages will be published correctly and that they will work as expected when installed by a user.

To validate your changes, you can perform a dry run of the publishing process. This will simulate the publishing process without actually publishing the packages to the npm registry.

```bash
npm_package_version=9.9.9 SANDBOX_IMAGE_REGISTRY="registry" SANDBOX_IMAGE_NAME="thename" npm run publish:npm --dry-run
```

This command will do the following:

1.  Build all the packages.
2.  Run all the prepublish scripts.
3.  Create the package tarballs that would be published to npm.
4.  Print a summary of the packages that would be published.

You can then inspect the generated tarballs to ensure that they contain the correct files and that the `package.json` files have been updated correctly. The tarballs will be created in the root of each package's directory (e.g., `packages/cli/google-gemini-cli-0.1.6.tgz`).

By performing a dry run, you can be confident that your changes to the packaging process are correct and that the packages will be published successfully.
