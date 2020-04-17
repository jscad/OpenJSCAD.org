## @jscad/obj-deserializer

> Deserializer for OBJ data to JSCAD geometries

[![npm version](https://badge.fury.io/js/%40jscad%2Fobj-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fobj-deserializer)
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
- [Contribute](#contribute)
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

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
