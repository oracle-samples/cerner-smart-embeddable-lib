/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const shell = require('shelljs');

const releaseType = process.argv[2] || 'patch';

// npm version triggers scripts added in package.json to test, build, commit, tag and push changes with version update to git.
// If the tests fail when ran with preversion script entire release will fail.
if (shell.exec(`npm version ${releaseType} -m "Tagged and released version %s"`).code !== 0) {
  shell.exit(1);
}

shell.exit(0);
