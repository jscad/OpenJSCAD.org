# What needs to work correctly for this to be merged

## inputs
- [x] drag and drop of files
- [x] drag and drop of folders
- [ ] loading of remote files
- [ ] conversion of files
- [x] file watcher/autoreload for single file
- [x] file watcher/autoreload for folders
- [ ] reload last design if
    - it was loaded from http ?
    - it was saved to localstorage (??)
    - NOT possible from files on the local hard drive
## designs
- [ ] clarify lifecycle
  - reset
  - 
- [ ] fix issues with the way parameters are handled

## parametric designs
- [ ] fix multiple param groups (issues seem to increase over time?)
- [x] make groups collapsible
- [ ] previous values are not saved ??

## modular user code
- [x] require support , injection of explicit api
- [x] require support , geometry caching 
- [x] require support relative paths
- [ ] require support node_modules (drag & drop) (issue with CSG.js circular deps)
- [x] require support single file
- [x] virtual fs module injection ie allow const fs = require('fs') in the browser

## outputs
- [x] save/export of files using v2 api
- [ ] persist last used format for 2D/3D format ?
- [ ] handle mixed CAG/CSG ouput that make serializers such as stl not fail
- [ ] add options for unioned/ array of outputs
- [ ] allow users to rename saved files 

## side effects
- [ ] tests
- [ ] memfs: make sure it also works in the Brave browser (walkFileTree)

## error handling
- [ ] fix unhandled and explicit error handling
- [x] make error handling from different sources coherent (web worker, http requests etc)
- [x] fix handling of http request errors 4xx
- [x] fix handling of http request errors (all)

## 3D viewer
- [x] 3d viewer basics
- [ ] zoom to fit settable
- [ ] no resseting of camera to previous state
- [x] all 3D viewer instances should behave independantly
- [x] improve rendering of 2d lines (no lighting)
- [x] add correct transparency (basic)

## code editor
- [ ] code editor basics
- [ ] code editor autocomplete

## ui
- [x] shortcuts
- [ ] theming
- [ ] styling
- [ ] variations: min
- [ ] variations: opts ??

## general
- [x] examples jscad (old style)
- [ ] examples jscad updated to new explicit import api
- [x] translations
- [x] multiple instances per page
- [x] coherent input/outputs handling
- [x] correct timeout and geometry generation cancelation
- [x] correct error displaying
- [ ] save & load languages works

## tests
- [ ] side effects

## docs
- [ ] general
- [ ] observables
- [ ] specifics
- [ ] how to create instances
 
## final checklist if all the above is done
- [ ] work in chrome
- [ ] work in firefox
- [ ] work in safari
- [ ] work in brave
- [ ] works on mobile (?)
- [ ] proxy



######

external file formats handling:
single file
# direct import
  ie drag & drop a single, stl, amf etc
  - create a fake 'virtual' entry point file/module (index.js)
  - that entry point should import the data as csg directly and re-export from main
    * file contains the following (roughly)
      ```javascript 
      const externalFileData = fs.readFileSync('./<pathToExternalFile>')
      const main = () => {
        const externalSolid = deserialize(externalFileData)
        return externalSolid
      }```
    * or 
     ```javascript 
      const main = () => {
        const externalSolid = deserialize({options}, './<pathToExternalFile>')
        return externalSolid
      }```

  - run the standard script loading setup

# conversion
  - translate the external file format into jscad
  - replace the original file contents in the file tree ?
  - set as main file 
