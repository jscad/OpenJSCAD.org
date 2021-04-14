Importing files in JSCAD is a simple case of loading them using the same require function used to load javascript modules.  The files you load need to be part of a multifile project, so that JSCAD can access them:

```javascript
const { translate, scale, rotateZ } = require('@jscad/modeling').transforms
const { union } = require('@jscad/modeling').booleans

// Load the STL files using require
const sculpture = require('./3d_sculpture-VernonBussler.stl')
const frog = require('./frog-OwenCollins.stl')

const main = () => {
  return union(
    translate([0, 0, 13], rotateZ(-Math.PI / 3, scale([0.25, 0.25, 0.25], frog))),
    translate([-5, 6, 0], sculpture)
  )
}

module.exports = { main }
```
<img src="img/import.png" alt="Imported STL example">
