## @jscad/json-deserializer

> json deserializer for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fjson-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fjson-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/json-deserializer)

## Overview

This deserializer converts raw json data to jscad code (that can be evaluated to CSG/CAG).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/json-deserializer
```

## Usage


```javascript
const jsonDeSerializer = require('@jscad/json-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.json')
const csgData = jsonDeSerializer.deserialize(rawData, undefined, {output: 'csg'})

```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
