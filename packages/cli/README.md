# @jscad/cli : JSCAD Command Line Interface (CLI)

> This is the Command Line Interface (CLI) application for creating designs using [Node.js](https://nodejs.org).

[![NPM version](https://badge.fury.io/js/%40jscad%2Fcli.svg)](https://www.npmjs.com/package/@jscad/cli)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/cli)](https://www.npmjs.com/package/@jscad/cli)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-success)](https://github.com/emersion/stability-badges#stable)
[![License](https://img.shields.io/github/license/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)

[![User Group](https://img.shields.io/badge/maintained%20by-user%20group-blue)](https://openjscad.nodebb.com/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-blue)](https://lerna.js.org/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)

## Usage

The next steps require [NPM](https://www.npmjs.com/) and [Node.js](https://nodejs.org).
The JSCAD project always develops with the latest LTS releases, so install these versions.

### Install the CLI for General Use

The CLI can be installed for general use using NPM.
```
npm install -g @jscad/cli
```
Once installed, the CLI can be invoked using
```
jscad -v
jscad
```

### Install the CLI as Part of a Project

If a general installation is not possible or desired, then installation as part of a project is possible.
```
cd myproject
npm install -D @jscad/cli
```

This will add the CLI package as a development dependency. The CLI can be invoked using
```
npx jscad -v
npx jscad
```
These two commands will show the version of the CLI, and a general help message.

### Using the CLI

Simply invoke 'jscad' using various options. Here are some examples.

Examples:

```jscad mydesign.js                            # -- convert mydesign.js to mydesign.stl as default```

```jscad mydesign.js -o test.stl                # -- convert mydesign.js to test.stl```

```jscad frog.stl -o test.js                    # -- convert frog.stl to test.js```

```jscad mydesign.js -of amf                    # -- convert mydesign.js into mydesign.amf```

The '-o' option can be used to control where the output will be placed.
While, the '-of' option can be used to control the format of the output.

You can also provide the parameters to a design by passing --<paramName> <value> to the CLI.

```jscad mydesign.js --name "Just Me" --title "Geek" -o output.stl```

Also, design projects (directories) can be used as the input to the CLI.

```jscad myproject/ -o ./test.stl               # -- convert the project mydesign to test.stl```

> Note: The CLI will search for the design entry point just like NPM.
> - if there is a package.json file in the project, then try to load the 'main' property
> - if not, then try to load from 'index.js'

### Using the CLI with the JSCAD Examples

The easiest way to use the examples is to create a new NPM project.
```
mkdir newproject
cd newproject
npm init
```
Then add both the examples and the CLI to the project.
```
npm install @jscad/examples
npm install @jscad/cli
```
And finally, make the examples local to the project.
```
ln -s node_modules/@jscad/examples ./examples
```
The examples are just single file designs, or multiple file projects.
```
npx jscad examples/core/booleans/basicBooleans.js -o ./test.stl
npx jscad examples/module-design/ -of dxf
```

## Documentation

- [JSCAD User Guide](https://openjscad.xyz/guide.html)
- [JSCAD API Reference](https://openjscad.xyz/docs/)

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GitHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Community

See for more details
* [JSCAD User Group](https://openjscad.xyz/forum.html)

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/openjscad#backer)]

<a href="https://opencollective.com/openjscad#backers" target="_blank"><img src="https://opencollective.com/openjscad/backers.svg?width=890" alt="Open Collective"></a>

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

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)
