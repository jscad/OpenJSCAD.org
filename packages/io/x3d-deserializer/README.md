## @jscad/x3d-deserializer

> Deserializer of X3D data to JSCAD geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Fx3d-deserializer.svg)](https://www.npmjs.com/package/@jscad/x3d-deserializer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/x3d-deserializer)](https://www.npmjs.com/package/@jscad/x3d-deserializer)
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

This deserializer converts X3D (XML encoded) formatted data (files) to JSCAD scripts or geometries.

### X3D Implementation Notes

The [X3D XML Coding](https://www.web3d.org/documents/specifications/19776-1/V3.3/index.html) changes as new releases are published.

This deserializer converts only what is supported by JSCAD libraries.
Full document conversion is NOT supported, however conversion of the following X3D entities are possible:

| X3D Entity      | JSCAD Geometry | Notes |
| --------------- | -------------  | ------ |
| Arc2D                    | arc | 2D shape  |
| ArcClose2D               | circle | 2D shape  |
| Box                      | cuboid | 3D shape  |
| Circle2D                 | arc | 2D shape  |
| Cone                     | cylinder | 3D shape  |
| Cylinder                 | cylinder | 3D shape  |
| Disk2D                   | arc or circle  | 2D shape  |
| ElevationGrid            | polyhedron | 3D mesh  |
| Extrusion                | extrudeFromSlices | 3D mesh BUGGY  |
| IndexedFaceSet           | polyhedron  | 3D mesh  |
| IndexedLineSet           | line  | 2D shape or 3D shape (UNSUPPORTED)  |
| IndexedQuadSet           | polyhedron  | 3D mesh  |
| IndexedTriangleFanSet    | polyhedron  | 3D mesh  |
| IndexedTriangleSet       | polyhedron  | 3D mesh  |
| IndexedTriangleStripSet  | polyhedron  | 3D mesh  |
| LineSet                  | line  | 2D shape or 3D shape (UNSUPPORTED)  |
| NurbsCurve               | UNSUPPORTED  |   |
| NurbsCurve2D             | UNSUPPORTED  |   |
| PointSet                 | UNSUPPORTED  |   |
| Polyline2D               | line | 2D shape  |
| Polypoint2D              | TBD |   |
| QuadSet                  | polyhedron  | 3D mesh  |
| Rectangle2D              | rectangle | 2D shape  |
| Sphere                   | sphere | 3D shape  |
| TriangleFanSet           | polyhedron  | 3D mesh  |
| TriangleSet              | polyhedron  | 3D mesh  |
| TriangleSet2D            | one or more geom2 | 2D shape  |
| TriangleStripSet         | polyhedron  | 3D mesh  |
| Text                     | UNSUPPORTED  |   |

UNIT can be changed by a 'unit' statement
- length (meters * conversionFactor)
- angle (radians * conversionFactor)

In addition, colors as part of materials are added to geometry. And colors as part of mesh are added to polygons of a geometry.

Finally, there are many applications that can save to X3D formats. All testing is performed with X3D files from Web3D.org, period.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/x3d-deserializer
```

## Usage

```javascript
const x3dDeSerializer = require('@jscad/x3d-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.x3d')
const jscadScript = x3dDeSerializer.deserialize({filename: 'file.x3d', output: 'script'}, rawData)
```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GitHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://www.jscad.xyz/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
