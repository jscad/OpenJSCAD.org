# OpenJSCAD.org
<img src="doc/logo.png" width=256 align=right>

>*OpenJsCad.org* is a more up-to-date [OpenJsCAD](http://joostn.github.com/OpenJsCad/) frontend where you can edit .jscad files either locally or online via JS editor (built-in).
A few functions are available to make the transition from [OpenSCAD](http://openscad.org/) to OpenJSCAD easier ([OpenSCAD.jscad](https://github.com/jscad/OpenSCAD.jscad) built-in),
as well CLI (command-line interface) for server-side computations with NodeJS.

[![GitHub version](https://badge.fury.io/gh/jscad%2FOpenJSCAD.org.svg)](https://badge.fury.io/gh/jscad%2FOpenJSCAD.org)
[![experimental](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Contribute](#contribute)
- [Community](#community)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Screenshots](#screenshots)
- [See also](#see-also)

## Usage

### Immediate Use (no installation)

Go to *[OpenJSCAD.org](http://openjscad.org)* (Tested browsers include Chrome, Firefox, Opera, Safari)

### Use within a Web Site (pre built files)

```
cd base-directory-of-website
git clone https://github.com/jscad/OpenJSCAD.org
cd OpenJSCAD.org
<start a web server here>
```
And then access the contents via the URL of the web-site.
  * index.html for the standard version
  * viewer-minimal.html for the barebones viewer
  * viewer-options.html for the 'all options' variant of the above

>NOTE: You might need configuration changes to allow access to the some of the contents (examples etc).

### Use as Command Line Interface (CLI)

For CLI(command-line interface) use

```
 npm install -g @jscad/openjscad
```

> Note: you need a recent , LTS version of [Node.js](http://nodejs.org/) > 6.x.x
> An easy way to install any Node.js version is to use [NVM](https://github.com/creationix/nvm)

you can now turn the examples (or your own designs) into stl etc files as follows :
```
% cd examples/
% openjscad example005.jscad                         # -- creates example005.stl as default
% openjscad example001.jscad -o test.stl
% openjscad example001.scad -o example001scad.jscad  # -- convert .scad into .jscad
% openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad
% openjscad logo.jscad -of amf                       # -- convert logo.jscad into logo.amf
```

### Use with Node Modules

> Note: you need a recent , LTS version of Node.js > 6.x.x,
[see here for more details](https://github.com/nodejs/LTS))

```
npm install --save @jscad/openjscad
```

and then simply import and use openjscad:

```javascript
const jscad = require('@jscad/openjscad')
const fs = require('fs')

var script = `function main() {
   return [
      torus()
  ]
}`

// generate compiled version
var params = {}
var compiled = jscad.compile(script, params)
// generate final output data, choosing your prefered format
var outputData = jscad.generateOutput('stlb', compiled)

// hurray ,we can now write an stl file from our OpenJsCad script!
fs.writeFileSync('torus.stl', outputData.asBuffer())
```

you can also use the 'generateOutput' function directly with CSG/CAG objects ie :

```javascript
const csg = require('csg').CSG
const input = csg.cube([1, 1, 1]) // one of many ways to create a CSG object

const outputData = jscad.generateOutput('stlb', input)

// hurray ,we can now write an stl file from our raw CSG objects
fs.writeFileSync('torus.stl', outputData.asBuffer())
```

#### Module api

**compile(params, source)**

 compile OpenJsCad code and generates CSG representation
 this returns a promise that gets resolved with the CSG object.

 (the ordering of parameters was created with currying in mind)

 *params* the set of parameters to use
 *source* the OpenJsCad script we want to compile


**generateOutput(outputFormat, csgs)**

generate output data from a CSG/CAG object or array of CSG/CAG objects

 *outputFormat* the output file format
 *csgs* the CSG/CAG object or array of CSG/CAG objects

>Note: for now you need to use outputData.asBuffer() to get a Node.js buffer for
writing to disk etc


### Use of the different modular components directly

From version 1.0.0 onwards, almost all the individual parts of this project are available
directly as scoped NPM modules , and can be used independently from this repo.
The full list of these is available here: https://www.npmjs.com/org/jscad

One example of what can be achieved with this can be found [here](https://esnextb.in/?gist=0a2ac2c4e189e27692ea964956a3a2e5)
This means you can :
- easily create your own renderer for the CSG/Cag data structures
- create custom UIs
- use the different parts in Node.js or the Browser
- cherry pick what formats you want to use for input/output without needing the
dependencies of **all** packages
- lots more !

This will be expanded upon in the future, and is the backbone of the newer, modular Jscad

## Contribute

OpenJSCAD.org is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please see the [Contributing guidelines](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use the OpenJSCAD.org, then please start a conversation at the [OpenJSCAD.org User Group](https://plus.google.com/communities/114958480887231067224). You might find the answer in the [OpenJSCAD.org User Guide](https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://plus.google.com/communities/114958480887231067224) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Documentation

- [OpenJSCAD User & Programming Guide](https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide)
- [OpenJSCAD Quick Reference](https://en.wikibooks.org/wiki/OpenJSCAD_Quick_Reference)

## Community

See for more details
* [G+ OpenJSCAD.org Announcements](https://plus.google.com/115007999023701819645)
* [G+ OpenJSCAD Community](https://plus.google.com/communities/114958480887231067224)
to discuss with other user and developers.

## Acknowledgements

OpenJSCAD and its sub components are built upon great open source work, contribution & modules
- [csg.js](https://github.com/jscad/csg.js) core & improvements by
Evan Wallace,
Eduard Bespalov,
Joost Nieuwenhuijse,
Alexandre Girard

For input/output
- [xmldom](https://github.com/jindw/xmldom)
- [sax](https://github.com/isaacs/sax-js)

Tooling:
- [browserify](http://browserify.org/)
- [babel](https://babeljs.io/)

and many more!

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)

## Screenshots

Simple JSCAD example ([logo.jscad](examples/logo.jscad)) [try it](http://openjscad.org/#examples/logo.jscad):
<img src="doc/sshot-01.png">

More sophisticated JSCAD example, with functions dedicated to object generation and with interactive parameters ([gear.jscad](examples/gear.jscad)) [try it](http://openjscad.org/#examples/gear.jscad) :
<img src="doc/sshot-03-illu.png">

Import of STL models ([frog-OwenCollins.stl](examples/frog-OwenCollins.stl)) [try it](http://openjscad.org/#examples/frog-OwenCollins.stl):
<img src="doc/sshot-04.png">

Drag & drop a local file:
<img src="doc/sshot-05-illu.png">

Drag & drop multiple files (Chrome & Firefox) or a folder (Chrome):
<img src="doc/sshot-06-illu.png">

## See Also

- [OpenJsCAD](http://joostn.github.com/OpenJsCad/), starting point of OpenJSCAD.org
- [OpenSCAD.net](http://garyhodgson.github.com/openscad.net/), another place of inspiration, where the OpenSCAD translator was adapted from
- [CoffeeSCad](http://kaosat-dev.github.com/CoffeeSCad/), JavaScript simplified (no more {}) (defunct)
- [stl2pov](http://rsmith.home.xs4all.nl/software/py-stl-stl2pov.htmltool) to convert .stl to .pov, and then render via [PovRay.org](http://povray.org)
- [P3D](https://github.com/D1plo1d/p3d) STL/AMF/OBJ viewer

That's all for now,

Rene K. Mueller, Jeff Gay, Mark Moissette & JSCAD Organization
