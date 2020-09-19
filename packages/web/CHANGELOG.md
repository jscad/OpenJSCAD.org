# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.7](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.6...@jscad/web@2.0.0-alpha.7) (2020-09-19)


### Bug Fixes

* **all:** support sparse arrays from main() ([#672](https://github.com/jscad/OpenJSCAD.org/issues/672)) ([209961d](https://github.com/jscad/OpenJSCAD.org/commit/209961d41ebf77373d427a7986934d195780f118))
* **web:** V2 enable multi-gesture touch events for mobile devices ([#686](https://github.com/jscad/OpenJSCAD.org/issues/686)) ([3243f17](https://github.com/jscad/OpenJSCAD.org/commit/3243f17da5679d8bb6c19819a0e130ef5aafbb60))


### Features

* **modeling:** add align() and measureAggregateBoundingBox() functions ([72df65c](https://github.com/jscad/OpenJSCAD.org/commit/72df65cfec065f26a84a8bb1ff80f5750a9972bf))





# [2.0.0-alpha.6](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.5...@jscad/web@2.0.0-alpha.6) (2020-09-08)


### Bug Fixes

* **core:** corrected webRequire to use posix paths ([53a6e85](https://github.com/jscad/OpenJSCAD.org/commit/53a6e85e1dc8f515e8e259e0bb40f292909645fa))


### Features

* **examples:** examples overhaul for V2 JSCAD ([d73e06f](https://github.com/jscad/OpenJSCAD.org/commit/d73e06f51e187e673487c3d9599672e66ac441d7))





# [2.0.0-alpha.5](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.4...@jscad/web@2.0.0-alpha.5) (2020-09-02)


### Bug Fixes

* **all:** update dependencies ([d8c713a](https://github.com/jscad/OpenJSCAD.org/commit/d8c713a933b97a6d179ed3d3e923e188e334f99e))





# [2.0.0-alpha.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.3...@jscad/web@2.0.0-alpha.4) (2020-08-26)

* **regl-renderer:** various fixes to renderer





# [2.0.0-alpha.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.2...@jscad/web@2.0.0-alpha.3) (2020-08-24)


### Bug Fixes

* **web:** fixes for slider, group, and choice parameter types ([a3faba3](https://github.com/jscad/OpenJSCAD.org/commit/a3faba367604c897d240f56ba86ddb5404034afd))





# [2.0.0-alpha.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.1...@jscad/web@2.0.0-alpha.2) (2020-08-23)


### Bug Fixes

* **web:** apply throttles on viewer events, creating smoother transitions ([4528a7e](https://github.com/jscad/OpenJSCAD.org/commit/4528a7e310c26117982aebaf26307fbd78c51538))
* **web:** corrected errors when uploading files using Chrome OS [#331](https://github.com/jscad/OpenJSCAD.org/issues/331) ([#441](https://github.com/jscad/OpenJSCAD.org/issues/441)), late V1 fix ([025aab2](https://github.com/jscad/OpenJSCAD.org/commit/025aab22f2517f5e499c044ef432781876399375))





# [2.0.0-alpha.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@2.0.0-alpha.0...@jscad/web@2.0.0-alpha.1) (2020-08-19)

**Note:** Version bump only for package @jscad/web





# [2.0.0-alpha.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.10.0...@jscad/web@2.0.0-alpha.0) (2020-08-13)


### Bug Fixes

* **web:** small tweaks and fixes for V2 ([#484](https://github.com/jscad/OpenJSCAD.org/issues/484)) ([ee50200](https://github.com/jscad/OpenJSCAD.org/commit/ee50200bfcacd8078fa6f1fd73f6cd866afce5ed))
* **web:** added serialize-to-js to dependencies in package.json ([#457](https://github.com/jscad/OpenJSCAD.org/issues/457)) ([84a9041](https://github.com/jscad/OpenJSCAD.org/commit/84a904142afac713c61878b175cf83e9871c928b))
* **web:** changed walkFileTree to filter out hidden files and directories
* **web:** cleanup of html for the main view
* **web:** corrected to pass the canvas option to initialize the regl instance
* **web:** reworked the logic in viewer setup, considating options
* **web:** added subColor to themes, added grass and ocean themes
* **web:** added grass and ocean themes to list
* **web:** enhanced options view to build a selection list of themes
* **web:** enhanced viewer view to support themes
* **web:** moved to div/span layout to support Safari
* **web:** simplified logic in updateAndRender loop
* **web:** created a list of themes, which is used to initialize the available themes
* **web:** corrected issues with export format selection, and export of files
* **web:** enhanced code to support loading of project directories
* **web:** small change to CSS and layout to eliminate id conflict in html layout
* **web:** changed to serialize objects using JSON
* **web:** updated links, and added support for languages in help


### Features

* **web:** Overhaul and V2 groundwork ([#382](https://github.com/jscad/OpenJSCAD.org/issues/382)) ([5e66632](https://github.com/jscad/OpenJSCAD.org/commit/5e666327a8b50a7fa6baa4bbdfd790d243f8064f))
* **web:** Japanese Language Support ([#456](https://github.com/jscad/OpenJSCAD.org/issues/456)) ([4bef398](https://github.com/jscad/OpenJSCAD.org/commit/4bef39809ab738481a9354de057f13de31cb2e96))





<a name="1.10.0"></a>
# [1.10.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.9.0...@jscad/web@1.10.0) (2019-01-04)


### Features

* **web:** add standalone umd / embeddable version ([#413](https://github.com/jscad/OpenJSCAD.org/issues/413)) ([f25d8c0](https://github.com/jscad/OpenJSCAD.org/commit/f25d8c0)), closes [#402](https://github.com/jscad/OpenJSCAD.org/issues/402) [#343](https://github.com/jscad/OpenJSCAD.org/issues/343)




<a name="1.9.0"></a>
# [1.9.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.8.4...@jscad/web@1.9.0) (2018-09-02)


### Features

* **io:** add updated dependencies: enable csg to dxf ([#394](https://github.com/jscad/OpenJSCAD.org/issues/394)) ([1144a78](https://github.com/jscad/OpenJSCAD.org/commit/1144a78))




<a name="1.8.4"></a>
## [1.8.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.8.3...@jscad/web@1.8.4) (2018-05-12)


### Bug Fixes

* **web:** HTML syntax and performance improvement ([#383](https://github.com/jscad/OpenJSCAD.org/issues/383)) ([d5be1fb](https://github.com/jscad/OpenJSCAD.org/commit/d5be1fb))




<a name="1.8.3"></a>
## [1.8.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.8.2...@jscad/web@1.8.3) (2018-04-07)


### Bug Fixes

* **dxf-serializer:** updated [@jscad](https://github.com/jscad)/io dependency version for dxf-serializer fixes ([#369](https://github.com/jscad/OpenJSCAD.org/issues/369)) ([fadae24](https://github.com/jscad/OpenJSCAD.org/commit/fadae24))




<a name="1.8.2"></a>
## [1.8.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.8.1...@jscad/web@1.8.2) (2018-04-07)




**Note:** Version bump only for package @jscad/web

<a name="1.8.1"></a>
## [1.8.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.8.0...@jscad/web@1.8.1) (2018-04-02)


### Bug Fixes

* **svg-serializer:** updated [@jscad](https://github.com/jscad)/io for fix of broken svg export([#365](https://github.com/jscad/OpenJSCAD.org/issues/365)) ([d4ad54c](https://github.com/jscad/OpenJSCAD.org/commit/d4ad54c))




<a name="1.8.0"></a>
# [1.8.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.7.0...@jscad/web@1.8.0) (2018-03-10)


### Features

* **dxf input support:** add support of dxf files as inputs ([#361](https://github.com/jscad/OpenJSCAD.org/issues/361)) ([bfd2835](https://github.com/jscad/OpenJSCAD.org/commit/bfd2835))




<a name="1.7.0"></a>
# [1.7.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/web@1.6.2...@jscad/web@1.7.0) (2018-03-09)


### Features

* **modules support:** add node.js modules support to  cli ([#360](https://github.com/jscad/OpenJSCAD.org/issues/360)) ([74a8b5e](https://github.com/jscad/OpenJSCAD.org/commit/74a8b5e)), closes [#356](https://github.com/jscad/OpenJSCAD.org/issues/356)




<a name="1.6.2"></a>
## 1.6.2 (2018-02-13)




**Note:** Version bump only for package @jscad/web

<a name="1.6.2"></a>
## 1.6.2 (2018-02-13)




**Note:** Version bump only for package @jscad/web
