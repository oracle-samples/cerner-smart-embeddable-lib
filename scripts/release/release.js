/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const shell = require('shelljs');

const releaseType = process.argv[2] || 'patch';

const newBranch = `release-${releaseType}-${new Date().toISOString().slice(0, 10)}`;

// Checkout a new branch
if (shell.exec(`git checkout -b ${newBranch}`).code !== 0) {
  shell.echo('Error: Git branch creation failed');
  shell.exit(1);
}

// Run npm version to bump the version and create a commit.npm version triggers scripts added in package.json to test, build, commit, tag and push changes with version update to git.
// If the tests fail when ran with preversion script entire release will fail.
if (shell.exec(`npm version ${releaseType} -m "Tagged and released version %s"`).code !== 0) {
  shell.echo('Error: Version bump failed');
  shell.exit(1);
}

// Push the new branch to remote
if (shell.exec(`git push origin ${newBranch}`).code !== 0) {
  shell.echo('Error: Git push failed');
  shell.exit(1);
}

shell.exit(0);
