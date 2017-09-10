## OpenJSCAD.org

## OpenJSCAD.org Website Components - Contributing Guide

These components are part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/csg.js/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the contents below on how to make changes. New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use OpenJSCAD, then please start a conversation at the [OpenJSCAD.org User Group](https://plus.google.com/communities/114958480887231067224). You might find the answer in the [OpenJSCAD.org User Guide](https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://plus.google.com/communities/114958480887231067224) and start contributing changes.

Thanks!

The JSCAD Organization

## Making Changes

First, we suggest that you fork this GIT repository. This will keep your changes separate from the fast lane.  And make pull requests easier.

Once forked, clone your copy of the OpenJSCAD.org components.
```
git clone https://github.com/myusername/OpenJSCAD.org.git
cd OpenJSCAD.org
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
Next, start a small webserver to run the website. (Note: The web pages will automatically reload if changes are made.)
```
npm run start-dev
```

The project is structured as:
- *.css : style sheets for the pages
- index.html : main page with all features enabled
- viewer-minimal.html : example of how to use just the veiwer
- viewer-options.html : example of how to control the viewer options
- dist/*.js : specific BAR files that are built fort each page
- src/
  - *.js : ??
  - cli/*.js : ??
  - core/*.js : ??
  - io/*.js : ??
  - jscad/*.js : ??
  - ui/
    - *.js : ??
    - viewer/*.js : ??
  - utils/*.js : various utiliity functions

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



## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/openjscad).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.


## Credits


### Contributors

Thank you to all the people who have already contributed to openjscad!
<a href="graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" /></a>


### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/openjscad#backer)]

<a href="https://opencollective.com/openjscad#backers" target="_blank"><img src="https://opencollective.com/openjscad/backers.svg?width=890"></a>


### Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/openjscad#sponsor))

<a href="https://opencollective.com/openjscad/sponsor/0/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/1/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/2/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/3/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/4/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/5/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/6/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/7/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/8/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/9/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/9/avatar.svg"></a>