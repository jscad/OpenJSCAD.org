## @jscad/io-utils

> input/output handling utilities

[![npm version](https://badge.fury.io/js/%40jscad%2Fio-utils.svg)](https://badge.fury.io/js/%40jscad%2Fio-utils)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/io-utils)

## Overview

This contains following utilities:

- makeBlob : converts arrays of raw data output by the various serializers into
a Blob that can also be converted to Node.js buffer

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


## Installation

```
npm install @jscad/io-utils
```

## Usage


```javascript
const {makeBlob} = require('@jscad/io-utils')
const stlSerializer = require('@jscad/stl-serializer')

const rawData = stlSerializer(CSGObject)

const blob = new makeBlob(rawData)
//get a Node.js buffer
const buffer = blob.asBuffer()

```


## Contribute

For questions about the API, please contact the [User Group](https://plus.google.com/communities/114958480887231067224)

PRs accepted.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)
