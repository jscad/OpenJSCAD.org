# @jscad/cli : JSCAD Command Line Interface (CLI)

This is the Command Line Interface (CLI) package for creating designs using [Node.js](https://nodejs.org).

<img src="https://github.com/jscad/OpenJSCAD.org/raw/master/docs/logo.png" width="140" align="right" alt="JSCAD">

[![NPM version](https://badge.fury.io/js/%40jscad%2Fcli.svg)](https://badge.fury.io/js/%40jscad%2Fcli)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![Backers on Open Collective](https://opencollective.com/openjscad/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/openjscad/sponsors/badge.svg)](#sponsors) 

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)

## Usage

### Install Node.js

> IMPORTANT: You need a recent, LTS version of [Node.js](http://nodejs.org/)
> Click on the 'Build Status' badge at the top to see the supported environments.
> Other versions of Node.js are not guaranteed to work!

An easy way to install any Node.js version is to use [NVM](https://github.com/creationix/nvm)
- after installing nvm type ```nvm install v8``` (choose a version from the list)
- then ```nvm use v8```

### Install JSCAD Command Line Interface (CLI)

CLI (command-line interface) use

```
 npm install -g @jscad/cli
```

### Using the CLI

Simply run ```openjscad <InputFile> <options> <OutputFile>```

Examples:

```openjscad example005.jscad                         # -- creates example005.stl as default```

```openjscad example001.jscad -o test.stl             # -- convert .jscad to .stl as test.stl```

```openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad```

```openjscad logo.jscad -of amf                       # -- convert logo.jscad into logo.amf```

You can also provide the parameters to your script directly by passing --<paramName> <value> to the CLI.

```openjscad name_plate.jscad --name "Just Me" --title "Geek" -o output.stl```

### Using with the provided examples

Install the examples for JSCAD

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

### Using the CLI on designs created as NPM packages

You can also run JSCAD designs created as Node modules/NPM packages through the CLI:

See examples/module-design for such a design

- install the design using npm :

```npm install <PATH TO DESIGN FOLDER>```

- then just pass the folder containing your design to the CLI

```openjscad <PATH TO DESIGN FOLDER> <OPTIONS>```

- or run the CLI on the main file if you know which one it is

```openjscad <PATH TO DESIGN FOLDER>/index.js <OPTIONS>```

> Note: when passing a folder to the CLI, it will:
> - check if there is a package.json file in the folder and try to use its "main" property
> - if that does not work if it will try to look for index.js/jscad, main.js/jscad or a file with same name as the folder

#### About designs created as packages (recomended for the future)

You have to deal with your dependencies yourself, NO code is injected 'magically' / globals.
this means you have to import the design API yourself (this will be the case for all designs in
the future, including the in-browser playground)

ie you should have things like this at the top of your design file(s) 

use what you need, this is just an example :)

```javascript
const {color} = require('@jscad/csg/api').color
const {cube, sphere, cylinder} = require('@jscad/csg/api').primitives3d
const {square, circle} = require('@jscad/csg/api').primitives2d
const {linear_extrude} = require('@jscad/csg/api').extrusions
const {union, difference} = require('@jscad/csg/api').booleanOps
const {translate} = require('@jscad/csg/api').transformations

//then use the functions above
const main = (parameters) => {
  return [
    union(cube(), sphere({r: 10})),
    difference(sphere(), color([1, 0, 0], cylinder()))
  ]
}

const getParameterDefinitions = () => {
  return []
}

module.exports = {main, getParameterDefinitions}
```

The ```main``` and ```getParameterDefinitions``` functions should be exported in the following manner:

```javascript
module.exports = {main, getParameterDefinitions}
```

You can find out more on Node modules in the official docs [here](https://nodejs.org/api/modules.html)
or with this [nice presentation](https://darrenderidder.github.io/talks/ModulePatterns/) 

## Documentation

- [JSCAD User Guide](https://openjscad.org/dokuwiki/doku.php?id=start)
- [JSCAD Quick Reference](https://openjscad.org/dokuwiki/doku.php?id=jscad_quick_reference)

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](https://github.com/jscad/OpenJSCAD.org/blob/master/CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://jscad.xyz/forum). You might find the answer in the [JSCAD.org User Guide](https://openjscad.org/dokuwiki/doku.php).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://jscad.xyz/forum) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Community

See for more details
* [JSCAD Forum Announcements](https://jscad.xyz/forum/category/1/announcements)
* [JSCAD Forum Community](https://jscad.xyz/forum) to discuss with other user and developers.

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
