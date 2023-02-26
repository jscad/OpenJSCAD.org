# Summary of JSCAD V3 Changes

## General Packaging

JSCAD V3 uses PNPM for managing the JSCAD packages.
This is a totally new package manager so existing V2 packages are not compatible.
Be sure to start with a fresh clone of JSCAD.

**IMPORTANT: USE PNPM AT ALL TIMES. DO NOT USE NPM.**

```
git clone git@github.com:jscad/OpenJSCAD.org.git
cd OpenJSCAD.org
git checkout V3
pnpm install
pnpm test
```


## Modeling Package (packages/modeling)

The modeling package has fundamentally changed to acheive several goals.

The following name changes were made to improve the API.
 - path2.appendArc() : option xaxisrotation renamed to xaxisRotation

