# @jscad/web: JSCAD Web UI

This is the Web based UI for JSCAD, either to host yourself, or use directly at https://openjscad.xyz/.

[![NPM version](https://badge.fury.io/js/%40jscad%2Fweb.svg)](https://www.npmjs.com/package/@jscad/web)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/web)](https://www.npmjs.com/package/@jscad/web)
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
- [Known issues](#known-issues)
- [Contributing](#contributing)
- [Community](#community)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)

## Usage

### Immediate Use (no installation)

Go to *[openjscad.xyz](https://openjscad.xyz)*

> Note: Tested browsers include Chrome, Firefox, Opera, Safari, Edge

### Use within a Web Site (pre built files)

```
cd base-directory-of-website
git clone https://github.com/jscad/OpenJSCAD.org
cd OpenJSCAD.org
cd packages/web // this is where the web version is
cp ../examples ./examples // copy the examples here
<start a web server here>
```

And then access the contents via the URL of the web-site.
  * index.html for the standard version

> NOTE: You might need configuration changes to allow access to the some of the contents (examples etc).

#### Use of proxies for remote file loading:

If you want the capability, just like the official www.openjscad.xyz site, to load remote projects/files directly
from the web based user interface, but without the hassle with CORS issues,
then you can use a proxy file (see [remote.pl](./remote.pl) & [remote.php](./remote.php)):

This is a server side script that does the following
- caches the remote file locally on the server
- returns the local path to the downloaded file for local use by the web UI

use and path of the proxy can be set by:
- changing the `proxyUrl` value in [src/ui/index.js](src/ui/index.js)
- since this is hardcoded , if you do not use the provided dev server,
 rebuild your main file (See [Contributing](#contributing))

then you can use it like so:

https://YOURSITE/?uri=http://www.thingiverse.com/download:164128

or

https://YOURSITE/#http://www.thingiverse.com/download:164128

## Documentation

- [JSCAD User Guide](https://openjscad.xyz/guide.html)
- [JSCAD API Reference](https://openjscad.xyz/docs/)

## Known Issues

There are a few known issues, please be sure to check this out before submitting additional bug reports/issues.

- Q: Attempting to use JSCAD from file:// in Chrome results in errors like
"File Error: [EncodingError] Please check permissions error."
- A: This is a permissions issue in Chrome :  restart chrome using the "--allow-file-access-from-files" option

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

HUGE THANKS and SHOUTOUT to [nodeBB](https://nodebb.org/) for hosting our (awesome) forum for free ! Thanks a lot !

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

