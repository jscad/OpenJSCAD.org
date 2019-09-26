## @jscad/dxf-deserializer

> Deserializer of DXF data to CSG geometries

[![GitHub version](https://badge.fury.io/gh/jscad%40jscad%2Fdxf-deserializer.svg)](https://badge.fury.io/gh/jscad%40jscad%2Fdxf-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/dxf-deserializer)

## Overview

This deserializer converts raw DXF formatted data (files) to JSCAD scripts or CSG geometries.
When converting unknown DXF data, converting to JSCAD scripts will provide more information on the converted DXF entities.

### DXF Implementation Notes

The [DXF(tm) file structure](http://docs.autodesk.com/ACD/2014/ENU/files/GUID-73E9E797-3BAA-4795-BBD8-4CE7A03E93CF.htm) changes continously as AutoDesk releases new features and fixes. So, you can imagine that after 20 years, the contents of DXF files are pretty messed up. Expect the worst.

**NOTE: At this time, only ASCII DXF files are supported. BINARY DXF files are not supported.**

This deserializer converts only what is supported by JSCAD libraries. Full document conversion is NOT supported, so don't even try. However, conversion of the following DXF entities are possible:

| DXF Entity      | CSG Geometry | Notes |
| --------------- | ------------ | ------ |
| 3DFACE          | to geom3     | |
| ARC             | to path2     | |
| CIRCLE          | to geom2     | Start and stop angles are ignored |
| ELLIPSE         | to geom2     | Start and stop angles are ignored |
| LINE            | to path2     | |
| LWPOLYLINE      | to path2 or geom2  | Conversion to geom2 if LWPOLYLINE is closed |
| MESH            | to geom3     | |
| POLYLINE (line) | to path2 or geom2 | Conversion to geom2 if POLYLINE is closed |
| POLYLINE (mesh) | to geom3     | |
| POLYLINE (face) | to geom3     | |

In addition, colors are converted using the AutoCad 2017 standard color index (256 colors).

Finally, there are many applications that can save to DXF formats. All testing is performed with files from AutoCad, period.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
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

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
