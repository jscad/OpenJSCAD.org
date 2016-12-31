#what works and what does not

##what does not :

- global file cache:  gMemFs : still trying to refactor it into a reuseable system, this is the last actual remain of the "globals"
- openscad-openjscad-translator: works on CLI & module, but cannot be browserified correctly, and seems to have weird internals
- not entirely sure about the "REMOTE" functionality: should work , but needs testing

##What does :
- everything else !
  - UI
  - examples
  - all format handling in & out
  - background & main worker
  - new CLI & use as a node module
    - installation of OpenJSCAD globally to enable using the openjscad command line tool IN A CLEAN manner
  (no more need to hacks and manual install via make file)
    - installation locally to use as module
  - code sharing between web & module & CLI is complete

#note on transpiling: ie convert from one flavor of JS to another:

- the code now uses a lot of es6/es2015 features (NO fancy/ uncertain ones), which are getting
slowly put into browsers & node above 94 % in most browsers (https://kangax.github.io/compat-table/es6/)
- we want users with "older" browsers and node versions to be able to use feature
- so we 'transpile' ie transform the newer features into ones compatible with older platforms
- we also target two main "platforms"
     * the web  ,via workerify : we generate one single bundle (either 'live': ie regenerated as you change the code or pre bundled) :
       * => OUTPUT IS A SINGLE file (index.js) see package.json 'build-web' or 'start-dev' commands
     * node.js either CLI or modules : the 'dist' folder contains the transpiled version of the source code
       * => OUTPUT IS a single file bundle for server side use : one for the CLI & one for the use as 'module'

#file managment mind map

On startup
  urlParams => loadSomething
  localStorage => loadSomething OR current code ???

Drag & drop:
  => chrome only?
    Observe file changes => reload
    Observe folder changes
  => display ui with reload & autoreload button & toggle

  => saveScript :caches file name & source (BEFORE conversion)

  => walkFileTree
      core of the drag'n'drop:
        1) walk the tree
        2) read the files (readFileAsync)
        3) re-render if there was a change (via readFileAsync)

  => parseFile
      => saveScript (original name & source)
      => uses conversionWorker
      => after conversion
        => putSourceInEditor
        => saveScript
        => gProcessor.setJsCad


   => readFileAsync
    => setCurrentFile: USED ONCE (set one file (the one dragged) or main.jscad)
      => fileChanged: USED ONCE (update the dropzone visual & call the main parser)
        => parseFile: USED ONCE

   => loadLocalFiles (when folders are not supported)
    => readFileAsync

   => superviseAllFiles (file/folder watcher)
    => readFileAsync OR walkFileTree

   => handleInputFiles
    => loadLocalFiles

   => handleFileSelect
    => walkFileTree OR loadLocalFiles

conversionWorker
  => DONE

#imports thoughts

importGeometry needs access to 'memFs' / local fs
