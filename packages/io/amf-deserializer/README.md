## @jscad/amf-deserializer

> Deserializer of AMF data to JSCAD geometries

[![npm version](https://badge.fury.io/js/%40jscad%2Famf-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Famf-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/amf-deserializer)

## Overview

This deserializer converts raw AMF formatted data (files) to JSCAD scripts or geometries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/amf-deserializer
```

## Usage

```javascript
const amfDeSerializer = require('@jscad/amf-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.amf')
const jscadScript = amfDeSerializer.deserialize(rawData, 'file.amf', {output: 'jscad'})
```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of JSCAD for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
