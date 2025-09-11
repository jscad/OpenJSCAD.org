# @jscad-regl-renderer

> Renderer for JSCAD geometries, both 2D and 3D

[![NPM version](https://badge.fury.io/js/%40jscad%2Fregl-renderer.svg)](https://www.npmjs.com/package/@jscad/regl-renderer)
[![NPM downloads](https://img.shields.io/npm/dw/@jscad/regl-renderer)](https://www.npmjs.com/package/@jscad/regl-renderer)
[![Build Status](https://travis-ci.org/jscad/OpenJSCAD.org.svg?branch=master)](https://travis-ci.org/jscad/OpenJSCAD.org)
[![Stability](https://img.shields.io/badge/stability-stable-success)](https://github.com/emersion/stability-badges#stable)
[![License](https://img.shields.io/github/license/jscad/OpenJSCAD.org)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)

[![User Group](https://img.shields.io/badge/maintained%20by-user%20group-blue)](https://openjscad.nodebb.com/)
[![lerna--lite](https://img.shields.io/badge/maintained%20with-lerna--lite-e137ff)](https://github.com/ghiscoding/lerna-lite)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue)](https://standardjs.com)

[![Backers](https://img.shields.io/opencollective/backers/openjscad)](https://opencollective.com/openjscad)
[![Sponsors](https://img.shields.io/opencollective/sponsors/openjscad)](https://opencollective.com/openjscad)

<a href="https://opencollective.com/openjscad"><img src="https://opencollective.com/openjscad/donate/button.png?color=blue" alt="Open Collective"></a>

## What is it?
- webgl renderer (barebones, uses regl)
- small, compact, and fast
- works in all browsers
- works in Node.js projects (headless rendering to PNG images)


## Installation

This package is published and available for download via [NPM](https://www.npmjs.com/org/jscad)
```
npm install @jscad/regl-renderer
```

In addition this package is hosted at [UNPKG](https://unpkg.com/), and can be imported directly into webpages.
```
  <script type="module" id="MODELING">
import { cameras, commands, controls, entitiesFromSolids, prepareRender } from "./dist/jscad-regl-renderer.es.js"

... YOUR CODE
  </script>
```

## Usage

### Node.js (HEADLESS)

Install the following packages manually.

NOTE: There are issues with continous integration testing, so 'gl' is not installed initially.

```
pnpm install gl
```

Try the demo by running ```pnpm run demo-cli```.

If all goes well you should end up with an image (test.png) that renders the demo design.

The source code of the demo can be found in 'demo-cli.js'

### Browsers

This module has been tested using several browsers, includig Firefox, Chrome, Safari, etc.
For an exmple of how to use the module, please see 'demo.es.html'

NOTE: 
 
* 'demo.es.html' cannot be opened from the local file system. This is due to CORS security limitiations. See the next section.
* One needs to link/copy the file `jscad-dpdeling.es.js` in this directory. For example in Linux: `ln -s ../../modeling/dist/jscad-modeling.es.js`.

### Developers

Run the development web server using ```pnpm run dev```, then open the URL shown using any browser.
From the index of files, select 'demo.es.html'.

If all goes well you should end up with a web page that displays the demo design (a few solids).
The standard mouse controls are also available for rotation, etc.

After making changes, just reload the web page.

If making changes, please make sure that all tests must pass. Run ```pnpm test```

## License

[The MIT License (MIT)](../../../LICENSE)
(unless specified otherwise)
