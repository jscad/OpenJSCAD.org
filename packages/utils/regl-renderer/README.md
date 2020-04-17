# @jscad-regl-renderer

[![GitHub version](https://badge.fury.io/gh/jscad%2Fregl-renderer.svg)](https://badge.fury.io/gh/jscad%2Fregl-renderer)
[![Build Status](https://travis-ci.org/jscad/regl-renderer.svg)](https://travis-ci.org/jscad/regl-renderer)

> 3D renderer for JSCAD geometries : small, fast

This is a very early version of this viewer ! Expect changes ! 

## What ?
- webgl renderer (barebones, uses regl)
- works in the browser
- work in node (headless, see below for more details)

## How

### Node.js/headless

- install these packages manually (they had issues in our CI setup as devdependencies)
  - "gl": "4.1.1",
  - "pngjs": "3.3.3",
- try the demo by running ```npm run demo-cli``` if all goes well you should end up with a png image rendering of the demo jscad code (a few solids)

### Web

- try the demo by running ```npm run demo-web``` and open the webpage at the adress displayed in the command line: if all goes well you should end up with a web page with a rotating camera (no mouse controls) that displays the demo jscad code (a few solids)

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
