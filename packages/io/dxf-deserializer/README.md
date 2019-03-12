## @jscad/dxf-deserializer

> DXF deserializer for the JSCAD project

[![GitHub version](https://badge.fury.io/gh/jscad%40jscad%2Fdxf-deserializer.svg)](https://badge.fury.io/gh/jscad%40jscad%2Fdxf-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/dxf-deserializer)

## Overview

This deserializer converts raw DXF data to JSCAD code fragments, or converts raw DXF data directy to CSG library objects. When converting unknown DXF data, converting to JSCAD code fragments will provide more information.

### DXF Implementation Notes

The [DXF(tm) file structure](http://docs.autodesk.com/ACD/2014/ENU/files/GUID-73E9E797-3BAA-4795-BBD8-4CE7A03E93CF.htm) changes continously as AutoDesk releases new features and fixes. So, you can imagine that after 20 years, the contents of DXF files are pretty messed up. Expect the worst.

**NOTE: At this time, only ASCII DXF files are supported. BINARY DXF files are not supported.**

This deserializer converts only what is required by JSCAD libraries and applications. Full document conversion is NOT supported, so don't even try. However, conversion of the following DXF entities are possible:

| DXF Entity      | CSG Object | Notes |
| --------------- | ---------- | ------ |
| 3DFACE          | to CSG     | |
| ARC             | to Path2D  | |
| CIRCLE          | to CAG     | Start and stop angles are ignored |
| ELLIPSE         | to CAG     | Start and stop angles are ignored |
| LINE            | to Line2D or Line3D | This will change in the future |
| LWPOLYLINE      | to Path2D or CAG  | Conversion to CAG if LWPOLYLINE is closed |
| MESH            | to CSG     | |
| POLYLINE (line) | to Path2D or CAG | Conversion to CAG if POLYLINE is closed |
| POLYLINE (mesh) | to CSG     | |
| POLYLINE (face) | to CSG     | |

In addition, colors are converted using the AutoCad standard color index (256 colors).

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
const deSerializer = require('@jscad/dxf-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.dxf')
const jscadCode = deSerializer(rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
