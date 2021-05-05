# @jscad/obj-deserializer

> Deserializer for OBJ data to JSCAD geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Fobj-deserializer.svg)](https://www.npmjs.com/package/@jscad/obj-deserializer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/obj-deserializer)](https://www.npmjs.com/package/@jscad/obj-deserializer)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-success)](https://github.com/emersion/stability-badges#stable)
[![License](https://img.shields.io/github/license/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)

[![User Group](https://img.shields.io/badge/maintained%20by-user%20group-blue)](https://openjscad.nodebb.com/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-blue)](https://lernajs.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## Overview

This deserializer converts raw OBJ formatted data (files) to JSCAD scripts or geometries.

**NOTE: At this time, only ASCII OBJ files are supported. BINARY OBJ files are not supported.**

This deserializer converts only what is supported by JSCAD libraries.
Full document conversion is NOT supported, so don't even try.
However, conversion of the following OBJ commands are possible:

| OBJ Command     | JSCAD Geometry | Notes |
| --------------- | ------------ | ------ |
| V               | to geom3     | vertices of polygons |
| F               | to geom3     | indexes to polygon vertices |
| G               | to geom3     | grouping of V and F to create polygons and geometry |

Also, if the 'USEMTL' (material) matches the name of a CSS3 color then the color is applied to the geometry.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/obj-deserializer
```

## Usage

```javascript
const objDeserializer = require('@jscad/obj-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.obj')
const geometries = objDeserializer.deserialize(rawData, 'file.obj', {output: 'geometry'})

```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://www.openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
