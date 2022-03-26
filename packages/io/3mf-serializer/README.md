## @jscad/3mf-serializer

> Serializer of JSCAD geometries to 3MF shapes

[![npm version](https://badge.fury.io/js/%40jscad%2F3mf-serializer.svg)](https://badge.fury.io/js/%40jscad%2F3mf-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/3mf-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more JSCAD geometries. Only XML output is supported.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 3D geometry (geom3) to 3MF mesh(s)

In addition, both color and name attributes are converted to 3MF attributes if found on the JSCAD geometry.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/3mf-serializer
```

## Usage

```javascript
const { serialize } = require('@jscad/3mf-serializer')

const rawData = serialize({unit: inch}, geometry)

//in browser (with browserify etc)
const blob = new Blob(rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://openjscad.xyz/forum.html)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
