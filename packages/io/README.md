# io

> Input/Output format handling for the JSCAD projects

## Overview

This repository includes all the input/output format handling for the JSCAD projects, which can be used seperately.

### Input Format Handling (deserializers)

formatted data => scripts that produce JSCAD geometry

OR

formatted data => JSCAD geometry

Following formats are supported as inputs:
 - [AMF](./amf-deserializer)
 - [DXF](./dxf-deserializer)
 - [JSON](./json-deserializer)
 - [OBJ](./obj-deserializer)
 - [STL (binary, ASCII)](./stl-deserializer)
 - [SVG](./svg-deserializer)

### Output Format Handling (serializers)

JSCAD geometries => formatted data (blob)

Following formats are supported as outputs:
 - [AMF](./amf-serializer)
 - [DXF](./dxf-serializer)
 - [JSON](./json-serializer)
 - [OBJ](./obj-serializer)
 - [STL (binary, ASCII)](./stl-serializer)
 - [SVG](./svg-serializer)
 - [X3D](./x3d-serializer)

## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

See the installation instructions of the specific package.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
