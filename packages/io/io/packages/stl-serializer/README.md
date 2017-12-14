## @jscad/stl-serializer

> stl serializer for the jscad project (from CSG)

[![npm version](https://badge.fury.io/js/%40jscad%2Fstl-serializer.svg)](https://badge.fury.io/js/%40jscad%2Fstl-serializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/stl-serializer)

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
npm install @jscad/stl-serializer
```

## Usage


```javascript
const stlSerializer = require('@jscad/stl-serializer')

const rawData = stlSerializer.serializ(CSGObject)

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
