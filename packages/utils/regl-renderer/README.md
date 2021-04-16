# @jscad-regl-renderer

## Renderer for JSCAD

[![GitHub version](https://badge.fury.io/gh/jscad%2Fregl-renderer.svg)](https://badge.fury.io/gh/jscad%2Fregl-renderer)
[![Build Status](https://travis-ci.org/jscad/regl-renderer.svg)](https://travis-ci.org/jscad/regl-renderer)

> Renderer for JSCAD geometries, both 2D and 3D.

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
