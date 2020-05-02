## @jscad/gcode-deserializer

> gcode deserializer for the jscad project

[![npm version](https://badge.fury.io/js/%40jscad%2Fgcode-deserializer.svg)](https://badge.fury.io/js/%40jscad%2Fgcode-deserializer)
[![Build Status](https://travis-ci.org/jscad/io.svg)](https://travis-ci.org/jscad/gcode-deserializer)

## NOTICE

As of 2020, **THIS DESERIALIZER IS DEPRECATED**
Ff you want to bring back the provided functionality in an up-to-date manner, please create a PR, thank you !

## Overview

This deserializer converts raw gcode data to jscad code (that can be evaluated to CSG/CAG).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install @jscad/gcode-deserializer
```

## Usage

```javascript
const gcodeDeSerializer = require('@jscad/gcode-deserializer')

const rawData = fs.readFileSync('PATH/TO/file.gcode')
const csgData = gcodeDeSerializer(rawData)

```

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
