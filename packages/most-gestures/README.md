# most-gestures

[![GitHub version](https://badge.fury.io/gh/kaosat-dev%2Fmost-gestures.svg)](https://badge.fury.io/gh/kaosat-dev%2Fmost-gestures)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)
[![Build Status](https://travis-ci.org/kaosat-dev/most-gestures.svg)](https://travis-ci.org/kaosat-dev/most-gestures)
[![Dependency Status](https://david-dm.org/kaosat-dev/most-gestures.svg)](https://david-dm.org/kaosat-dev/most-gestures)
[![devDependency Status](https://david-dm.org/kaosat-dev/most-gestures/dev-status.svg)](https://david-dm.org/kaosat-dev/most-gestures#info=devDependencies)


> unified desktop/mobile high level pointer gestures, using most.js

This is a set of pointer gesture helpers, unifying pointer apis accross browsers & mobile/desktop
works (and manually tested ) in :
- Chrome (desktop & mobile, MacOS & Android)
- Firefox
- Safari (desktop & mobile , MacOs & IOS)
- Ios & Android web views

It
- is coded in es6
- uses most.js observables
- provides relatively high level tools : ie taps, zooms , drags

## Table of Contents

- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Installation


```
npm install most-gestures
```

## Usage

```javascript
import {pointerGestures} from 'most-gestures'

const element = document.getElementById("foo")
const gestures = pointerGestures(element)

//or alternatively
const element = document.getElementById("foo")
const baseInteractions = baseInteractionsFromEvents(element)
const gestures = pointerGestures(baseInteractions)

//now you can use:
/*gestures.taps : tap/click once & release quickly
gestures.drags: press, keep pressed & move around
zooms: mouse wheel & pinch zoom alike
pointerMoves: simple moves
*/

//each one of those is an observable , so to react on taps you can do:
gestures.taps.forEach(function(e){
  console.log('tapped',e)
  })

```


## API

the module exposes two main functions:

### baseInteractionsFromEvents(element)

this creates an object containing the low level streams (mouseDowns$, mouseUps$ etc)
from a DOM element, you usually don't want to use this directly, use the following
function instead.

**options** allows you to refine the gestures by modifying the following parameters:
> Note: these will also get passed along correctly if set on the pointerGestures function below
- passiveEventsHandlers: true:  Whenever possible make event listeners passive 
 (see here https://developers.google.com/web/updates/2016/06/passive-event-listeners for more details)
- preventScroll: true : Prevent all forms of scrolling on the target element
- preventMenu: true: Prevent default right click menu on the target element

### pointerGestures(baseInteractionsOrElement, options)

you can either pass in a reference to a dom element or the output from `baseInteractionsFromEvents(element)`

what you are likely interested in, is pointerGestures:

- gestures.presses (used as a basis for the two below)
- gestures.taps : quick press/tap & release
- gestures.holds : press/tap for a long time (defined by the longPressDelay)& release
- gestures.drags : press & move before releasing
- gestures.zooms : pinch , scrollwheel etc

they are all observables , so [the power is yours](https://github.com/cujojs/most/blob/master/docs/api.md) !

**options** allows you to refine the gestures by modifying the following parameters:
 - multiTapDelay: time in ms between multiple taps
 - longPressDelay (default: 250) : time in ms after which a **HOLD** is emitted
 - maxStaticDeltaSqr (default: 100): maximum delta (in pixels squared) above which we consider a pointer to have moved
 - zoomMultiplier: (default: 200): zoomFactor for normalized interactions across browsers
 - pinchThreshold: (default: 4000) The minimum amount in pixels squared the inputs must move until it is fired.
 - pixelRatio : (default: window.pixelRatio if available)



examples :

```javascript
gestures.drags.forEach(function(e){
  console.log('dragged',e)
  })
```

### custom gestures:

you can also easily define your custom gestures, based on the existing ones: using
map, filter etc on the observables

```javascript
const singleTaps$ = taps$.filter(x => x.nb === 1).map(e => e.list).map(e => e[0])
const doubleTaps$ = taps$.filter(x => x.nb === 2).map(e => e.list).map(e => e[0])
```


## Contribute

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

[The MIT License (MIT)](https://github.com/kaosat-dev/most-gestures/blob/master/LICENSE)
(unless specified otherwise)
