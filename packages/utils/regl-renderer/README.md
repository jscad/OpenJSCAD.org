# @jscad-regl-renderer

> Renderer for JSCAD geometries, both 2D and 3D

[![NPM version](https://badge.fury.io/js/%40jscad%2Fregl-renderer.svg)](https://www.npmjs.com/package/@jscad/regl-renderer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/regl-renderer)](https://www.npmjs.com/package/@jscad/regl-renderer)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)
[![License](https://img.shields.io/github/license/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)

[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## What is it?
- webgl renderer (barebones, uses regl)
- small, compact, and fast
- works in all browsers
- works in Node.js projects (headless rendering to PNG images)

## Usage

### Node.js (headless)

Install the following packages manually.

NOTE: There are issues with continous integration testing, so 'gl' is not installed initially.

```
 npm install gl
```

Try the demo by running ```npm run demo-cli```.

If all goes well you should end up with an image (test.png) that renders the demo design.

The demo code can be found in 'demo-cli.js'

### Browsers

From a browser, try opening the file 'demo.html'. This should show the demo design.

### Developers

Run the development web server using ```npm run dev```, then open the URL shown.

If all goes well you should end up with a web page with a rotating camera (no mouse controls) that displays the demo design (a few solids).

After making changes, all tests must pass. Run ```npm test```

## License

[The MIT License (MIT)](../../../LICENSE)
(unless specified otherwise)
