# @jscad/core

This is the core package of reusable crucial pieces of code for JSCAD, which is used in the various 'front end'
packages like @jscad/cli , @jscad/web, @jscad/desktop

<img src="https://github.com/jscad/OpenJSCAD.org/raw/master/docs/logo.png" width="140" align="right" alt="JSCAD">

[![npm version](https://badge.fury.io/js/%40jscad%2Fcore.svg)](https://badge.fury.io/js/%40jscad%2Fcore)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![Backers on Open Collective](https://opencollective.com/openjscad/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/openjscad/sponsors/badge.svg)](#sponsors) 

## Table of Contents

- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Contribute](#contribute)
- [Community](#community)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Usage

There is no UI or CLi in this package, only pieces of code ready for re-use.

## Development

### Adding new features in CSG.js or other packages:
Since JSCAD is made up of multiple dependent packages (csg.js, openscad-openjscad-translator etc),
the easiest method is to use ```npm link``` to have a 'live' updating development version of JSCAD:
- create a base directory
- clone this repository ```git clone https://github.com/jscad/OpenJSCAD.org.git```
- go into OpenJSCAD.org folder ```cd OpenJSCAD.org```
- install dependencies ```npm install```
- if desired, make the ```openjscad``` command refer to the code in this folder: ```npm link```
- if desired, start dev server: ```npm run start-dev```

Then, for example for CSG.js:
- go back to base directory ```cd ..```
- clone CSG.js ```git clone https://github.com/jscad/csg.js.git```
- go into OpenJSCAD.org folder again ```cd OpenJSCAD.org```
- now type ```npm link ../csg.js``` to make @jscad/csg refer to local ../csg.js.

You can now make changes to the CSG.js code and see it impact your locally running
copy of JSCAD live.

## Documentation

- [JSCAD User & Programming Guide](https://openjscad.org/dokuwiki/doku.php?id=start)
- [JSCAD Quick Reference](https://openjscad.org/dokuwiki/doku.php?id=jscad_quick_reference)

## Contribute

JSCAD is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

Thank you to all the people who have already contributed to this project:
<a href="graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" /></a>

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please see the [Contributing guidelines](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use the JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD User Guide](https://openjscad.org/dokuwiki/doku.php?id=start).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Community

See for more details
* [JSCAD Forum Announcements](https://jscad.xyz/forum/category/1/announcements)
* [JSCAD Forum Community](https://jscad.xyz/forum) to discuss with other user and developers.

## Acknowledgements

JSCAD and all sub components are built upon great open source packages, and contributions.

- [csg.js](https://github.com/jscad/csg.js) core & improvements by
Evan Wallace,
Eduard Bespalov,
Joost Nieuwenhuijse,
Alexandre Girard

For input/output
- [xmldom](https://github.com/jindw/xmldom)
- [sax](https://github.com/isaacs/sax-js)

Tooling:
- [browserify](http://browserify.org/)
- [babel](https://babeljs.io/)

and many more!

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/openjscad#backer)]

<a href="https://opencollective.com/openjscad#backers" target="_blank"><img src="https://opencollective.com/openjscad/backers.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/openjscad#sponsor)]

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

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
