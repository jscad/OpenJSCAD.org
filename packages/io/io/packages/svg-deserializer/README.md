## @jscad/svg-deserializer

> svg deserializer for the jscad project

[![GitHub version](https://badge.fury.io/gh/jscad%40jscad%2Fsvg-deserializer.svg)](https://badge.fury.io/gh/jscad%40jscad%2Fsvg-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/svg-deserializer)

## Overview

This deserializer converts raw svg data to jscad code (that can be evaluated to CSG/CAG).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [Acknowledgements](#acknowledgements)
- [Sponsors](#sponsors)
- [License](#license)


## Installation

```
npm install @jscad/svg-deserializer
```

## Usage


```javascript
const svgDeSerializer = require('@jscad/svg-deserializer').deserialize

const rawData = fs.readFileSync('PATH/TO/file.svg')
const csgData = svgDeSerializer(rawData)

```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Acknowledgements

OpenJSCAD and its sub components are built upon great open source work, contribution & modules.

## Sponsors

* The upgrades (direct CSG output from this deserializer) and refactoring have been very kindly sponsored by [Copenhagen Fabrication / Stykka](https://www.stykka.com/)

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
