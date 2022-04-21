/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const shell = require('shelljs');

const releaseType = process.argv[2] || 'patch';

if (shell.exec(`npm version ${releaseType} -m "Tagged and released version %s and updated distribution folder."`).code !== 0) {
  shell.exit(1);
}

shell.exit(0);
