## @jscad/gcode-deserializer

> gcode deserializer for the jscad project

[![GitHub version](https://badge.fury.io/gh/jscad%40jscad%2Fgcode-serializer.svg)](https://badge.fury.io/gh/jscad%40jscad%2Fgcode-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/gcode-deserializer)

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

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
