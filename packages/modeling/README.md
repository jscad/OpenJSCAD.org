# @jscad/modeling

## Modeling Library for JSCAD

[![GitHub version](https://badge.fury.io/gh/jscad%2Fmodeling.js.svg)](https://badge.fury.io/gh/jscad%2Fmodeling.js)
[![Build Status](https://travis-ci.org/jscad/modeling.js.svg)](https://travis-ci.org/jscad/modeling.js)

> Solid Modelling Library for 2D and 3D Geometries

## Overview

This library contains boolean operations based on Constructive Solid Geometry (CSG). CSG is a modelling technique that uses boolean operations like union and intersection to combine 3D solids. This library implements CSG operations on meshes elegantly and concisely using BSP trees, and is meant to serve as an easily understandable implementation of the algorithm.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Copyrights](#copyrights)
- [License](#license)

## Installation

```
npm install @jscad/modeling
```

## Usage

As a Node module:

```
const {color, connectors, geometry, math, primitives, text, utils} = require('@jscad/modeling')
const {booleans, expansions, extrusions, hulls, measurements, transforms} = require('@jscad/modeling')
```

## Documentation

The API Reference can be found [here](https://www.openjscad.xyz/docs).

- [JSCAD User Guide](https://www.openjscad.xyz/guide.html)

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://www.openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Community

See for more details
* [JSCAD User Group](https://openjscad.xyz/forum.html)

## Copyrights

Some copyrights apply from integration of original libraries.

CSG Library : Copyright (c) 2012 Joost Nieuwenhuijse, under the MIT license. Copyright (c) 2011 Evan Wallace, under MIT license.

Portions of glMatrix Library: Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV, under MIT license.

Quickhull Library: Copyright (c) 2015 Mauricio Poppe, under the MIT license.

## License

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
