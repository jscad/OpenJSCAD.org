# OpenJSCAD.org
<img src="doc/logo.png" width=256 align=right>

>*OpenJsCad.org* is a more up-to-date [OpenJsCAD](http://joostn.github.com/OpenJsCad/) frontend where you can edit .jscad files either locally or online via JS editor (built-in).

There are many ways to use OpenJSCAD! 
Self hosteable web based ui, an online version, an experimental desktop app
as well as CLI (command-line interface) for server-side computations with NodeJS.

[![Backers on Open Collective](https://opencollective.com/openjscad/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/openjscad/sponsors/badge.svg)](#sponsors) [![GitHub version](https://badge.fury.io/gh/jscad%2FOpenJSCAD.org.svg)](https://badge.fury.io/gh/jscad%2FOpenJSCAD.org)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

## Table of Contents

- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Known issues](#known-issues)
- [Contribute](#contribute)
- [Community](#community)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Screenshots](#screenshots)
- [See also](#see-also)

## Usage

There are different 'flavors' of OpenJscad that you can use based on your needs
- web: online (no install) simply go to [https://openjscad.org/](https://openjscad.org/)
- web: self hosted: can be found [here](./packages/web)
- cli: command line interface : can be found [here](./packages/cli)
- desktop app: pre pre alpha work in progress can be found [here](https://github.com/jscad/jscad-desktop)!
- node.js: custom mix & match of modules
  * all the packages are available [on npm](https://www.npmjs.com/search?q=%40jscad) under the '@jscad' name 
  * Geometric [core & modeling api](https://github.com/jscad/csg.js)
  * Input/output [formats handling stl, amf dxf, svg](https://github.com/jscad/io/tree/master/packages) 

### Immediate Use (no installation)

Go to *[OpenJSCAD.org](http://openjscad.org)* (Tested browsers include Chrome, Firefox, Opera, Safari)

### Use within a Web Site (pre built files, from github)

please see [here for details](./packages/web/README.md)

### Use as Command Line Interface (CLI)

please see [here for details](./packages/cli/README.md)

### Use with Node Modules

> Note: you need a recent , LTS version of Node.js > 6.x.x,
[see here for more details](https://github.com/nodejs/LTS))
all the same installation & version recomendation as for the use as command-line also apply

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
jscad.compile(script, params).then(function(compiled) {
  // generate final output data, choosing your prefered format
  var outputData = jscad.generateOutput('stlb', compiled)
  // hurray ,we can now write an stl file from our OpenJsCad script!
  fs.writeFileSync('torus.stl', outputData.asBuffer())
})

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


## Development

We offer pre-built versions of OpenJSCAD web ui to be used directly here :
- [standard](./packages/web/dist/index.js)
- [minimalist](./packages/web/dist/min.js)
- [with options](./packages/web/dist/options.js)

but you can also rebuild them manually if you need :

- standard: ```npm run build-web```
- minimalist: ```npm run build-min```
- with options: ```npm run build-opt```


### Adding new features in CSG.js or other modules:
Since OpenJSCAD is made up of multiple dependent modules (csg.js, openscad-openjscad-translator etc),
the easiest method is to use ```npm link``` to have a 'live' updating development version of OpenJSCAD:
- create a base directory
- clone this repository ```git clone https://github.com/jscad/OpenJSCAD.org.git```
- go into OpenJSCAD.org folder ```cd OpenJSCAD.org```
- install dependencies ```npm install```
- if desired, make the ```openjscad``` command refer to the code in this folder: ```npm link```
- if desired, start dev server: ```npm run start-dev```

Then, for example for CSG.js:
- go back to base directory ```cd ..```
- clone CSG.js ```git clone https://github.com/jscad/csg.js.git```
- go into OpenJSCAD.org folder again ```cd OpenJSCAD.org```
- now type ```npm link ../csg.js``` to make @jscad/csg refer to local ../csg.js.

You can now make changes to the CSG.js code and see it impact your locally running
copy of OpenJSCAD live.

## Documentation

- [OpenJSCAD User & Programming Guide](https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide)
- [OpenJSCAD Quick Reference](https://en.wikibooks.org/wiki/OpenJSCAD_Quick_Reference)

## Known Issues

There are a few known issues, please be sure to check this out before submitting additional bug reports/issues.

- Q: issues running certain npm commands like ```npm run build-web``` with [cnpm](https://github.com/cnpm/cnpm)
- A: this is a [know issue in cnpm](https://github.com/cnpm/cnpm/issues/214) , see [issue #283](https://github.com/jscad/OpenJSCAD.org/issues/283) for more information

- Q: Attempting to use OpenJSCAD from file:// in Chrome results in errors like
"File Error: [EncodingError] Please check permissions error."
- A: This is a permissions issue in Chrome :  restart chrome using the "--allow-file-access-from-files" option

## Contribute

OpenJSCAD.org is part of the JSCAD Organization, and is maintained by a group of volunteers. We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

Thank you to all the people who have already contributed to this project:
<a href="graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" /></a>

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please see the [Contributing guidelines](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use the OpenJSCAD.org, then please start a conversation at the [OpenJSCAD.org User Group](https://plus.google.com/communities/114958480887231067224). You might find the answer in the [OpenJSCAD.org User Guide](https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://plus.google.com/communities/114958480887231067224) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

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

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/openjscad#backer)]

<a href="https://opencollective.com/openjscad#backers" target="_blank"><img src="https://opencollective.com/openjscad/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/openjscad#sponsor)]

<a href="https://opencollective.com/openjscad/sponsor/0/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/1/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/2/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/3/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/4/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/5/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/6/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/7/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/8/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/openjscad/sponsor/9/website" target="_blank"><img src="https://opencollective.com/openjscad/sponsor/9/avatar.svg"></a>



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
