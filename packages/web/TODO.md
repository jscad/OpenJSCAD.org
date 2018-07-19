# What needs to work correctly for this to be merged

## 3D viewer
- [x] 3d viewer basics
- [ ] zoom to fit settable
- [ ] no resseting of camera to previous state
- [x] all 3D viewer instances should behave independantly
- [x] improve rendering of 2d lines (no lighting)

## code editor
- [ ] code editor basics
- [ ] code editor autocomplete

## inputs
- [x] drag and drop of files
- [x] drag and drop of folders
- [ ] loading of remote files
- [ ] conversion of files
- [x] require support , injection of explicit api
- [ ] require support , geometry caching 
- [x] require support relative paths
- [ ] require support node_modules (drag & drop)
- [x] require support single file
- [x] file watcher/autoreload for single file
- [x] file watcher/autoreload for folders
- [x] examples

## error handling
- [ ] virtual fs module injection
- [ ] fix unhandled and explicit error handling
- [ ] make error handling from different sources coherent (web worker, http requests etc)
- [x] fix handling of http request errors

## outputs
- [ ] save/export of files using v2 api

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
- [ ] correct error displaying

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
