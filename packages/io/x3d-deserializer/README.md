## @jscad/x3d-deserializer

> Deserializer of X3D data to JSCAD geometries

[![NPM version](https://badge.fury.io/js/%40jscad%2Fx3d-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fx3d-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/x3d-deserializer)

## Overview

This deserializer converts X3D (XML Encoded) formatted data (files) to JSCAD scripts or geometries.

### X3D Implementation Notes

The [X3D XML Coding](https://www.web3d.org/documents/specifications/19776-1/V3.3/index.html) changes as new releases are published.

This deserializer converts only what is supported by JSCAD libraries.
Full document conversion is NOT supported, however conversion of the following X3D entities are possible:

| X3D Entity      | JSCAD Geometry | Notes |
| --------------- | -------------  | ------ |
| Arc2D                    | arc | 2D  |
| ArcClose2D               | circle | 2D  |
| Box                      | cuboid | 3D  |
| Circle2D                 | arc PI*2 | 2D  |
| Cone                     | cylinder | 3D  |
| Cylinder                 | cylinder | 3D  |
| Disk2D                   | arc or circle  | 2D  |
| ElevationGrid            | TBD |   |
| Extrusion                | extrudeFromSlices | 3D mesh BUGGY  |
| IndexedFaceSet           | polyhedron  | 3D mesh  |
| IndexedLineSet           | TBD   |  |
| IndexedQuadSet           | polyhedron  | 3D mesh  |
| IndexedTriangleFanSet    | polyhedron  | 3D mesh  |
| IndexedTriangleSet       | polyhedron  | 3D mesh  |
| IndexedTriangleStripSet  | polyhedron  | 3D mesh  |
| NurbsCurve               | TBD  |   |
| NurbsCurve2D             | TBD  |   |
| PointSet                 | TBD  |   |
| Polyline2D               | line | 2D  |
| Polypoint2D              | TBD |   |
| QuadSet                  | polyhedron  | 3D mesh  |
| Rectangle2D              | rectangle | 2D  |
| Sphere                   | sphere | 3D  |
| TriangleFanSet           | polyhedron  | 3D mesh  |
| TriangleSet              | polyhedron  | 3D mesh  |
| TriangleSet2D            | one or more geom2 | 2D  |
| TriangleStripSet         | polyhedron  | 3D mesh  |
| Text                     | TBD  |   |

| Shape                    | with one of the above |  |

| Group                    | GROUP  |  |
| StaticGroup              | GROUP  |  |
| Transform                | GROUP plus apply transforms |  |
| LOD (level of detail)    | GROUP with children representing the same scene | only use the first child |
| SWITCH                   | GROUP with children | only use the selected child |

UNIT can be changed by a 'unit' statement
- length (meters * conversionFactor)
- angle (radians * conversionFactor)

In addition, colors are converted when provided.

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
const jscadScript = x3dDeSerializer.deserialize(rawData, 'file.x3d', {output: 'jscad'})
```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://www.jscad.xyz/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
