## @jscad/stl-deserializer

> Deserializer of STL data to CSG geometries

[![npm version](https://badge.fury.io/js/%40jscad%2Fstl-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fstl-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/stl-deserializer)

## Overview

This deserializer converts raw STL formatted data (files) to JSCAD scripts or CSG geometries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/stl-deserializer
```

## Usage

```javascript
const stlDeserializer = require('@jscad/stl-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.stl')
const geometry = stlDeserializer.deserialize(rawData, 'file.stl', {output: 'csg'})

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
