## @jscad/dxf-serializer

> Serializer of JSCAD geometries to DXF entities

[![NPM version](https://badge.fury.io/js/%40jscad%2Fdxf-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fdxf-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/dxf-serializer)

## Overview

This serializer outputs a 'blobable' array of data from one or more JSCAD geometries. Currently, only DXF TEXT output is supported.
The array of data can either be used to create a Blob (`new Blob(blobable)`), or converted to a Node.js buffer.

The serialization of the following geometries are possible.
- serialization of 2D geometry (geom2) to DXF LWPOLYLINE or POLYLINE
- serialization of 3D geometry (geom3) to DXF 3DFACE(s)
- serialization of 2D paths (path2) to DXF LWPOLYLINE or POLYINE

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/dxf-serializer
```

## Usage

```javascript
const dxfSerializer = require('@jscad/dxf-serializer')

const rawData = dxfSerializer.serialize({}, geometry)

//in browser (with browserify etc)
const blob = new Blob(rawData)

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

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
