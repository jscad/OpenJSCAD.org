## io

## input output formats handling for the jscad project

[![GitHub version](https://badge.fury.io/gh/jscad%2Fio.svg)](https://badge.fury.io/gh/jscad%2Fio)

## Overview

This package is a metapackage and includes all the input/output format handling for the jscad projects, and can also be used separately.

### Inputs / deserializers

ie: file data => jscad code (that can be evaluated to CSG/CAG)
> note : currently serializers & deserializers are NOT symetrical as deserializers
do not generate CSG/CAG objects

Following formats are supported as inputs
 - [AMF](https://github.com/jscad/io/blob/master/packages/amf-deserializer)
 - [gcode](https://github.com/jscad/io/blob/master/packages/gcode-deserializer)
 - [JSON](https://github.com/jscad/io/blob/master/packages/json-deserializer)
 - [OBJ](https://github.com/jscad/io/blob/master/packages/obj-deserializer)
 - [STL (binary, ASCII)](https://github.com/jscad/io/blob/master/packages/stl-deserializer)
 - [SVG](https://github.com/jscad/io/blob/master/packages/svg-deserializer)

### Outputs/ serializers

ie: CSG/CAG => blob

Following formats are supported as outputs
  - [AMF](https://github.com/jscad/io/blob/master/packages/amf-serializer)
  - [DXF](https://github.com/jscad/io/blob/master/packages/dxf-serializer)
  - [JSON](https://github.com/jscad/io/blob/master/packages/json-serializer)
  - [STL (binary, ASCII)](https://github.com/jscad/io/blob/master/packages/stl-serializer)
  - [SVG](https://github.com/jscad/io/blob/master/packages/svg-serializer)
  - [X3D](https://github.com/jscad/io/blob/master/packages/x3d-serializer)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/io
```

## Usage

- as Node module :

```
const io = require('@jscad/io')
```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](https://github.com/jscad/io/blob/master/LICENSE)
(unless specified otherwise)
