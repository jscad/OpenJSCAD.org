Your JSCAD project does not need to be a single file, but can consist of a whole folder structure, 
with a main file defining your initial entry point for the design, and sub-files and folders that your 
design can load as needed.

This can allow you to create your own helper methods and tools for meeting your own particular 
design needs.

The simplest project folder would consist of a folder containing a file called "index.js" that would 
contain your design. Your project can also contain:
- A package.json file, following the standard node.js package metadata format.
    * Defining a "main" parameter allows you to name the main file something other than "index.js"
- Other javascript module files (they must have at least one module.exports defined)
- Other file formats that can be imported into JSCAD (STL, AMF, SVG, etc)

## hexcap/package.json
```json
{
  "name": "Hex",
  "main": "index.js"
}
```
## hexcap/index.js
```javascript
const { cylinder } = require('@jscad/modeling').primitives
const utils = require('./lib/utils.js')

const main = () => {
  let hexRadius = utils.hexWidthToRadius(12)
  return cylinder({radius: hexRadius, height: 4, segments: 6})
}

module.exports = { main }
```
## hexcap/lib/utils.js
```javascript
const hexWidthToRadius = (shortWidth) => {
    return shortWidth * 0.57735
}

module.exports = { hexWidthToRadius }
```