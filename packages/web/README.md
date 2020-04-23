# @jscad/web: JSCAD Web UI

This is the Web based UI for [JSCAD](https://github.com/jscad/OpenJSCAD.org), either to host yourself, or use directly at https://openjscad.org/.

<img src="https://github.com/jscad/OpenJSCAD.org/raw/master/docs/logo.png" width="140" align="right" alt="JSCAD">

[![NPM version](https://badge.fury.io/js/%40jscad%2Fweb.svg)](https://badge.fury.io/js/%40jscad%2Fweb)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

[![Dependency Status](https://david-dm.org/jscad/OpenJSCAD.org.svg)](https://david-dm.org/jscad/OpenJSCAD.org)
[![devDependency Status](https://david-dm.org/jscad/OpenJSCAD.org/dev-status.svg)](https://david-dm.org/jscad/OpenJSCAD.org#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![Backers on Open Collective](https://opencollective.com/openjscad/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/openjscad/sponsors/badge.svg)](#sponsors) 

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Known issues](#known-issues)
- [Contributing](#contributing)
- [Community](#community)
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
cd packages/web // this is where the web version is
cp ../examples ./examples // copy the examples here
<start a web server here>
```

And then access the contents via the URL of the web-site.
  * index.html for the standard version
  * viewer-minimal.html for the barebones viewer
  * viewer-options.html for the 'all options' variant of the above

> NOTE: You might need configuration changes to allow access to the some of the contents (examples etc).

#### Use of proxies for remote file loading:

If you want the capability, just like the official OpenJSCAD.org site, to load remote projects/files directly
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
https://<YOURSITE>/?uri=http://www.thingiverse.com/download:164128
or
https://<YOURSITE>/#http://www.thingiverse.com/download:164128

> Note: a PR with a node.js based proxy would be a welcome addition :)

## Documentation

- [JSCAD User Guide](https://openjscad.org/dokuwiki/doku.php?id=start)
- [JSCAD Quick Reference](https://openjscad.org/dokuwiki/doku.php?id=jscad_quick_reference)

## Known Issues

There are a few known issues, please be sure to check this out before submitting additional bug reports/issues.

- Q: issues running certain npm commands like ```npm run build-web``` with [cnpm](https://github.com/cnpm/cnpm)
- A: this is a [know issue in cnpm](https://github.com/cnpm/cnpm/issues/214) , see [issue #283](https://github.com/jscad/OpenJSCAD.org/issues/283) for more information

- Q: Attempting to use JSCAD from file:// in Chrome results in errors like
"File Error: [EncodingError] Please check permissions error."
- A: This is a permissions issue in Chrome :  restart chrome using the "--allow-file-access-from-files" option

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
* [JSCAD Forum Community](https://jscad.xyz/forum) to discuss with other users and developers.

HUGE THANKS and SHOUTOUT to [nodeBB](https://nodebb.org/) for hosting our (awesome) forum for free ! Thanks a lot !

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
<img src="docs/sshot-01.png">

More sophisticated JSCAD example, with functions dedicated to object generation and with interactive parameters ([gear.jscad](examples/gear.jscad)) [try it](http://openjscad.org/#examples/gear.jscad) :
<img src="docs/sshot-03-illu.png">

Import of STL models ([frog-OwenCollins.stl](examples/frog-OwenCollins.stl)) [try it](http://openjscad.org/#examples/frog-OwenCollins.stl):
<img src="docs/sshot-04.png">

Drag & drop a local file:
<img src="docs/sshot-05-illu.png">

Drag & drop multiple files (Chrome & Firefox) or a folder (Chrome):
<img src="docs/sshot-06-illu.png">
