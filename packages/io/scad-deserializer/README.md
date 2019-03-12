## openscad-openjscad-translator

[![GitHub version](https://badge.fury.io/gh/jscad%2Fopenscad-openjscad-translator.svg)](https://badge.fury.io/gh/jscad%2Fopenscad-openjscad-translator)
[![experimental](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![Build Status](https://travis-ci.org/jscad/openscad-openjscad-translator.svg)](https://travis-ci.org/jscad/openscad-openjscad-translator)
[![Dependency Status](https://david-dm.org/jscad/openscad-openjscad-translator.svg)](https://david-dm.org/jscad/openscad-openjscad-translator)
[![devDependency Status](https://david-dm.org/jscad/openscad-openjscad-translator/dev-status.svg)](https://david-dm.org/jscad/openscad-openjscad-translator#info=devDependencies)

## OpenSCAD to OpenJSCAD Translator

> Translates OpenSCAD syntax into OpenJsCAD syntax

## Overview

Node module that translates [OpenSCAD syntax](http://www.openscad.org/) into [OpenJSCAD syntax](https://github.com/jscad/OpenJSCAD.org/).

**_IMPORTANT NOTE:_ This project is written against an older version of OpenSCAD (v 2011.06) which has now been superseded.**

The following functions are not implemented (neither in csg.js nor in OpenJSCAD),
and contributions are welcome !
- [ ] [assign statement](https://github.com/jscad/openscad-openjscad-translator/issues/12)
- [ ] [minkowski](https://github.com/jscad/openscad-openjscad-translator/issues/11)
- [ ] [hull](https://github.com/jscad/openscad-openjscad-translator/issues/13)

## Table of Contents

- [Installation](#install)
- [Usage](#usage)
- [Build](#build)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install @jscad/openscad-openjscad-translator
```

>NOTE: for now we need to use a temporary build of the sylvester (node-sylvester)
library since the one on NPM has a missing flag which makes use with browserify impossible:
see : [here](https://github.com/NaturalNode/node-sylvester/issues/9) and [here](https://github.com/NaturalNode/node-sylvester/issues/4)

## Usage

### Node

```javascript
  var parser = require('@jscad/openscad-openjscad-translator')
  var fs = require('fs')

  var openSCADText = fs.readFileSync("test.scad", "UTF8")
  var openJSCADResult = parser.parse(openSCADText)

  console.log(openJSCADResult)
```

### Web

```html
  <script src="../dist/web-built.js"></script>

  <script type="text/javascript">
    var text = document.getElementById('txt').innerText
    console.log(openscadOpenJscadParser.parse(text))
  </script>
```

Include ```lib/underscore.js``` and ```dist/web-built.js``` and the **openscadOpenJscadParser** object will be available.  This has two attributes:
* **parse** - a function which accepts OpenSCAD text and returns OpenJsCAD text.
* **parser** - a Jison parser object which can be used for more advanced parsing (e.g. the **parse** method returns the text and the context object, allowing for processing of *use* statements.)

## Build

### Web

not minified :
```
npm run build
```
minified:
```
npm run build-min
```
Creates scripts in the ```dist``` folder.

## Develop

### Jison

```
npm run build-parser
```
Compiles the Jison lexer/parser to an AMD module in the ```src``` folder called ```openscad-parser.js```.

## Contribute

This library is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/openscad-openjscad-translator/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/openscad-openjscad-translator/issues/) via GitHub.

* If you want to submit a change or a patch, please see the [Contributing guide](https://github.com/z3dev/openscad-openjscad-translator/blob/master/CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/openscad-openjscad-translator/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use OpenJSCAD, then please start a conversation at the [OpenJSCAD.org User Group](https://plus.google.com/communities/114958480887231067224). You might find the answer in the [OpenJSCAD.org User Guide](https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://plus.google.com/communities/114958480887231067224) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[The MIT License (MIT)](https://github.com/jscad/openscad-openjscad-translator/blob/master/LICENSE)
(unless specified otherwise)

_NOTE: OpenSCAD and OpenSCAD API are released under the General Public License version 2._
