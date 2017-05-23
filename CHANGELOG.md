# Change Log

All notable changes to this project will be documented in this file.

## 0.6.0 (2017-05-xx)
total rework of application and library structure:
- modular, smaller codebase (node.js modules) instead of monolithic files
- actual npm package, dependency managment now done correctly via package.json
- shared browser/Node.js code base
- split out CSG.js scad-api, formats handling etc to seperate repositories
- moved all repositories to the [jscad organization](https://github.com/jscad)
- default stl output is now in binary format (more efficient)
- lots more internal changes and improvements

## 0.5.2 (2017-10-01)
updated documentation links by Z3 Dev, updated Ace editor to 1.2.4, fixed AMF export to set colors only when provided, enhanced Processor constructor to support Viewer options, added big.html to provide an example of using Processor and Viewer options, enhanced Processor to retain multiple returned objects, fixed difference() and intersection() functions for CAG by fischman

## 0.5.1 (2016-06-27)
refactored AMF import and export, enhanced STL import by adding support for MM colors by Z3 Dev,added local storage by Robert Starkey

## 0.5.0 (2016-05-01)
 added SVG import and export, added options to Processor and View classes, allow more flexibility in HTML by Z3 Dev

## 0.4.0 (2016-02-25)
refactored, functionality split up into more files, mostly done by Z3 Dev

## 0.3.1 (2015-10-23)
including new parameter options by Z3 Dev

## 0.3.0 (2015-07-02)
  format.js (Stefan Baumann), and Blob.js/openjscad improved by Z3 Dev

## 0.2.4 (2015-05-20)
  renumbering, latest csg.js from http://joostn.github.com/OpenJsCad/ adapted

## 0.024 (2015-04-08)
  dev branch opened

## 0.023 (2015-02-14)
  bumping version based on openscad.js

## 0.020 (2015-02-04)
  browser window resizing done properly, thanks to Z3 devs via pull request

## 0.019 (2015-01-07)
  various pull requests from github merged again

## 0.018 (2014-10-05)
  various pull requests from github merged

## 0.017 (2013-04-11)
  alpha channel supported in color() and .setColor()

## 0.016 (2013-04-07)
  csg.js: solidFromSlices() and .setColor() on polygon level, and examples by Eduard Bespalov

## 0.015 (2013-04-05)
  rudimentary AMF export and import, web and cli

## 0.014 (2013-04-03)
  multiple files via drag & drop, developing locally

## 0.013 (2013-04-01)
  include() on web-online & drag & drop (but not off-line) and cli (server-side)

## 0.012 (2013-03-20)
  improved UI (slider from the left)

## 0.011 (2013-03-28)
  added support for rectangular_extrude(), rotate_extrude() and torus()

## 0.010 (2013-03-22)
  leave .scad file intact, and translate on-the-fly

## 0.009 (2013-03-20)
  OpenSCAD .scad syntax support included via [openscad-openjscad-translator](https://github.com/garyhodgson/openscad-openjscad-translator) module, on web and cli; and experimental .stl import support (binary & ascii)

## 0.008 (2013-03-15)
  circle(), square(), polygon() partially and linear_extrude() implemented (openscad-like)

## 0.007 (2013-03-14)
  integrating jQuery for new features; draggable hint window

## 0.006 (2013-03-12)
  included examples available in the web-frontend direct

## 0.005 (2013-03-12)
  supporting webgui parameters as of original OpenJsCad (see examples/example030.jscad)

## 0.004 (2013-03-11)
  openscad.js: many improvements, more OpenSCAD-like functions

## 0.003 (2013-03-10)
  solidify the functionality (few bug fixes)

## 0.001 (2013-03-10)
  initial version
