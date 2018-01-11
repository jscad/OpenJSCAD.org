# desktop

[![GitHub version](https://badge.fury.io/gh/jscad%2Fdesktop.svg)](https://badge.fury.io/gh/jscad%2Fdesktop)
[![Build Status](https://travis-ci.org/jscad/desktop.svg)](https://travis-ci.org/jscad/desktop)

> Experimental desktop jscad (openjscad) client, built using Electron

A LOT OF THE THINGS HERE CAN AND WILL CHANGE!! This softare is pre-alpha, use at your own risk etc !

## Overview

- this app works similarly then the web based OpenJSCAD.org
### what is supported:
 * almost all of the features of OpenJSCAD EXCEPT 

### what is not supported
  - the include() function , since include is EVIIIL and an antipattern
(an alternative to include() will soon be provided)
  - direct loading/conversion of other formats expect for .js/jscad is not supported (yet)
  - script are not evaluated in the background so the Ui will freeze when evaluating complex designs (this will be fixed
  down the line)
  - there is no text editor included, because I am still on the fence about including one: why have something half baked when there are so many great , free & open source code editors these days ? ([Atom](https://atom.io/), [Visual Studio Code](https://code.visualstudio.com/))
  - transitive file watching is not yes supported: ie if you change things outside of your main file, the ui will not update
  - file watching can fire change events twice occasionaly

### script handling
 * you can either select a file (jscad or js) or folder from the load jscad menu or drag & drop a file or folder
  * the lookup is done as follows : 
    - if there is a package.json file the file specified in the 'main' field is used (standard node.js)
    - if there is no package.json the program tried to look for either an index.js/jscad file or a main.js/jscad file
    - if that fails it tries to look for a js/jscad file that has the same name as the folder
 *  unlike the web based UI you can (and are encouraged to) use jscad designs defined as common.js modules, so you can use
 require() calls to include other functions etc

 > there will NOT be out of the box support for es6 modules anytime soon, please use a transpiler (Babel.js etc)

pre-alpha, expect bugs! 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
git clone this repository
cd jscad-desktop
npm i
```

## Usage

For now , dev mode only! 
to start the app, in the root folder , type
```
npm run dev
```

## License

[The MIT License (MIT)](./LICENSE)
(unless specified otherwise)