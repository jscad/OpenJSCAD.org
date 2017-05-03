## @jscad/svg-serializer

> svg serializer for the jscad project (from CSG)

[![GitHub version](https://badge.fury.io/gh/jscad%40jscad%2Fsvg-serializer.svg)](https://badge.fury.io/gh/jscad%40jscad%2Fsvg-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/svg-serializer)

## Overview

This serializer outputs a 'blobable' array of data (from a CAG object)
ie an array that can either be passed directly to a Blob (`new Blob(blobable)`)
or converted to a Node.js buffer.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/svg-serializer
```

## Usage


```javascript
const svgSerializer = require('@jscad/svg-serializer')

const rawData = svgSerializer(CAGObject)

//in browser (with browserify etc)
const blob = new Blob(rawData)

```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
