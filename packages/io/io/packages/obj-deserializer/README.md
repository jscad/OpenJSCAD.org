## @jscad/obj-deserializer

> obj deserializer for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fobj-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fobj-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/obj-deserializer)

## Overview

This deserializer converts raw obj data to jscad code (that can be evaluated to CSG/CAG).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/obj-deserializer
```

## Usage


```javascript
const objDeSerializer = require('@jscad/obj-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.obj')
const csgData = objDeSerializer.deserialize(rawData, undefined, {output: 'csg'})

```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
