## io

## input output formats handling for the jscad project

[![GitHub version](https://badge.fury.io/gh/jscad%2Fio.svg)](https://badge.fury.io/gh/jscad%2Fio)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/io)

> Solid modeling library (2d & 3d)

## Overview

This repository includes all the input/output format handling for the jscad projects, and can also be used seperatly.

### Inputs

iefile data => CSG/CAG

Following formats are supported as inputs
 - [AMF](https://github.com/jscad/io/blob/master/src/parsers/parseAMF.js)
 - [gcode](https://github.com/jscad/io/blob/master/src/parsers/parseGCode.js)
 - [JSON](https://github.com/jscad/io/blob/master/src/parsers/parseJSON.js)
 - [OBJ]((https://github.com/jscad/io/blob/master/src/parsers/parseObj.js))
 - [STL (binary, ASCII)](https://github.com/jscad/io/blob/master/src/parsers/parseStl.js)
 - [SVG](https://github.com/jscad/io/blob/master/src/parsers/parseSVG.js)

### Outputs

ie: CSG/CAG => blob

Following formats are supported as outputs
  - [DXF](https://github.com/jscad/io/blob/master/src/writers/CAGToDxf.js)
  - [AMF](https://github.com/jscad/io/blob/master/src/writers/CSGToAMF.js)
  - [JSON(from CSG)](https://github.com/jscad/io/blob/master/src/writers/CSGToJson.js)
  - [JSON(from CAG)](https://github.com/jscad/io/blob/master/src/writers/CAGToJson.js)
  - [STL (ASCII)](https://github.com/jscad/io/blob/master/src/writers/CSGToStla.js)
  - [STL (binary)](https://github.com/jscad/io/blob/master/src/writers/CSGToStlb.js)
  - [X3D](https://github.com/jscad/io/blob/master/src/writers/CSGToX3D.js)

>Note: this repository would very likely benefit from becoming a monorepo (a repository containing multiple packages) for the various file formats.

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
