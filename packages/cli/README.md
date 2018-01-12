# @jscad/cli
<img src="doc/logo.png" width=256 align=right>

This is the CLI (command line interface) package for OpenJsCAD for server-side computations with NodeJS.

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

### Use as Command Line Interface (CLI)

### Install node.js

> IMPORTANT: you need a recent , LTS version of [Node.js](http://nodejs.org/) > 6.x.x
> we test OpenJSCAD on node.js version **6.x.x** & **7.x.x** all other versions are not guaranteed to work !

An easy way to install any Node.js version is to use [NVM](https://github.com/creationix/nvm)
- after installing nvm type ```nvm install v6``` (recomended)
- then ```nvm use v6```

#### Install OpenJSCAD CLI:

CLI(command-line interface) use

```
 npm install -g @jscad/cli
```

you can now turn the examples (or your own designs) into stl etc files as follows :
```
% cd examples/
% openjscad example005.jscad                         # -- creates example005.stl as default
% openjscad example001.jscad -o test.stl
% openjscad example001.scad -o example001scad.jscad  # -- convert .scad into .jscad
% openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad
% openjscad logo.jscad -of amf                       # -- convert logo.jscad into logo.amf
```

## Development

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
