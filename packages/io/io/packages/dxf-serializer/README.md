## @jscad/dxf-serializer

> dxf serializer for the jscad project (from CSG)

[![npm version](https://badge.fury.io/js/%40jscad%2Fdxf-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fdxf-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/dxf-serializer)

## Overview

This serializer outputs a 'blobable' array of data (from a CSG object)
ie an array that can either be passed directly to a Blob (`new Blob(blobable)`)
or converted to a Node.js buffer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/dxf-serializer
```

## Usage


```javascript
const dxfSerializer = require('@jscad/dxf-serializer').serialize

const rawData = dxfSerializer(CSGObject)

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
