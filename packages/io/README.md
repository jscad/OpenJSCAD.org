# io

## Input Output format handling for the JSCAD projects

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Overview

This repository includes all the input/output format handling for the JSCAD projects, which can be used seperately.

### Input Format Handling (deserializers)

formatted data => scripts that produce JSCAD geometry

OR

formatted data => JSCAD geometry

Following formats are supported as inputs:
 - [AMF](https://github.com/jscad/io/blob/master/packages/amf-deserializer)
 - [DXF](https://github.com/jscad/io/blob/master/packages/dxf-deserializer)
 - [JSON](https://github.com/jscad/io/blob/master/packages/json-deserializer)
 - [OBJ](https://github.com/jscad/io/blob/master/packages/obj-deserializer)
 - [STL (binary, ASCII)](https://github.com/jscad/io/blob/master/packages/stl-deserializer)
 - [SVG](https://github.com/jscad/io/blob/master/packages/svg-deserializer)

### Output Format Handling (serializers)

JSCAD geometries => formatted data (blob)

Following formats are supported as outputs:
  - [AMF](https://github.com/jscad/io/blob/master/packages/amf-serializer)
  - [DXF](https://github.com/jscad/io/blob/master/packages/dxf-serializer)
  - [JSON](https://github.com/jscad/io/blob/master/packages/json-serializer)
  - [STL (binary, ASCII)](https://github.com/jscad/io/blob/master/packages/stl-serializer)
  - [SVG](https://github.com/jscad/io/blob/master/packages/svg-serializer)
  - [X3D](https://github.com/jscad/io/blob/master/packages/x3d-serializer)

## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

See the installation instructions of the specific package.

## License

[The MIT License (MIT)](https://github.com/jscad/io/blob/master/LICENSE)
(unless specified otherwise)
