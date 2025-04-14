# How to Release

This project is hosted on NPM.  You can see it [here][project-url].

Releasing the project requires these steps:

1. Clone the project and execute the following node command : 
   
   NOTE : If you do not choose the correct type of change i.e major, minor or patch then patch will be used to release the package. This follows the [semantic-versioning].

   ```
   node scripts/release/release.js minor
   ``` 

2. The above release script should automatically update the package version and regenerate assets in ```dist``` & ```lib``` folders. Once assets are regenerated the script commits the changes to a new branch and will push them to remote. Go to the branch repository on GitHub and create a PR from the newly created branch to the `master` branch. Once the PR is approved, merge it into the `master` branch. 

## Publishing the Package

After the PR is created and merged into the `master` branch, follow these steps to publish the npm package:

1. **Pull the latest changes from the `master` branch**:
   ```
   git checkout master
   git pull origin master
   ```

2. **Create a tag and push the tag**:
   ```
   git tag v{x.x.x}  # Replace {x.x.x} with the next release version
   git push origin v{x.x.x}  # Replace {x.x.x} with the next release version
   ```

3. **Publish the package to the npm registry**:
   ```
   npm publish
   ```

4. Once publish is complete make sure it's uploaded to [npm][project-url]

Further explanation on the automated steps behind the ```release.js``` script can be found [here][release-documentation]

[project-url]: https://www.npmjs.com/package/cerner-smart-embeddable-lib
[release-documentation]: https://github.com/cerner/cerner-smart-embeddable-lib/blob/master/scripts/release/README.md
[semantic-versioning]: http://semver.org/