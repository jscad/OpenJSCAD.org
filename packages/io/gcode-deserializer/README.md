## @jscad/gcode-deserializer

> gcode deserializer for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fgcode-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fgcode-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/gcode-deserializer)

## NOTICE

As of 2020, **THIS DESERIALIZER IS DEPRECATED**
Ff you want to bring back the provided functionality in an up-to-date manner, please create a PR, thank you !

## Overview

This deserializer converts raw gcode data to jscad code (that can be evaluated to CSG/CAG).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/gcode-deserializer
```

## Usage


```javascript
const gcodeDeSerializer = require('@jscad/gcode-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.gcode')
const csgData = gcodeDeSerializer(rawData)

```


## Contribute

For questions about the API, please contact the [User Group](https://jscad.xyz/forum)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
