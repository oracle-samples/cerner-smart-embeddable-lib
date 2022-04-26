# How to Release

This project is hosted on NPM.  You can see it [here][project-url].

Releasing the project requires these steps:

1. Clone the project and execute the following node command : 
   
   NOTE : If you do not choose the correct type of change i.e major, minor or patch then patch will be used to release the package. This follows the [semantic-versioning].

   ```
   node scripts/release/release.js minor
   ``` 

2. The above release script should automatically update the package version and regenerate assets in ```dist``` & ```lib``` folders. Once assets are regenerated the script commits and tags the changes and will push them to remote and `npm publish` will be triggered automatically.
3. Once publish is complete make sure it's uploaded to [npm][project-url]

[project-url]: https://www.npmjs.com/package/cerner-smart-embeddable-lib
[semantic-versioning]: http://semver.org/