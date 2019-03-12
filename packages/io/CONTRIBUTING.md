## io

## Input Output Format Handling Library - Contributing Guide

This library is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/csg.js/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/io/issues/) via GitHub.

* If you want to submit a change or a patch, please read the contents below on how to make changes. New contributions are accepted as [Pull Requests](https://github.com/jscad/io/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use CSG.js, then please start a conversation at the [OpenJSCAD.org User Group](https://plus.google.com/communities/114958480887231067224). You might find the answer in the [OpenJSCAD.org User Guide](https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://plus.google.com/communities/114958480887231067224) and start contributing changes.

Thanks!

The JSCAD Organization

## Making Changes

First, we suggest that you fork this GIT repository. This will keep your changes separate from the fast lane.  And make pull requests easier.

Once forked, clone your copy of the CSG library.
```
git clone https://github.com/myusername/io.git
cd io
```

**We suggest downloading NPM. This will allow you to generate API documents, and run test suites.**

Once you have NPM, install all the dependencies for development.
```
npm install
```
And, run the test cases to verify the library is functional.
```
npm test
```

The project is structured as:
- packages/* : package directories
  - */index.js : source code for each package
  - io/index.js : source code for main io library

You can now make changes to the library, as well as the test suites.

If you intend to contribute changes back to JSCAD then please be sure to create test cases.

Done? Great! Push the changes back to the fork.
```
git commit changed-file
git add test/new-test-suite.js
git commit test/new-test-suite.js
git push
```
Finally, you can review your changes via GitHub, and create a pull request. 

TIPS for successful pull requests:
- Commit often, and comment well
- Follow the [JavaScript Standard Style](https://github.com/feross/standard)
- Create test cases for all changes
- Verify that all tests suites pass

WOW! Thanks for the cool code.

