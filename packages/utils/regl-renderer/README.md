# @jscad-regl-renderer

## 3D Renderer for JSCAD

[![GitHub version](https://badge.fury.io/gh/jscad%2Fregl-renderer.svg)](https://badge.fury.io/gh/jscad%2Fregl-renderer)
[![Build Status](https://travis-ci.org/jscad/regl-renderer.svg)](https://travis-ci.org/jscad/regl-renderer)

> 3D renderer for JSCAD geometries : small, fast

This is a early version of this viewer ! Expect changes !

## What ?
- webgl renderer (barebones, uses regl)
- works in the browser
- work in node (headless, see below for more details)

## Usage

### Node.js (headless)

Install the following packages manually. NOTE: There are issues with CI, so these are not installed as dev dependencies.

```
 npm install gl
```

Try the demo by running ```npm run demo-cli```.
If all goes well you should end up with an image (test.png) rendering of the demo design (a few solids).

### Web

Try the demo by running ```npm run demo-web``` and open the URL shown.
If all goes well you should end up with a web page with a rotating camera (no mouse controls) that displays the demo design (a few solids).

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
