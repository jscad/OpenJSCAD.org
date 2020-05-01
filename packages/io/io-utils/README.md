## @jscad/io-utils

> input/output handling utilities

[![NPM version](https://badge.fury.io/js/%40jscad%2Fio-utils.svg)](https://badge.fury.io/js/%40jscad%2Fio-utils)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/io-utils)

## Overview

This contains following utilities:

- makeBlob : converts arrays of raw data output by the various serializers into
a Blob that can also be converted to Node.js buffer

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/io-utils
```

## Usage

```javascript
const {makeBlob} = require('@jscad/io-utils')
const stlSerializer = require('@jscad/stl-serializer')

const rawData = stlSerializer(CSGObject)

const blob = new makeBlob(rawData)
//get a Node.js buffer
const buffer = blob.asBuffer()

```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
