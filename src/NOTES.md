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


#jquery: eeek !
Old crutch, not needed in most cases these days...ideally would need to go

## issues:
 - increases bundle size by A LOT although almost none of it is actually used
 - "jquery-hammerjs": "^2.0.0" => npm package is broken ,see repo
  // possible fixes with browserify-shim
  "browser": {
    "jquery": "./node_modules/jquery/dist/jquery.js",
    "jquery-ui": "./node_modules/jquery-ui/jquery-ui.js"
  },
  "browserify-shim": {
    "jquery": "$"
  }
- better fix:  get rid of jquery-hammerjs just use hammer.js !


#file managment mind map

On startup
  urlParams => loadSomething
  localStorage => loadSomething OR current code ???

Drag & drop:
  => chrome ?
    Observe file changes => reload
    Observe folder changes
  => display ui with reload & autoreload button & toggle

conversionWorker
  => DONE
