# @jscad/cli : OpenJSCAD Command Line Interface

This is the CLI (command line interface) package for [OpenJsCAD](https://github.com/jscad/OpenJSCAD.org) for server-side computations with NodeJS.

<img src="https://github.com/jscad/OpenJSCAD.org/raw/master/docs/logo.png" width="140" align="right" alt="OpenJSCAD">

[![npm version](https://badge.fury.io/js/%40jscad%2Fcli.svg)](https://badge.fury.io/js/%40jscad%2Fcli)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![Backers on Open Collective](https://opencollective.com/openjscad/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/openjscad/sponsors/badge.svg)](#sponsors) 

## Table of Contents

- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Known issues](#known-issues)
- [Contribute](#contribute)
- [Community](#community)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [See also](#see-also)

## Usage

### Install node.js

> IMPORTANT: you need a recent , LTS version of [Node.js](http://nodejs.org/) > 6.x.x
> we test OpenJSCAD on node.js version **6.x.x** and above all other versions are not guaranteed to work !

An easy way to install any Node.js version is to use [NVM](https://github.com/creationix/nvm)
- after installing nvm type ```nvm install v8``` (recomended)
- then ```nvm use v8```

### Install OpenJSCAD CLI:

CLI(command-line interface) use

```
 npm install -g @jscad/cli
```


you can now turn the examples (or your own designs) into stl etc files as follows :
get the examples
 * via git
 ```
  git clone git@github.com:jscad/OpenJSCAD.org.git
  cp -r OpenJSCAD.org/packages/examples . 

 ```
 * via npm 
 ```
  npm install @jscad/examples
  cp -r node_modules/@jscad/examples .
 ```


run them through the CLI
```
% cd examples/
% openjscad example005.jscad                         # -- creates example005.stl as default
% openjscad example001.jscad -o test.stl
% openjscad example001.scad -o example001scad.jscad  # -- convert .scad into .jscad
% openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad
% openjscad logo.jscad -of amf                       # -- convert logo.jscad into logo.amf
```

## Development

- create a base directory
- clone the base repository ```git clone https://github.com/jscad/OpenJSCAD.org.git```
- go into OpenJSCAD.org folder ```cd OpenJSCAD.org```
- install dependencies & setup inter package links ```npm run bootstrap```
- go into the cli folder : ```cd packages/cli````
- you can change the code , and run the cli again as you see fit ```node cli.js <params>```

> Note : you can also change the code in all the other packages/xxx folders and it will also
impact the cli (ie : if you make changes to packages/core in parts that are used in the CLI,
you do not need to run additional commands)


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

## See Also

- [OpenJsCAD](http://joostn.github.com/OpenJsCad/), starting point of OpenJSCAD.org
- [OpenSCAD.net](http://garyhodgson.github.com/openscad.net/), another place of inspiration, where the OpenSCAD translator was adapted from
- [CoffeeSCad](http://kaosat-dev.github.com/CoffeeSCad/), JavaScript simplified (no more {}) (defunct)
- [stl2pov](http://rsmith.home.xs4all.nl/software/py-stl-stl2pov.htmltool) to convert .stl to .pov, and then render via [PovRay.org](http://povray.org)
- [P3D](https://github.com/D1plo1d/p3d) STL/AMF/OBJ viewer

That's all for now,

Rene K. Mueller, Jeff Gay, Mark Moissette & JSCAD Organization
