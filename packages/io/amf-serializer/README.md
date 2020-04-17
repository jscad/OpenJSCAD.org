## @jscad/amf-serializer

> Serializer of JSCAD geometries to AMF shapes

[![npm version](https://badge.fury.io/js/%40jscad%2Famf-serializer.svg)](https://badge.fury.io/js/%40jscad%2Famf-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/amf-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more JSCAD geometries. Only XML output is supported.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 3D geometry (geom3) to AMF geometry (non-overlapping volumes)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/amf-serializer
```

## Usage

```javascript
const amfSerializer = require('@jscad/amf-serializer')

const rawData = amfSerializer.serialize({unit: inch}, geometry)

//in browser (with browserify etc)
const blob = new Blob(rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
