# How to Release

This project is hosted on NPM.  You can see it [here][project-url].

Releasing the project requires these steps:

0. Set the version number in the code
1. Use a GitHub [project release][github-release-url] to release the project and tag (be sure it follows [semver][semantic-versioning])
2. `npm publish` (make sure it's uploaded to [npm][project-url])
3. Update `master` to a new minor version

[project-url]: https://www.npmjs.com/package/cerner-smart-embeddable-lib
[semantic-versioning]: http://semver.org/
[github-release-url]: https://help.github.com/articles/creating-releases/
