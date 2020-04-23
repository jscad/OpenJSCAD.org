## @jscad/io

## input output formats handling for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fio.svg)](https://badge.fury.io/js/%40jscad%2Fio)

## Overview

This package is a metapackage and includes all the input/output format handling for the jscad projects, and can also be used separately.

### Inputs / deserializers

ie: file data => jscad code (that can be evaluated to CSG/CAG)
> note : currently serializers & deserializers are NOT symetrical as deserializers
do not generate CSG/CAG objects

Following formats are supported as inputs
 - [AMF](https://github.com/jscad/io/blob/master/packages/amf-deserializer)
 - [DXF](https://github.com/jscad/io/blob/master/packages/dxf-deserializer)
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

* If you want to submit a change or a patch, please read the [Contributing Guide](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/io/blob/master/LICENSE)
(unless specified otherwise)
