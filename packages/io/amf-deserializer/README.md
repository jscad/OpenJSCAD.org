## @jscad/amf-deserializer

> Deserializer of AMF data to JSCAD geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Famf-deserializer.svg)](https://www.npmjs.com/package/@jscad/amf-deserializer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/amf-deserializer)](https://www.npmjs.com/package/@jscad/amf-deserializer)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-success)](https://github.com/emersion/stability-badges#stable)
[![License](https://img.shields.io/github/license/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)

[![User Group](https://img.shields.io/badge/maintained%20by-user%20group-blue)](https://openjscad.nodebb.com/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-blue)](https://lerna.js.org/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## Overview

This deserializer converts raw AMF formatted data (XML) to JSCAD scripts or geometries.

**NOTE: At this time, only XML files are supported, so unzip the original AMF file before proceeding.**

This deserializer converts only what is supported by JSCAD libraries.
Full document conversion is NOT supported, so don't even try.
However, conversion of AMF objects and materials are possible:

| AMF Entity      | JSCAD Geometry | Notes |
| --------------- | ------------ | ------ |
| mesh            | to geom3     | conversion of vertices and volumes |
| color           | color | color found at object, volume, and triangle are converted |

Also, if the 'USEMTL' (material) matches the name of a CSS3 color then the color is applied to the geometry.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/amf-deserializer
```

## Usage

```javascript
const amfDeSerializer = require('@jscad/amf-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.amf')
const jscadScript = amfDeSerializer.deserialize(rawData, 'file.amf', {output: 'jscad'})
```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GitHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
