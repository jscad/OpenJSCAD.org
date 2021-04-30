# @jscad/array-utils

This package contains utility functions for arrays, which is used throughout the JSCAD project.
However, this package can be used independently of the JSCAD project.

<img src="https://github.com/jscad/OpenJSCAD.org/raw/master/docs/logo.png" width="140" align="right" alt="OpenJSCAD">

[![npm version](https://badge.fury.io/js/%40jscad%2Farray-utils.svg)](https://badge.fury.io/js/%40jscad%2Farray-utils)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Contribute](#contribute)
- [License](#license)

## Usage

There is no UI or CLi in this package, only pieces of code ready for re-use.

### Using with Node.js

This package can be used independently of the JSCAD project.

```
npm install @jscad/array-utils
```

And within JavaScript, access the functions.

```
const { flatten, head, nth, toArray } = require('@jscad/array-utils')
```

## Documentation

See the documentation inside the JavaScript code.

## Contribute

OpenJSCAD.org is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

Thank you to all the people who have already contributed to this project:
<a href="graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" /></a>

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please see the [Contributing guidelines](../../../CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use this package, then please start a conversation at the [OpenJSCAD.org User Group](https://openjscad.xyz/forum.html). You might find the answer in the [OpenJSCAD.org User Guide](https://www.openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../../LICENSE)
(unless specified otherwise)
