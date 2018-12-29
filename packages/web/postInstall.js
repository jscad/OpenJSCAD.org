// this copies the examples folder from the @jscad/examples repository locally
const path = require('path')
const examplesPath = path.resolve('./node_modules/@jscad/examples')
const copydir = require('copy-dir')
const fs = require('fs')
if (fs.existsSync(examplesPath)) copydir.sync(examplesPath, 'examples')
