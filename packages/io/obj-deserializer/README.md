# @jscad/obj-deserializer

> Deserializer for OBJ data to JSCAD geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Fobj-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fobj-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/obj-deserializer)

## Overview

This deserializer converts raw OBJ formatted data (files) to JSCAD scripts or geometries.

**NOTE: At this time, only ASCII OBJ files are supported. BINARY OBJ files are not supported.**

This deserializer converts only what is supported by JSCAD libraries. Full document conversion is NOT supported, so don't even try. However, conversion of the following OBJ commands are possible:

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

* If you want to submit a change or a patch, please read the [Contributing Guide](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
