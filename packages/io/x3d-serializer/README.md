## @jscad/x3d-serializer

> Serializer of CSG geometries to X3D shapes

[![npm version](https://badge.fury.io/js/%40jscad%2Fx3d-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fx3d-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/x3d-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more CSG geometries.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 3D geometry (geom3) to X3D indexed triangle sets

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/x3d-serializer
```

## Usage

```javascript
const x3dSerializer = require('@jscad/x3d-serializer')

const rawData = x3dSerializer.serialize({unit: 'inch'}, geometry)

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
