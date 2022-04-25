# Release Explanation
<mark>You do not have to run any of the steps listed in this README to complete the release. The node command will take care of the release for you. Please refer to RELEASE.MD for completing the release</mark>

The release script will release the npm package given a release type (major, minor, or patch). If no type is given, patch will be used.

```
node scripts/release/release.js major
```
## Explanation of steps in the release process:
Once the above ```node``` command gets executed the following takes place automatically:
1. Tests are triggered with the old version
2. Package version is updated based on the change type provided to the ```node``` command (e.g major, minor, patch, etc)
3. The library/package is rebuilt using new version to regenerate ```lib``` and ```dist``` folders (this includes running tests with new lib version)
4. All latest changes are commited and tagged.
5. Commits and updated tags are pushed to the origin.
6. The package publish mechanism is triggered

Steps 1-5 are accomplished using the following scripts in ```package.json``` :
```
"preversion": "npm run test",
"version": "npm run build && git add -A",
"postversion": "git push && git push --tags && rm -rf build/temp",
```

## Testing the release process:
While modifying the scripts if in doubt you can always test the release process in a separate branch using the following steps without publishing the library:
1. Clone the project and create a new branch
2. Run ```npm install```
3. Modify the release script to temporarily remove : ```&& npm publish``` from line 8 of the release script.
4. Run ```node scripts/release/release.js minor```
5. It should perform the above listed release process steps and push the changes to your branch at origin.
6. Ensure the package version has been updated in ```package.json``` and ```package-lock.json```. The ```dist``` and ```lib``` folders should include files created with the updated version no.

