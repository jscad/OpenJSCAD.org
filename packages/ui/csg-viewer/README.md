# csg-viewer

[![GitHub version](https://badge.fury.io/gh/jscad%2Fcsg-viewer.svg)](https://badge.fury.io/gh/jscad%2Fcsg-viewer)
[![Build Status](https://travis-ci.org/jscad/csg-viewer.svg)](https://travis-ci.org/jscad/csg-viewer)

> 3D viewer for Csg.js / Openjscad csg/cag data : small, fast, simple

This is a very early version of this viewer ! Expect changes ! 

## Overview


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [API](#api)

## Installation

```
npm install jscad/csg-viewer
```

## Usage

```javascript
// With ES6/2015 +
import makeViewer from 'csg-viewer'
// with commonjs
// import viewer creator function
const makeViewer = require('csg-viewer')

const viewerOptions = {
  background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
  meshColor: [0.4, 0.6, 0.5, 1],
  grid: {
    display: true,
    color: [1, 1, 1, 0.1]
  },
  camera: {
    position: [450, 550, 700]
  },
  controls: {
    limits: {
      maxDistance: 1600,
      minDistance: 0.01
    }
  }
}
// create viewer
const {csgViewer, viewerDefaults, viewerState$} = makeViewer(document.body, viewerOptions)
// and just run it, providing csg/cag data
let csg = CSG.cube()
csgViewer(viewerOptions, {solids: csg})

//you can also just call the viewer function again with either/or new data or new settings
csgViewer({camera: { position: [0, 100, 100] }})

csg = CSG.sphere()
csgViewer({}, {solids: csg})

// and again, with different settings: it only overrides the given settings
csgViewer({controls: {autoRotate: {enabled: true}}})

```

## Test

There are no unit tests for the 3d viewer, however there is a small demo that is very practical to iterate fast and to see something visual without a complicated setup:

type:

```npm run dev``` this will start the demo at `localhost:9966`

## API

Work in progress!


## Sponsors

* An earlier version of this viewer has been developped for and very kindly sponsored by [Copenhagen Fabrication / Stykka](https://www.stykka.com/)

## License

[The MIT License (MIT)](https://github.com/jscad/OpenJSCAD.org/blob/master/LICENSE)
(unless specified otherwise)
