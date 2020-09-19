# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.5](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.4...@jscad/core@2.0.0-alpha.5) (2020-09-19)


### Bug Fixes

* **all:** fix json import ([#675](https://github.com/jscad/OpenJSCAD.org/issues/675)) ([05caf60](https://github.com/jscad/OpenJSCAD.org/commit/05caf60efc3f090313b3e0bddcc0b4f94de67c78))
* **all:** support sparse arrays from main() ([#672](https://github.com/jscad/OpenJSCAD.org/issues/672)) ([209961d](https://github.com/jscad/OpenJSCAD.org/commit/209961d41ebf77373d427a7986934d195780f118))





# [2.0.0-alpha.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.3...@jscad/core@2.0.0-alpha.4) (2020-09-08)


### Bug Fixes

* **core:** corrected webRequire to use posix paths ([53a6e85](https://github.com/jscad/OpenJSCAD.org/commit/53a6e85e1dc8f515e8e259e0bb40f292909645fa))





# [2.0.0-alpha.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.2...@jscad/core@2.0.0-alpha.3) (2020-09-02)


### Bug Fixes

* **all:** update dependencies ([d8c713a](https://github.com/jscad/OpenJSCAD.org/commit/d8c713a933b97a6d179ed3d3e923e188e334f99e))





# [2.0.0-alpha.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.1...@jscad/core@2.0.0-alpha.2) (2020-08-24)


### Bug Fixes

* **web:** fixes for slider, group, and choice parameter types ([a3faba3](https://github.com/jscad/OpenJSCAD.org/commit/a3faba367604c897d240f56ba86ddb5404034afd))





# [2.0.0-alpha.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.0...@jscad/core@2.0.0-alpha.1) (2020-08-19)

**Note:** Version bump only for package @jscad/core





# [2.0.0-alpha.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.4.0...@jscad/core@2.0.0-alpha.0) (2020-08-13)


### Bug Fixes

* **core:** fixed issues when translating external formats to scripts
* **cli:** fix rebuild geometry for cli ([#583](https://github.com/jscad/OpenJSCAD.org/issues/583)) ([828394d](https://github.com/jscad/OpenJSCAD.org/commit/828394ddb88fc1139b1daf155548aa9fab7de823))
* **cli:** improved/ added missing formats handling to CLI ([#494](https://github.com/jscad/OpenJSCAD.org/issues/494)) ([caaab97](https://github.com/jscad/OpenJSCAD.org/commit/caaab9765e4d286f740067075a8284fec3e77c39))
* **core:** removed script conversion of external formats for sub items in file hierarchies ([#561](https://github.com/jscad/OpenJSCAD.org/issues/561)) ([8eb6433](https://github.com/jscad/OpenJSCAD.org/commit/8eb6433947dba9c8ccb70539b5028f217c687ae5))
* **core:** changed normalizeDesignModule to validate the module as well
* **core:** adjusted loadDesign to use / support enhanced webRequire
* **core:** fixed parameters to svg deserializer in registerExtensions


### Features

* **core:** Overhaul and V2 groundwork ([#382](https://github.com/jscad/OpenJSCAD.org/issues/382)) ([5e66632](https://github.com/jscad/OpenJSCAD.org/commit/5e666327a8b50a7fa6baa4bbdfd790d243f8064f))
* **formats:** added more transforming of external formats to scripts ([#458](https://github.com/jscad/OpenJSCAD.org/issues/458)) ([19f063d](https://github.com/jscad/OpenJSCAD.org/commit/19f063de5b365e2290b088215d62535b5a37a23c))
* **languages:** Japanese Language Support ([#456](https://github.com/jscad/OpenJSCAD.org/issues/456)) ([4bef398](https://github.com/jscad/OpenJSCAD.org/commit/4bef39809ab738481a9354de057f13de31cb2e96))
* **require:** enhanced webRequire to follow NODEJS module loading logic
* **examples:** examples & file loading tweaks (#443)





<a name="0.4.0"></a>
# [0.4.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.3.0...@jscad/core@0.4.0) (2019-01-04)


### Features

* **web:** add standalone umd / embeddable version ([#413](https://github.com/jscad/OpenJSCAD.org/issues/413)) ([f25d8c0](https://github.com/jscad/OpenJSCAD.org/commit/f25d8c0)), closes [#402](https://github.com/jscad/OpenJSCAD.org/issues/402) [#343](https://github.com/jscad/OpenJSCAD.org/issues/343)




<a name="0.3.0"></a>
# [0.3.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.2.3...@jscad/core@0.3.0) (2018-09-02)


### Features

* **io:** add updated dependencies: enable csg to dxf ([#394](https://github.com/jscad/OpenJSCAD.org/issues/394)) ([1144a78](https://github.com/jscad/OpenJSCAD.org/commit/1144a78))




<a name="0.2.3"></a>
## [0.2.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.2.2...@jscad/core@0.2.3) (2018-04-07)


### Bug Fixes

* **dxf-serializer:** updated [@jscad](https://github.com/jscad)/io dependency version for dxf-serializer fixes ([#369](https://github.com/jscad/OpenJSCAD.org/issues/369)) ([fadae24](https://github.com/jscad/OpenJSCAD.org/commit/fadae24))




<a name="0.2.2"></a>
## [0.2.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.2.1...@jscad/core@0.2.2) (2018-04-07)




**Note:** Version bump only for package @jscad/core

<a name="0.2.1"></a>
## [0.2.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.2.0...@jscad/core@0.2.1) (2018-04-02)


### Bug Fixes

* **svg-serializer:** updated [@jscad](https://github.com/jscad)/io for fix of broken svg export([#365](https://github.com/jscad/OpenJSCAD.org/issues/365)) ([d4ad54c](https://github.com/jscad/OpenJSCAD.org/commit/d4ad54c))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.1.0...@jscad/core@0.2.0) (2018-03-10)


### Features

* **dxf input support:** add support of dxf files as inputs ([#361](https://github.com/jscad/OpenJSCAD.org/issues/361)) ([bfd2835](https://github.com/jscad/OpenJSCAD.org/commit/bfd2835))




<a name="0.1.0"></a>
# [0.1.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@0.0.2...@jscad/core@0.1.0) (2018-03-09)


### Features

* **modules support:** add node.js modules support to  cli ([#360](https://github.com/jscad/OpenJSCAD.org/issues/360)) ([74a8b5e](https://github.com/jscad/OpenJSCAD.org/commit/74a8b5e)), closes [#356](https://github.com/jscad/OpenJSCAD.org/issues/356)




<a name="0.0.2"></a>
## 0.0.2 (2018-02-13)




**Note:** Version bump only for package @jscad/core
