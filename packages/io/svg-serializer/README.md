## @jscad/svg-serializer

> Serializer of JSCAD geometries to SVG commands

[![npm version](https://badge.fury.io/js/%40jscad%2Fsvg-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fsvg-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/svg-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more JSCAD geometries.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 2D geometry (geom2) to continous SVG paths
- serialization of 2D paths (path2) to individual SVG paths

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/svg-serializer
```

## Usage

```javascript
const svgSerializer = require('@jscad/svg-serializer')

const rawData = svgSerializer.serialize({unit: 'cm'}, object)

// within a browser (with browserify etc)
const blob = new Blob(rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of JSCAD for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
