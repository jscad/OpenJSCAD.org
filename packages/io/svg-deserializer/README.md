## @jscad/svg-deserializer

> Deserializer of SVG data to JSCAD scripts or geometries

[![npm version](https://badge.fury.io/js/%40jscad%2Fsvg-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fsvg-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/svg-deserializer)

## Overview

This deserializer converts raw SVG formatted data (files) to JSCAD scripts or geometries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/svg-deserializer
```

## Usage

```javascript
const svgDeserializer = require('@jscad/svg-deserializer').deserialize

const rawData = fs.readFileSync('PATH/TO/file.svg')
const geometry = svgDeserializer.deserialize(rawData, 'file.svg', {output: 'geometry'})

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of JSCAD for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
