# JSCAD (previously known as OpenJSCAD)

>*JSCAD* is a set of modular, browser and command line tools for creating parametric 2D and 3D designs with JavaScript code.

There are many ways to use JSCAD:

An [online version](https://openjscad.xyz/), [self hostable web based ui](./packages/web), as [CLI](./packages/cli) (command-line interface) for server-side computations with Node.js, as well as an experimental [desktop app](./packages/desktop) or [individual Node.js packages](./packages/README.md)!!

This repository is a [monorepo](https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9) (container of multiple packages and tools) maintained with [PNPM](https://pnpm.io/) and [Lerna-Lite](https://github.com/ghiscoding/lerna-lite)

[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-success)](https://github.com/emersion/stability-badges#stable)
[![All Dependencies](https://img.shields.io/librariesio/github/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org)

[![User Group](https://img.shields.io/badge/maintained%20by-user%20group-blue)](https://openjscad.nodebb.com/)
[![Lerna--Lite](https://img.shields.io/badge/maintained%20with-lerna--lite-e137ff)](https://github.com/ghiscoding/lerna-lite)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Acknowledgements](#acknowledgements)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)
- [See also](#see-also)

## Usage

There are different 'flavors' of JSCAD that you can use based on your needs
- web: online (no install) simply go to [https://openjscad.xyz/](https://openjscad.xyz/)
- web: self hosted: can be found [here](./packages/web)
- cli: command line interface : can be found [here](./packages/cli)
- desktop app: pre pre alpha work in progress can be found [here](./packages/desktop)!
- node.js: custom mix and match of packages
  * all the packages are available [on NPM](https://www.npmjs.com/search?q=%40jscad) under the '@jscad' name

### Immediate Use (no installation)

Go to *[OpenJSCAD.xyz](https://openjscad.xyz)* (Tested browsers include Chrome, Edge, Firefox, Opera, Safari)

### Use within a Web Site (pre built files, from GitHub)

Please see [here for details](./packages/web/README.md)

### Use as Command Line Interface (CLI)

Please see [here for details](./packages/cli/README.md)

### Use of components and viewer in websites

Please see [here for details](./packages/utils/regl-renderer/README.md)

### Use of the different modular components directly

From version 1.0.0 onwards, almost all the individual parts of this project are available
directly as scoped NPM packages, and can be used independently from the main repository.
The full list of packages is available [here](./packages/README.md), as well as on NPM [here](https://www.npmjs.com/org/jscad),

This means you can :
- easily create your own renderer for the 3D and 2D geometries
- create custom UIs
- use the specific packages as part of Node.js or Browserify projects
- cherry pick formats you want to use for input/output without needing the dependencies of **all** packages
- lots more !

The available packages may change based on user demands, which is the backbone of the newer, modular JSCAD project.

## Documentation

- [JSCAD User Guide](https://openjscad.xyz/guide.html)
- [API Reference](https://openjscad.xyz/docs/)

## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](./CONTRIBUTING.md). New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GitHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

A BIG THANKS to all the people who have already contributed to the JSCAD project!
<a href="https://github.com/jscad/OpenJSCAD.org/graphs/contributors"><img src="https://opencollective.com/openjscad/contributors.svg?width=890" alt="Open Collective"></a>

## Community

Discuss designs or issues
* [JSCAD User Group](https://openjscad.xyz/forum.html)

Or chat with other users
* [Discord Community](https://openjscad.xyz/discord.html)


HUGE THANKS and SHOUTOUT to [nodeBB](https://nodebb.org/) for hosting our (awesome) forum for free ! Thanks a lot !

## Acknowledgements

JSCAD and all sub components are built upon great open source packages, and contributions.

Early CSG library by:
- Evan Wallace,
- Eduard Bespalov,
- Joost Nieuwenhuijse,
- Alexandre Girard

Portions of Matrix and Vector libraries by:
- Brandon Jones
- Colin MacKenzie IV

Quickhull library by:
- Mauricio Poppe

and many more!

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/openjscad#backer)]

<a href="https://opencollective.com/openjscad#backers" target="_blank"><img src="https://opencollective.com/openjscad/backers.svg?width=890"></a>

## Sponsors

This project has some awesome sponsors! [[Become a sponsor](https://opencollective.com/openjscad#sponsor)]
Your logo will show up here with a link to your website.

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

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)

## See Also

- [OpenJsCAD](https://joostn.github.io/OpenJsCad/), starting point of JSCAD
- [OpenSCAD.net](https://garyhodgson.github.io/openscad.net/), another place of inspiration, where the OpenSCAD translator was adapted from

That's all for now,

The JSCAD Organization
