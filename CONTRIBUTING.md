# JSCAD - Contributing Guide

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and is maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the contents below on how to make changes. New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

## Table of Contents

- [Making Changes](#making_changes)
- [Developing with the CLI[(#developing-with-the-cli)
- [Developing with the WEB[(#developing-with-the-web)
- [Contributors](#contributors)

## Making Changes

The contents of this repository contain several packages, all part of the JSCAD project.
The JSCAD packages contain both the UI components as well as the library components, and often the JSCAD packages are linked together through dependencies.
Therefore, we suggest that you start by creating a fork of this repository.
This will keep your changes separate from the fast lane, and make pull requests easier.

You can create a fork via GitHub.

Once forked, clone your copy of the OpenJSCAD.org repository to a local file system.
```
git clone https://github.com/myusername/OpenJSCAD.org.git
cd OpenJSCAD.org
```

The next steps require [NPM](https://www.npmjs.com/) and [Node.js](https://nodejs.org).
The JSCAD project always develops with the latest LTS releases, so install these versions.

Next, try to run the test suites to verify the installation.
```
npm install
npm test
```

This may take some time... relax... have some coffee.

If the tests ran successfully then changes can be made to any package. See the 'packages' directory.

NOTE: All packages and dependencies have been linked together by Lerna. No other magic is required.

If you intend to contribute changes back to JSCAD then please follow these guides.
- follow the [JavaScript Standard Style](https://standardjs.com/index.html) when making changes
- enhance existing test suites or create new tests suites to verify changes
- verify all tests PASS by running ```npm test``` in the local package
- verify all tests PASS across all packages by running ```npm test``` in the base directory

Done? Great! Push the changes back to your fork.
```
git commit changed-file
git add test/new-test-suite.js
git commit test/new-test-suite.js
git push
```

Finally, you can review your changes via GitHub, and create a pull request.

TIPS for successful pull requests:
- Commit often, and comment the changes well
- Verify that automated tests pass (see the bottom of the pull request)

WOW! Thanks for the cool code.

## Developing with the CLI

The JSCAD Command Line Interface (CLI) can be used for development by executing the CLI manually.
```
cd packages/cli
node ./cli.js
```

There are also test suites for the CLI, which can be executed. See *.test.js files for the test suites.
```
npm test
```

You can now make changes to any package, and then check the changes by executing the CLI again.

## Developing with the WEB

The JSCAD Web UI can be used for development by starting a development webserver manually.
```
cd packages/web
npm run dev
```

Now start a browser, and access the URL shown.

You can now make changes to any package. The webserver will automatically detect the change and repackage the distribution. Also, the browser will automaticlly reload the contents from the webserver. Slick!

There are also test suites for the JSCAD Web UI, which can be executed. See *.test.js files for the test suites.
```
npm test
```

### Custom Builds

There are pre-built versions of JSCAD Web package in the 'dist' directory.
- [standard](./dist/index.js)
- [minimal viewer](./dist/min.js)
- [viewer with options](./dist/options.js)

You can rebuild these if you need a new version with your changes.
- standard: ```npm run build-web```
- minimal viewer: ```npm run build-min```
- viewer with options: ```npm run build-opt```

## Contributors

A BIG THANKS to all the people who have already contributed to the JSCAD project!
<a href="graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" /></a>

The JSCAD Organization
