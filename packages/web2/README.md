# @jscad/web: NEW JSCAD Web experiment
local web dev:

```
npm run dev-live
```

Electron app test (CTR+SHIT+I is dev console)

```
npm run desktop
```

## checklist

 - [x] index page that can be loaded by starting a web server
 - [x] make gui skeleton with few buttons
 - [x] integrate translations from jscad web
 - [x] initial layout (top buttons, editor panel, empty model panel)
 - [x] toggle editor
 - [x] toggle settigns
 - [x] store settings to localStorage
 - [ ] integrate themes from jscad web (only for 3d view)
 - [ ] themes for UI (dark/light) 
 - [x] EDITOR codemirror 6
 - [x] EDITOR javascript syntax higlight
 - [x] ELECTRON: load same index page as electron app
 - [x] VIEWER - regl renderer 
 - [x] VIEWER - Three.js renderer 
 - [x] VIEWER - Babylon renderer 
 - [ ] WORKER - run script
 - [ ] WEB - file upload and changes syncing with worker
 - [ ] ALL - generalize file access
 - [ ] ELECTRON - allow working with local files
 - [ ] ELECTRON: recognize when in electron
 - [ ] ELECTRON: if in it, enable saving, not just reading script
 - [ ] DEMO-WEB: generate web page so proto is available for playing with as-is

nice to have or to consider if worth doing

 - [ ] extract reusable OrbitControls to be used with different renderer (regl,three, babylon)

 
-------------------------------------------------

# STANDARD README STUFF FROM JSCAD IS BELOW NO NEED TO READ FURTHER


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

### Use within a Web Site (pre built files)



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

- [JSCAD User Guide](https://www.openjscad.xyz/guide.html)
- [JSCAD API Reference](https://www.openjscad.xyz/docs)

## Known Issues


## Contributing

The various JSCAD packages and all source code are part of the JSCAD Organization, and maintained by a group of volunteers.
We welcome and encourage anyone to pitch in but please take a moment to read the following guidelines.

* If you want to submit a bug report please make sure to follow the [Reporting Issues](https://github.com/jscad/OpenJSCAD.org/wiki/Reporting-Issues) guide. Bug reports are accepted as [Issues](https://github.com/jscad/OpenJSCAD.org/issues/) via GitHub.

* If you want to submit a change or a patch, please read the [Contributing Guide](../../CONTRIBUTING.md) . New contributions are accepted as [Pull Requests](https://github.com/jscad/OpenJSCAD.org/pulls/) via GithHub.

* We only accept bug reports and pull requests on **GitHub**.

* If you have a question about how to use JSCAD, then please start a conversation at the [JSCAD User Group](https://openjscad.xyz/forum.html). You might find the answer in the [JSCAD User Guide](https://www.openjscad.xyz/guide.html).

* If you have a change or new feature in mind, please start a conversation with the [Core Developers](https://openjscad.xyz/forum.html) and start contributing changes.

Small Note: If editing this README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Community

See for more details
* [JSCAD User Group](https://openjscad.xyz/forum.html)

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

[The MIT License (MIT)](../../LICENSE)
(unless specified otherwise)

