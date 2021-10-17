# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.6.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.5.3...@jscad/modeling@2.6.0) (2021-10-17)


### Features

* **modeling:** add new measurements for BoundingSphere, Center, CenterOfMass, and Dimensions ([#850](https://github.com/jscad/OpenJSCAD.org/issues/850)) ([ad032f4](https://github.com/jscad/OpenJSCAD.org/commit/ad032f49b30055abcbb5464ba4249b5abb5077b2))
* **modeling:** change geometry transforms to preserve user attributes ([#927](https://github.com/jscad/OpenJSCAD.org/issues/927)) ([a581a02](https://github.com/jscad/OpenJSCAD.org/commit/a581a02afb18a12954ffda806f4d0f04c99fb9ef))
* **modeling:** Performance improvement for measure bounding box ([#869](https://github.com/jscad/OpenJSCAD.org/issues/869)) ([ee1c7b1](https://github.com/jscad/OpenJSCAD.org/commit/ee1c7b198a6e7a949b3c5d96d11f6537d39629fd))





## [2.5.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.5.2...@jscad/modeling@2.5.3) (2021-10-04)


### Bug Fixes

* **modeling:** corrected vec2.rotate, and enhanced test cases ([#918](https://github.com/jscad/OpenJSCAD.org/issues/918)) ([e2bea2d](https://github.com/jscad/OpenJSCAD.org/commit/e2bea2d033462a70eac15bb2b7d4f8674216a7bf))





## [2.5.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.5.1...@jscad/modeling@2.5.2) (2021-09-27)


### Bug Fixes

* **modeling:** added exit condition to Node to prevent infinite loops in boolean ops ([#898](https://github.com/jscad/OpenJSCAD.org/issues/898)) ([bf4d6d4](https://github.com/jscad/OpenJSCAD.org/commit/bf4d6d48900aa7e35d00c12cd8d2f15051424956))
* **modeling:** corrected concat to ignore duplicate points ([#913](https://github.com/jscad/OpenJSCAD.org/issues/913))corrected appendArc to maintain last point ([3eea3ef](https://github.com/jscad/OpenJSCAD.org/commit/3eea3efed3b3d4bacb49c1ee4691bfc159b08261))





## [2.5.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.5.0...@jscad/modeling@2.5.1) (2021-09-09)


### Bug Fixes

* **modeling:** corrected CCW determination in 2D hulls ([#897](https://github.com/jscad/OpenJSCAD.org/issues/897)) ([23fe2ac](https://github.com/jscad/OpenJSCAD.org/commit/23fe2ac98fb62ebf6a9bf5a3055e644ffb0e432f)), closes [#114](https://github.com/jscad/OpenJSCAD.org/issues/114)
* **web:** added open issues and discord community to help ([4ea1196](https://github.com/jscad/OpenJSCAD.org/commit/4ea11966af4b3ecbb5c1a3d53b7ac90c4cd349b1))





# [2.5.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.4.0...@jscad/modeling@2.5.0) (2021-06-20)


### Features

* **modeling:** added mat4.isIdentity() ([c22b7cc](https://github.com/jscad/OpenJSCAD.org/commit/c22b7ccfb64f2769381162f0d442ea0ecff5e8d1))





# [2.4.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.3.0...@jscad/modeling@2.4.0) (2021-06-11)


### Bug Fixes

* **modeling:** corrected snapPolygons to maintain color attributes ([eba8ebc](https://github.com/jscad/OpenJSCAD.org/commit/eba8ebc5b910b7c6d3b8021a26bcc92a73672247))
* **modeling:** corrected triangulatePolygons to maintain color attributes ([f59958a](https://github.com/jscad/OpenJSCAD.org/commit/f59958a9640c3c81c8f081fab9ec64a592adef44))


### Features

* **modeling:** added mat4.invert ([#860](https://github.com/jscad/OpenJSCAD.org/issues/860)) ([3eedab3](https://github.com/jscad/OpenJSCAD.org/commit/3eedab3ba1f8a8f3e909eeeb74dca230af8ac435))





# [2.3.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.2.0...@jscad/modeling@2.3.0) (2021-06-01)


### Bug Fixes

* **modeling:** fixed use of vec3.snap in triangulatePolygons ([c0b82a0](https://github.com/jscad/OpenJSCAD.org/commit/c0b82a0fce4dc69eb152b184a7c36a587fbe4a97))
* **modeling:** rewrote vec3 orthogonal() to do the correct thing, and adjusted test suites ([f5cb4a3](https://github.com/jscad/OpenJSCAD.org/commit/f5cb4a31bfc331123cf0da95c012b02b7baafcc8))
* **modeling:** update and correct TypeScript type definitions ([#849](https://github.com/jscad/OpenJSCAD.org/issues/849)) ([6036be7](https://github.com/jscad/OpenJSCAD.org/commit/6036be7586a3f2808f34764baa4195c5edbc6165))


### Features

* **modeling:** added aboutEqualNormals() to math utils ([986d402](https://github.com/jscad/OpenJSCAD.org/commit/986d402cff0f857c77ac77995090fbb0da7ecdaf))
* **modeling:** added fromVectorRotation() to mat4 ([9e3acae](https://github.com/jscad/OpenJSCAD.org/commit/9e3acaee31b4792bdde3ff52b3d6931fc4898414))
* **modeling:** added projectionOfPoint() to plane ([5ea7bfd](https://github.com/jscad/OpenJSCAD.org/commit/5ea7bfd384bd72ea3d05937d6e935f50109973bc))
* **modeling:** new project() function added to extrusions ([#844](https://github.com/jscad/OpenJSCAD.org/issues/844)) ([065469c](https://github.com/jscad/OpenJSCAD.org/commit/065469c9698f429fd5352d705261a96b4d90c836))
* **modeling:** new scission() function added to booleans ([#846](https://github.com/jscad/OpenJSCAD.org/issues/846)) ([b8b3bae](https://github.com/jscad/OpenJSCAD.org/commit/b8b3bae0f45301a8c4b80a757331f89e962f86fc))
* **modeling:** rework math objects to conform with gl-matrix ([#804](https://github.com/jscad/OpenJSCAD.org/issues/804)) ([2e52f10](https://github.com/jscad/OpenJSCAD.org/commit/2e52f104e569f2bb7dd9e1be3d238f471f4d3dfa))





# [2.2.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.0...@jscad/modeling@2.2.0) (2021-04-20)


### Bug Fixes

* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/OpenJSCAD.org/issues/705)) ([62017a4](https://github.com/jscad/OpenJSCAD.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))
* **core:** Remove connectors from public api ([#703](https://github.com/jscad/OpenJSCAD.org/issues/703)) ([a3bf8a4](https://github.com/jscad/OpenJSCAD.org/commit/a3bf8a42e7ccf2204351da4a4acff55c2d6acad6))
* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))
* **modeling:** Adding & improving tests, docs, removing some equals() ([1f3724b](https://github.com/jscad/OpenJSCAD.org/commit/1f3724b7cb9c8afd5ddc61587de506dbac93125e))
* **modeling:** correced snapPolygons to remove duplicate vertices which is possible ([#791](https://github.com/jscad/OpenJSCAD.org/issues/791)) ([1eaf86f](https://github.com/jscad/OpenJSCAD.org/commit/1eaf86f182e101cdf038e52f6a1ad1a6480575a8))
* **modeling:** ensure extrude rectangular expand produces shapes with positive area ([43ce5dd](https://github.com/jscad/OpenJSCAD.org/commit/43ce5dd4341935966ed976ce16cb5a7e452becc2))
* **modeling:** fix extrude rotate ([#727](https://github.com/jscad/OpenJSCAD.org/issues/727)) ([13de037](https://github.com/jscad/OpenJSCAD.org/commit/13de03788336ac5c2e00818fadd631bc8aadc523))
* **modeling:** fix torus offset when outerRotation is supplied ([f7b3a2a](https://github.com/jscad/OpenJSCAD.org/commit/f7b3a2a9adfee91ecc2be1661883f5f17264a798))
* **modeling:** re-implemented poly2.isPointInside to correct issues ([#741](https://github.com/jscad/OpenJSCAD.org/issues/741)) ([4266c8f](https://github.com/jscad/OpenJSCAD.org/commit/4266c8f623f3de9f8c8a5999647e654c8d5aaf31))
* **modeling:** V2 - primitives revisited ([#697](https://github.com/jscad/OpenJSCAD.org/issues/697)) ([4721484](https://github.com/jscad/OpenJSCAD.org/commit/47214847b9ea1a144bd0ec595318979199c47dea))
* **modeling:** V2 revisit modifiers ([#773](https://github.com/jscad/OpenJSCAD.org/issues/773)) ([1e28120](https://github.com/jscad/OpenJSCAD.org/commit/1e28120d2b8505dc1882cf3d607296d6fcd5526d))


### Features

* **examples:** examples overhaul for V2 JSCAD ([d73e06f](https://github.com/jscad/OpenJSCAD.org/commit/d73e06f51e187e673487c3d9599672e66ac441d7))
* **modeling:** add align() and measureAggregateBoundingBox() functions ([72df65c](https://github.com/jscad/OpenJSCAD.org/commit/72df65cfec065f26a84a8bb1ff80f5750a9972bf))
* **modeling:** added aggregate functions for area, volume, epsilon measurements ([cf558bb](https://github.com/jscad/OpenJSCAD.org/commit/cf558bb7d0df1ab4562fda022a8db2c4216d7514))
* **modeling:** V2 : adding new class of operations to modeling; modifiers ([#743](https://github.com/jscad/OpenJSCAD.org/issues/743)) ([9e20303](https://github.com/jscad/OpenJSCAD.org/commit/9e20303255fb10bf11251dbefffa6b8c1dad9b49))
* **modeling:** V2 : rename option to align and center ([#775](https://github.com/jscad/OpenJSCAD.org/issues/775)) ([c5b0f48](https://github.com/jscad/OpenJSCAD.org/commit/c5b0f48bbd980b59876d73b673a0e3bef44d2b30))
* **modeling:** V2 fix extrusions ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))





# [2.1.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.0...@jscad/modeling@2.1.0) (2021-04-15)


### Bug Fixes

* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/OpenJSCAD.org/issues/705)) ([62017a4](https://github.com/jscad/OpenJSCAD.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))
* **core:** Remove connectors from public api ([#703](https://github.com/jscad/OpenJSCAD.org/issues/703)) ([a3bf8a4](https://github.com/jscad/OpenJSCAD.org/commit/a3bf8a42e7ccf2204351da4a4acff55c2d6acad6))
* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))
* **modeling:** Adding & improving tests, docs, removing some equals() ([1f3724b](https://github.com/jscad/OpenJSCAD.org/commit/1f3724b7cb9c8afd5ddc61587de506dbac93125e))
* **modeling:** correced snapPolygons to remove duplicate vertices which is possible ([#791](https://github.com/jscad/OpenJSCAD.org/issues/791)) ([1eaf86f](https://github.com/jscad/OpenJSCAD.org/commit/1eaf86f182e101cdf038e52f6a1ad1a6480575a8))
* **modeling:** ensure extrude rectangular expand produces shapes with positive area ([43ce5dd](https://github.com/jscad/OpenJSCAD.org/commit/43ce5dd4341935966ed976ce16cb5a7e452becc2))
* **modeling:** fix extrude rotate ([#727](https://github.com/jscad/OpenJSCAD.org/issues/727)) ([13de037](https://github.com/jscad/OpenJSCAD.org/commit/13de03788336ac5c2e00818fadd631bc8aadc523))
* **modeling:** fix torus offset when outerRotation is supplied ([f7b3a2a](https://github.com/jscad/OpenJSCAD.org/commit/f7b3a2a9adfee91ecc2be1661883f5f17264a798))
* **modeling:** re-implemented poly2.isPointInside to correct issues ([#741](https://github.com/jscad/OpenJSCAD.org/issues/741)) ([4266c8f](https://github.com/jscad/OpenJSCAD.org/commit/4266c8f623f3de9f8c8a5999647e654c8d5aaf31))
* **modeling:** V2 - primitives revisited ([#697](https://github.com/jscad/OpenJSCAD.org/issues/697)) ([4721484](https://github.com/jscad/OpenJSCAD.org/commit/47214847b9ea1a144bd0ec595318979199c47dea))
* **modeling:** V2 revisit modifiers ([#773](https://github.com/jscad/OpenJSCAD.org/issues/773)) ([1e28120](https://github.com/jscad/OpenJSCAD.org/commit/1e28120d2b8505dc1882cf3d607296d6fcd5526d))


### Features

* **examples:** examples overhaul for V2 JSCAD ([d73e06f](https://github.com/jscad/OpenJSCAD.org/commit/d73e06f51e187e673487c3d9599672e66ac441d7))
* **modeling:** add align() and measureAggregateBoundingBox() functions ([72df65c](https://github.com/jscad/OpenJSCAD.org/commit/72df65cfec065f26a84a8bb1ff80f5750a9972bf))
* **modeling:** added aggregate functions for area, volume, epsilon measurements ([cf558bb](https://github.com/jscad/OpenJSCAD.org/commit/cf558bb7d0df1ab4562fda022a8db2c4216d7514))
* **modeling:** V2 : adding new class of operations to modeling; modifiers ([#743](https://github.com/jscad/OpenJSCAD.org/issues/743)) ([9e20303](https://github.com/jscad/OpenJSCAD.org/commit/9e20303255fb10bf11251dbefffa6b8c1dad9b49))
* **modeling:** V2 : rename option to align and center ([#775](https://github.com/jscad/OpenJSCAD.org/issues/775)) ([c5b0f48](https://github.com/jscad/OpenJSCAD.org/commit/c5b0f48bbd980b59876d73b673a0e3bef44d2b30))
* **modeling:** V2 fix extrusions ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))





# [2.0.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.11...@jscad/modeling@2.0.0) (2021-04-12)

**Note:** Version bump only for package @jscad/modeling





# [2.0.0-alpha.11](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.10...@jscad/modeling@2.0.0-alpha.11) (2021-03-07)


### Bug Fixes

* **modeling:** V2 revisit modifiers ([#773](https://github.com/jscad/OpenJSCAD.org/issues/773)) ([1e28120](https://github.com/jscad/OpenJSCAD.org/commit/1e28120d2b8505dc1882cf3d607296d6fcd5526d))


### Features

* **modeling:** V2 : rename option to align and center ([#775](https://github.com/jscad/OpenJSCAD.org/issues/775)) ([c5b0f48](https://github.com/jscad/OpenJSCAD.org/commit/c5b0f48bbd980b59876d73b673a0e3bef44d2b30))





# [2.0.0-alpha.10](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.9...@jscad/modeling@2.0.0-alpha.10) (2021-02-07)


### Features

* **modeling:** adding new class of operations to modeling; modifiers ([#743](https://github.com/jscad/OpenJSCAD.org/issues/743)) ([9e20303](https://github.com/jscad/OpenJSCAD.org/commit/9e20303255fb10bf11251dbefffa6b8c1dad9b49))
* **modeling:** enhanced options to extrudeFromSlices ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))





# [2.0.0-alpha.9](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.8...@jscad/modeling@2.0.0-alpha.9) (2021-01-02)


### Bug Fixes

* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))
* **modeling:** re-implemented poly2.isPointInside to correct issues ([#741](https://github.com/jscad/OpenJSCAD.org/issues/741)) ([4266c8f](https://github.com/jscad/OpenJSCAD.org/commit/4266c8f623f3de9f8c8a5999647e654c8d5aaf31))





# [2.0.0-alpha.8](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.7...@jscad/modeling@2.0.0-alpha.8) (2020-12-04)

**Note:** Version bump only for package @jscad/modeling





# [2.0.0-alpha.7](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/modeling@2.0.0-alpha.6...@jscad/modeling@2.0.0-alpha.7) (2020-11-07)


### Bug Fixes

* **modeling:** fix extrude rotate ([#727](https://github.com/jscad/OpenJSCAD.org/issues/727)) ([13de037](https://github.com/jscad/OpenJSCAD.org/commit/13de03788336ac5c2e00818fadd631bc8aadc523))





# [2.0.0-alpha.6](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.5...@jscad/modeling@2.0.0-alpha.6) (2020-10-11)


### Bug Fixes

* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/openjscad.org/issues/705)) ([62017a4](https://github.com/jscad/openjscad.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))
* **core:** Remove connectors from public api ([#703](https://github.com/jscad/openjscad.org/issues/703)) ([a3bf8a4](https://github.com/jscad/openjscad.org/commit/a3bf8a42e7ccf2204351da4a4acff55c2d6acad6))





# [2.0.0-alpha.5](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.4...@jscad/modeling@2.0.0-alpha.5) (2020-09-29)


### Bug Fixes

* **modeling:** V2 - primitives revisited ([#697](https://github.com/jscad/openjscad.org/issues/697)) ([4721484](https://github.com/jscad/openjscad.org/commit/47214847b9ea1a144bd0ec595318979199c47dea))





# [2.0.0-alpha.4](https://github.com/jscad/openjscad.org/compare/@jscad/modeling@2.0.0-alpha.3...@jscad/modeling@2.0.0-alpha.4) (2020-09-28)


### Features

* **modeling:** added aggregate functions for area, volume, epsilon measurements ([cf558bb](https://github.com/jscad/openjscad.org/commit/cf558bb7d0df1ab4562fda022a8db2c4216d7514))





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
