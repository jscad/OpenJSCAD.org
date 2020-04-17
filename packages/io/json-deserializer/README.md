## @jscad/json-deserializer

> Deserializer of JSON (JavaScript Object Notation) to JSCAD geometries

[![npm version](https://badge.fury.io/js/%40jscad%2Fjson-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fjson-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/json-deserializer)

## Overview

This deserializer converts JSON data (files) to JSCAD scripts or geometries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm install @jscad/json-deserializer
```

## Usage

```javascript
const jsonDeSerializer = require('@jscad/json-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.json')
const geometries = jsonDeSerializer.deserialize({output: 'geometry'}, rawData)

```

## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

Please see the README information of the OpenJSCAD.org project for how to submit bug reports or changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
