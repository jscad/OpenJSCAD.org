## @jscad/dxf-serializer

> Serializer of CSG geometries to DXF entities

[![npm version](https://badge.fury.io/js/%40jscad%2Fdxf-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fdxf-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/dxf-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more CSG geometries. Currently, only TEXT output is supported.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 2D geometry (geom2) to DXF LWPOLYLINE or POLYLINE
- serialization of 3D geometry (geom3) to DXF 3DFACE(s)
- serialization of 2D paths (path2) to DXF LWPOLYLINE or POLYINE

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/dxf-serializer
```

## Usage

```javascript
const dxfSerializer = require('@jscad/dxf-serializer')

const rawData = dxfSerializer.serialize({}, geometry)

//in browser (with browserify etc)
const blob = new Blob(rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
