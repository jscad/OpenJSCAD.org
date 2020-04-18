## @jscad/stl-serializer

> Serializer of CSG geometries to STL mesh

[![npm version](https://badge.fury.io/js/%40jscad%2Fstl-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fstl-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/stl-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more CSG geometries.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/stl-serializer
```

## Usage

```javascript
const stlSerializer = require('@jscad/stl-serializer')

const rawData = stlSerializer.serialize({binary: true}, geometry)

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
