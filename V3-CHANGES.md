# Summary of JSCAD V3 Changes

## General Packaging

JSCAD V3 uses NPM for managing the JSCAD packages.
This is a totally new package manager so existing V2 packages are not compatible.
Be sure to start with a fresh clone of JSCAD.

**IMPORTANT: USE NPM AT ALL TIMES.**

```
git clone git@github.com:jscad/OpenJSCAD.org.git
cd OpenJSCAD.org
git checkout V3
npm install
npm test
```


## Modeling Package (packages/modeling)

The modeling package has fundamentally changed to acheive several goals.

The following name changes were made to improve the API.
 - path2.appendArc() : option xaxisrotation renamed to xaxisRotation

