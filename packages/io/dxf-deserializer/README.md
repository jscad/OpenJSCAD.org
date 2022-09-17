## @jscad/dxf-deserializer

> Deserializer of DXF data to JSCAD scripts or geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Fdxf-deserializer.svg)](https://www.npmjs.com/package/@jscad/dxf-deserializer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/dxf-deserializer)](https://www.npmjs.com/package/@jscad/dxf-deserializer)
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

This deserializer converts raw DXF formatted data (files) to JSCAD scripts or geometries.
When converting unknown DXF data, converting to JSCAD scripts will provide more information on the converted DXF entities.

### DXF Implementation Notes

The [DXF(tm) file structure](http://docs.autodesk.com/ACD/2014/ENU/files/GUID-73E9E797-3BAA-4795-BBD8-4CE7A03E93CF.htm) changes continously as AutoDesk releases new features and fixes. So, you can imagine that after 20 years, the contents of DXF files are pretty messed up. Expect the worst.

**NOTE: At this time, only ASCII DXF files are supported. BINARY DXF files are not supported.**

This deserializer converts only what is supported by JSCAD libraries. Full document conversion is NOT supported, however conversion of the following DXF entities are possible:

| DXF Entity      | JSCAD Geometry | Notes |
| --------------- | -------------  | ------ |
| 3DFACE          | to geom3       | |
| ARC             | to path2       | |
| CIRCLE          | to geom2       | Start and stop angles are ignored |
| ELLIPSE         | to geom2       | Start and stop angles are ignored |
| LINE            | to path2       | |
| LWPOLYLINE      | to path2 or geom2  | Conversion to geom2 if LWPOLYLINE is closed |
| MESH            | to geom3       | |
| POLYLINE (line) | to path2 or geom2 | Conversion to geom2 if POLYLINE is closed |
| POLYLINE (mesh) | to geom3       | |
| POLYLINE (face) | to geom3       | |

In addition, colors are converted using the AutoCad 2017 standard color index (256 colors).

Finally, there are many applications that can save to DXF formats. All testing is performed with files from AutoCad, period.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/dxf-deserializer
```

## Usage

```javascript
const dxfDeserializer = require('@jscad/dxf-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.dxf')
const jscadCode = dxfDeserializer.deserialize(rawData, 'file.dxf', {output: 'jscad'})

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
