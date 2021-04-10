## @jscad/io

## input output formats handling for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fio.svg)](https://badge.fury.io/js/%40jscad%2Fio)

## Overview

This package is a metapackage and includes all the input/output format handling for the jscad projects, and can also be used separately.

### Inputs / deserializers

ie: file data => jscad code (that can be evaluated to geometry)

Following formats are supported as inputs
 - [AMF](../amf-deserializer)
 - [DXF](../dxf-deserializer)
 - [JSON](../json-deserializer)
 - [OBJ](../obj-deserializer)
 - [STL (binary, ASCII)](../stl-deserializer)
 - [SVG](../svg-deserializer)

### Outputs/ serializers

ie: geometry => blob

Following formats are supported as outputs
  - [AMF](../amf-serializer)
  - [DXF](../dxf-serializer)
  - [JSON](../json-serializer)
  - [STL (binary, ASCII)](../stl-serializer)
  - [SVG](../svg-serializer)
  - [X3D](../x3d-serializer)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
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

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD.org User Guide](https://www.openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](../../../../LICENSE)
(unless specified otherwise)
