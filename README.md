# OpenJSCAD.org
<img src="doc/logo.png" width=256 align=right>

>*OpenJsCad.org* is a more up-to-date [OpenJsCAD](http://joostn.github.com/OpenJsCad/) frontend where you can edit .jscad files either locally or online via JS editor (built-in).
A few functions are available to make the transition from [OpenSCAD](http://openscad.org/) to OpenJSCAD easier ([OpenSCAD.jscad](https://github.com/Spiritdude/OpenSCAD.jscad) built-in),
as well CLI (command-line interface) for server-side computations with NodeJS.

[![GitHub version](https://badge.fury.io/gh/Spiritdude%2FOpenJSCAD.org.svg)](https://badge.fury.io/gh/Spiritdude%2FOpenJSCAD.org)
[![experimental](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![Build Status](https://travis-ci.org/Spiritdude/OpenJSCAD.org.svg)](https://travis-ci.org/Spiritdude/OpenJSCAD.org)
[![Dependency Status](https://david-dm.org/Spiritdude/OpenJSCAD.org.svg)](https://david-dm.org/Spiritdude/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/Spiritdude/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/Spiritdude/OpenJSCAD.org#info=devDependencies)



## Table of Contents

- [Installation](#installation)
- [History](#History)
- [Community](#Community)
- [Todo](#todo)
- [Documentation](#Documentation)
- [Screenshots](#Screenshots)
- [Contribute](#contribute)
- [License](#license)
- [See also](#Also)

## Installation

### Immediate Use (no installation)

go to *[OpenJSCAD.org](http://openjscad.org)* (Google Chrome, Firefox)

### Local Web Use

```
% git clone https://github.com/Spiritdude/OpenJSCAD.org
% cd OpenJSCAD.org
% make install
```

and then access the files via local web-site and your web-browser.


### Local CLI Use

For CLI (command-line interface) rendering install

```
 npm install -g Spiritdude/OpenJSCAD.org
```

[NodeJS](http://nodejs.org/) as well, e.g. <tt>apt-get install nodejs</tt> (be aware *NodeJS > 4.x or newer is required* ) and then test it

>*Note:* on some systems the NodeJS executable is <tt>node</tt> (default) or <tt>nodejs</tt>, edit <tt>openjscad</tt> first line to reflect this.

```
% cd examples/
% openjscad example005.jscad                         # -- creates example005.stl as default
% openjscad example001.jscad -o test.stl
% openjscad example001.scad -o example001scad.jscad  # -- convert .scad into .jscad
% openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad
% openjscad logo.jscad -of amf                       # -- convert logo.jscad into logo.amf
```

### Node module use

>Note: Please try to use a recent , LTS version of Node.js ie Node.js 6.x.x,
node V4.x.X is also supported but not earlier versions (they are not maintained anymore)
(see [here for more details](https://github.com/nodejs/LTS))

```
npm install --save Spiritdude/OpenJSCAD.org
```

and then simply import and use openjscad:

```
var jscad = require('openjscad')
var fs = require('fs')

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

#### Module api

*compile(params, source)*
 compile openjscad code and generates intermediate representation
 ordering of parameters created with curying in mind
 *params* the set of parameters to use
 *source* the openjscad script we want to compile

*generateOutput(outputFormat, ir)*
 generate output file from intermediate representation
 *outputFormat* the output file format
 *ir* the openjscad intermediate representation object


### Development

to start the live-reload development version (auto reloads the web page when you change things)
type:

to install the dependencies
```
npm install
```

to run the dev server
```
npm run start-dev
```
## History

- 2016/10/01: 0.5.2: updated documentation links by Z3 Dev, updated Ace editor to 1.2.4, fixed AMF export to set colors only when provided, enhanced Processor constructor to support Viewer options, added big.html to provide an example of using Processor and Viewer options, enhanced Processor to retain multiple returned objects, fixed difference() and intersection() functions for CAG by fischman
- 2016/06/27: 0.5.1: refactored AMF import and export, enhanced STL import by adding support for MM colors by Z3 Dev,added local storage by Robert Starkey
- 2016/05/01: 0.5.0: added SVG import and export, added options to Processor and View classes, allow more flexibility in HTML by Z3 Dev
- 2016/02/25: 0.4.0: refactored, functionality split up into more files, mostly done by Z3 Dev
- 2015/10/23: 0.3.1: including new parameter options by Z3 Dev
- 2015/07/02: 0.3.0: format.js (Stefan Baumann), and Blob.js/openjscad improved by Z3 Dev
- 2015/05/20: 0.2.4: renumbering, latest csg.js from http://joostn.github.com/OpenJsCad/ adapted
- 2015/04/08: 0.024: dev branch opened
- 2015/02/14: 0.023: bumping version based on openscad.js
- 2015/02/04; 0.020: browser window resizing done properly, thanks to Z3 devs via pull request
- 2015/01/07: 0.019: various pull requests from github merged again
- 2014/10/05: 0.018: various pull requests from github merged
- 2013/04/11: 0.017: alpha channel supported in color() and .setColor()
- 2013/04/07: 0.016: csg.js: solidFromSlices() and .setColor() on polygon level, and examples by Eduard Bespalov
- 2013/04/05: 0.015: rudimentary AMF export and import, web and cli
- 2013/04/03: 0.014: multiple files via drag & drop, developing locally
- 2013/04/01: 0.013: include() on web-online & drag & drop (but not off-line) and cli (server-side)
- 2013/03/20: 0.012: improved UI (slider from the left)
- 2013/03/28: 0.011: added support for rectangular_extrude(), rotate_extrude() and torus()
- 2013/03/22: 0.010: leave .scad file intact, and translate on-the-fly
- 2013/03/20: 0.009: OpenSCAD .scad syntax support included via [openscad-openjscad-translator](https://github.com/garyhodgson/openscad-openjscad-translator) module, on web and cli; and experimental .stl import support (binary & ascii)
- 2013/03/15: 0.008: circle(), square(), polygon() partially and linear_extrude() implemented (openscad-like)
- 2013/03/14: 0.007: integrating jQuery for new features; draggable hint window
- 2013/03/12: 0.006: included examples available in the web-frontend direct
- 2013/03/12: 0.005: supporting webgui parameters as of original OpenJsCad (see examples/example030.jscad)
- 2013/03/11: 0.004: openscad.js: many improvements, more OpenSCAD-like functions
- 2013/03/10: 0.003: solidify the functionality (few bug fixes)
- 2013/03/10: 0.001: initial version


## Community

See for more details
- [G+ OpenJSCAD.org Announcements](https://plus.google.com/115007999023701819645) and
- [G+ OpenJSCAD Community](https://plus.google.com/communities/114958480887231067224)
to discuss with other user and developers.

## Todo

-  <del>3d primitive: <b>torus()</b></del> (done)
-  <del>OpenSCAD .scad support for both Web-GUI and CLI</del> (done)
-  <del><b>include()</b> for Web-GUI and CLI to include libraries and modules, support of multiple .jscad drag & drop with include()</del> (done)
-  <del>save from built-in editor to local</del> (done)
-  <del>complete 2D primitives and transformations</del> (done)
-  <del>implementation of <b>linear_extrude()</b> <b>rotate_extrude()</b>, parameter compatible to OpenSCAD</del> (done)
-  <del>example of platonic solids (in progress, requires include())</del> (done)
-  <del>simple 2D/3D text</del> (done)
-  <del>2d operation: hull()</del> (done)
-  processing/progress bar (0..100%), perhaps even visual progress seen in the model direct
-  <del>STL importer</del> (done) & AMF importer / exporter
-  integration into (RepRapCloud)[https://github.com/Spiritdude/RepRapCloud] as first stage of the workflow

## Documentation

- [OpenJSCAD User & Programming Guide](https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide)
- [OpenJSCAD Quick Reference](https://en.wikibooks.org/wiki/OpenJSCAD_Quick_Reference)

## Screenshots

Simple JSCAD example (example000.jscad):
<img src="doc/sshot-01.png">

More sophisticated JSCAD example, fully object-oriented (OO) programmed with interactive parameters (example031.jscad):
<img src="doc/sshot-03-illu.png">

Import of STL models:
<img src="doc/sshot-04.png">

Drag & drop a local file:
<img src="doc/sshot-05-illu.png">

Drag & drop multiple files (Chrome & Firefox) or a folder (Chrome):
<img src="doc/sshot-06-illu.png">

## Contribute

PRs accepted. Please see the guidelines [here](https://github.com/Spiritdude/OpenJSCAD.org/blob/master/CONTRIBUTING.md)


Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](https://github.com/Spiritdude/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)

## See Also

- [OpenJsCAD](http://joostn.github.com/OpenJsCad/), starting point of OpenJSCAD.org
- [OpenSCAD.net](http://garyhodgson.github.com/openscad.net/), another place of inspiration, where the OpenSCAD translator was adapted from
- [CoffeeSCad](http://kaosat-dev.github.com/CoffeeSCad/), JavaScript simplified (no more {}), very active development
- [stl2pov](http://rsmith.home.xs4all.nl/software/py-stl-stl2pov.htmltool) to convert .stl to .pov, and then render via [PovRay.org](http://povray.org)
- [P3D](https://github.com/D1plo1d/p3d) STL/AMF/OBJ viewer


That's all for now,

Rene K. Mueller & contributors
