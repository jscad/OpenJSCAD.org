# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.3](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.2...@jscad/modeling@2.0.0-alpha.3) (2020-09-19)


### Features

* **modeling:** add align() and measureAggregateBoundingBox() functions ([72df65c](https://github.com/jscad/openjscad.org/commit/72df65cfec065f26a84a8bb1ff80f5750a9972bf))





# [2.0.0-alpha.2](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.1...@jscad/modeling@2.0.0-alpha.2) (2020-09-08)


### Bug Fixes

* **modeling:** Adding & improving tests, docs, removing some equals() ([1f3724b](https://github.com/jscad/openjscad.org/commit/1f3724b7cb9c8afd5ddc61587de506dbac93125e))
* **modeling:** fix torus offset when outerRotation is supplied ([f7b3a2a](https://github.com/jscad/openjscad.org/commit/f7b3a2a9adfee91ecc2be1661883f5f17264a798))


### Features

* **examples:** examples overhaul for V2 JSCAD ([d73e06f](https://github.com/jscad/openjscad.org/commit/d73e06f51e187e673487c3d9599672e66ac441d7))





# [2.0.0-alpha.1](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.0...@jscad/modeling@2.0.0-alpha.1) (2020-08-19)


### Bug Fixes

* **modeling:** ensure extrude rectangular expand produces shapes with positive area ([43ce5dd](https://github.com/jscad/openjscad.org/commit/43ce5dd4341935966ed976ce16cb5a7e452becc2))





# 2.0.0-alpha.0 (2020-08-13)


### Bug Fixes

* **booleans:** corrected fromFakePolygons to ignore 0 length sides ([#552](https://github.com/jscad/openjscad.org/issues/552)) ([a44650b](https://github.com/jscad/openjscad.org/commit/a44650b2ce471b44ae2a40f4debddbc47e8d8c34))
* **booleans:** added dynamic EPS for 2d boolean operations ([#535](https://github.com/jscad/openjscad.org/issues/535)) ([510e909](https://github.com/jscad/openjscad.org/commit/510e90901e65c63204c19e7f2d146edcbf4944ad))
* **colors:** colorize is now immutable & returns new geometries ([#566](https://github.com/jscad/openjscad.org/issues/566)) ([916824c](https://github.com/jscad/openjscad.org/commit/916824c63a0bf8896d1b6f85a82b129a013bec58))
* **mat4:** Missing variable declaration. ([6c68e81](https://github.com/jscad/openjscad.org/commit/6c68e81e8456e4208a8fe038653c464aa49f7487))
* **geometries:** corrected order of transforms in geom2, geom3, and path2 ([2cde371](https://github.com/jscad/openjscad.org/commit/2cde3718fbd55b85f81c7dd9756ded6d9fe3214e))
* **transforms:** adjusted transforms to allow various lengths arrays as parameters
* **geometries:** reworked toCompactBinary and fromCompactBinary functions
* **primitives:** enhance primitives settings & defaults
* **geometries:** added color support to to/fromCompactBinary functions
* **maths:** updated vec2 and vec3 to use the same logic as glmatrix
* **maths:** changed line2/mat4/vec2/vec3/vec4 to create arrays of Numbers
* **measurements:** enhanced measurements to cache values as object attributes
* **utils:** exposed additional user utility functions
* **geometries:** corrected order of transforms in geom2, geom3, and path2


### Features

* **modeling:** merge csg.js into main repo (#482)
* **primitives:** remove center on primitives ([#512](https://github.com/jscad/openjscad.org/issues/512)) ([7fdc3eb](https://github.com/jscad/openjscad.org/commit/7fdc3eb37228ffac1756e279a65ad66cdde9761f))
* **primitives:** restored center parameter to primitives
* **modeling:**: renamed color.color to colors.colorize
* **colors:** improve (values & arrays supported) & cleanup color api ([#542](https://github.com/jscad/openjscad.org/issues/542)) ([0f4feab](https://github.com/jscad/openjscad.org/commit/0f4feabde952ad9d1fac2fdce9b210e392316195))
* **hulls:** added 3D hull functionality based on quickhull ([#483](https://github.com/jscad/openjscad.org/issues/483)) ([c991eb7](https://github.com/jscad/openjscad.org/commit/c991eb7f4969543cb9ff79ee8622e29c15c02321))
* **primitives:** enhanced polyhedron to accept an array of colors ([#544](https://github.com/jscad/openjscad.org/issues/544)) ([3a2e863](https://github.com/jscad/openjscad.org/commit/3a2e863e8657500186a833cbb9808a47370f1312))
* **geometries:** added invert to geom3, as well as a new test suite
* **geometries:** renamed flip to invert in poly3, adjusted test suites
* **geometries:** removed plane from poly3 data structure, added plane() function
* **modeling:** renamed math to maths
* **modeling:** renamed geometry API to geometries, and adjusted tests…
* **modeling:** moved measurements out of operations
* **modeling:** adding curves/bezier object for curve-based easing and…





<a name="0.6.0"></a>
# [0.6.0](https://github.com/jscad/csg.js/compare/v0.5.4...v0.6.0) (2018-06-21)


### Bug Fixes

* **2d shape factories:** fix fromNestedPointsArray([#103](https://github.com/jscad/csg.js/issues/103)) ([729d459](https://github.com/jscad/csg.js/commit/729d459))
* **polygon:** params custom paths ([#104](https://github.com/jscad/csg.js/issues/104)) ([7d93db8](https://github.com/jscad/csg.js/commit/7d93db8))


### Features

* **2d polygons:** add support for polygons (2D) with holes([#101](https://github.com/jscad/csg.js/issues/101)) ([22f8f80](https://github.com/jscad/csg.js/commit/22f8f80))
* **vector_text/char:** big overhaul & additions to the vector_text/ char system ([#107](https://github.com/jscad/csg.js/issues/107)) ([eadcd58](https://github.com/jscad/csg.js/commit/eadcd58))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/jscad/csg.js/compare/v0.5.3...v0.5.4) (2018-03-16)


### Bug Fixes

* **center:** Correcting center() functionality ([#97](https://github.com/jscad/csg.js/issues/97)) ([52e792d](https://github.com/jscad/csg.js/commit/52e792d))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/jscad/csg.js/compare/v0.5.2...v0.5.3) (2018-02-13)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/jscad/csg.js/compare/v0.5.1...v0.5.2) (2018-01-29)


### Bug Fixes

* **rotate:** fixing angle-axis style rotation ([#90](https://github.com/jscad/csg.js/issues/90)) ([6c28c1c](https://github.com/jscad/csg.js/commit/6c28c1c))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/jscad/csg.js/compare/v0.5.0...v0.5.1) (2018-01-29)


### Bug Fixes

* **CAG:** added back missing CAG.fromCompactBinary ([#91](https://github.com/jscad/csg.js/issues/91)) ([57e8f5d](https://github.com/jscad/csg.js/commit/57e8f5d))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/jscad/csg.js/compare/v0.4.1...v0.5.0) (2018-01-19)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/jscad/csg.js/compare/v0.4.0...v0.4.1) (2018-01-19)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/jscad/csg.js/compare/v0.3.8...v0.4.0) (2018-01-05)


### Bug Fixes

* **docstring:** fixed a few bad docstrings which prevented docs from being generated ([#76](https://github.com/jscad/csg.js/issues/76)) ([441fd18](https://github.com/jscad/csg.js/commit/441fd18))



<a name="0.3.8"></a>
## [0.3.8](https://github.com/jscad/csg.js/compare/v0.3.7...v0.3.8) (2018-01-04)


### Bug Fixes

* **shared object:**  support shared objects without color ([#74](https://github.com/jscad/csg.js/issues/74)) ([f90ad50](https://github.com/jscad/csg.js/commit/f90ad50))



<a name="0.3.7"></a>
## [0.3.7](https://github.com/jscad/csg.js/compare/v0.3.6...v0.3.7) (2017-11-13)



<a name="0.3.6"></a>
## [0.3.6](https://github.com/jscad/csg.js/compare/v0.3.5...v0.3.6) (2017-11-03)



<a name="0.3.5"></a>
## [0.3.5](https://github.com/jscad/csg.js/compare/v0.3.4...v0.3.5) (2017-11-03)


### Bug Fixes

* **fixTJunctions:** fixes issues with fixTJunctions ([#63](https://github.com/jscad/csg.js/issues/63)) ([78c5102](https://github.com/jscad/csg.js/commit/78c5102))



<a name="0.3.4"></a>
## [0.3.4](https://github.com/jscad/csg.js/compare/v0.3.3...v0.3.4) (2017-11-01)


### Bug Fixes

* **ConnectorsList:** add back missing ConnectorsList ([#62](https://github.com/jscad/csg.js/issues/62)) ([cfc1c7e](https://github.com/jscad/csg.js/commit/cfc1c7e))



<a name="0.3.3"></a>
## [0.3.3](https://github.com/jscad/csg.js/compare/v0.3.2...v0.3.3) (2017-11-01)



<a name="0.3.2"></a>
## [0.3.2](https://github.com/jscad/csg.js/compare/v0.3.1...v0.3.2) (2017-10-28)


### Bug Fixes

* **path2D:** added missing innerToCAG method to path2D proto & added tests & docs ([#52](https://github.com/jscad/csg.js/issues/52)) ([4a5e37e](https://github.com/jscad/csg.js/commit/4a5e37e))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/jscad/csg.js/compare/v0.3.0...v0.3.1) (2017-06-11)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/jscad/csg.js/compare/v0.2.4...v0.3.0) (2017-05-30)


### Features

* **CAG.toPoints:** CAG Enhancement for toPoints() ([d023243](https://github.com/jscad/csg.js/commit/d023243))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/jscad/csg.js/compare/v0.2.3...v0.2.4) (2017-05-20)


### Bug Fixes

* **CAG:** reverted back CAG to default to canonicalized = false ([68a0558](https://github.com/jscad/csg.js/commit/68a0558))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/jscad/csg.js/compare/v0.2.2...v0.2.3) (2017-05-19)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/jscad/csg.js/compare/v0.2.1...v0.2.2) (2017-05-19)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/jscad/csg.js/compare/v0.2.0...v0.2.1) (2017-04-27)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/jscad/csg.js/compare/v0.1.4...v0.2.0) (2017-04-27)


### Bug Fixes

* **asserts:** fixed issue with asserts in latest ava ([1210f66](https://github.com/jscad/csg.js/commit/1210f66))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/jscad/csg.js/compare/v0.1.3...v0.1.4) (2017-01-27)


### Bug Fixes

* **README:** more attempts at fixing README on npm ... ([a5ae096](https://github.com/jscad/csg.js/commit/a5ae096))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/jscad/csg.js/compare/v0.1.2...v0.1.3) (2017-01-27)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/jscad/csg.js/compare/v0.1.1...v0.1.2) (2017-01-27)


### Bug Fixes

* **typo:** fixed typo in package name ([4f2aec6](https://github.com/jscad/csg.js/commit/4f2aec6))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/jscad/csg.js/compare/v0.1.0...v0.1.1) (2017-01-27)


### Bug Fixes

* **babelrc:** added missing babelrc ([94f9684](https://github.com/jscad/csg.js/commit/94f9684))
* **package:** removed part of package relevant to 'builds' ([7bf4815](https://github.com/jscad/csg.js/commit/7bf4815))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/jscad/csg.js/compare/af6453c...v0.1.0) (2017-01-16)


### Bug Fixes

* bools fail if cylinder resolution not integer. Solution: parse all resolution as int ([af6453c](https://github.com/jscad/csg.js/commit/af6453c))
* **package:** fixed package name ([cbba148](https://github.com/jscad/csg.js/commit/cbba148))


### Features

* **csg.js:** updated csg.js based on recent changes in OpenjSCAD.org ([db1d133](https://github.com/jscad/csg.js/commit/db1d133))
