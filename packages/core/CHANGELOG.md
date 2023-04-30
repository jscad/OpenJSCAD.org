# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.6.6](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.5...@jscad/core@2.6.6) (2023-04-30)

**Note:** Version bump only for package @jscad/core





## [2.6.5](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.4...@jscad/core@2.6.5) (2022-11-26)

**Note:** Version bump only for package @jscad/core





## [2.6.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.3...@jscad/core@2.6.4) (2022-09-23)

**Note:** Version bump only for package @jscad/core





## [2.6.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.2...@jscad/core@2.6.3) (2022-08-21)

**Note:** Version bump only for package @jscad/core





## [2.6.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.1...@jscad/core@2.6.2) (2022-07-17)

**Note:** Version bump only for package @jscad/core





## [2.6.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.6.0...@jscad/core@2.6.1) (2022-06-12)

**Note:** Version bump only for package @jscad/core





# [2.6.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.9...@jscad/core@2.6.0) (2022-05-15)


### Bug Fixes

* **core:** catch and create create message from thrown objects (non-Error) ([2cdbbf1](https://github.com/jscad/OpenJSCAD.org/commit/2cdbbf108e0c48fc1a69e53da404968cea07142e))
* **core:** corrected webRequire to catch errors from dynamic code evaluation, and rethrow with correct context ([ff06731](https://github.com/jscad/OpenJSCAD.org/commit/ff0673136f26b08116054e49fa179b8807b9ab3b))


### Features

* **core:** corrected rebuildGeometry to catch all errors, and callback with complete error information ([61dac1c](https://github.com/jscad/OpenJSCAD.org/commit/61dac1ca8a2bc849c1e5e304c75bc752b7ae2bac))





## [2.5.9](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.8...@jscad/core@2.5.9) (2022-04-24)

**Note:** Version bump only for package @jscad/core





## [2.5.8](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.7...@jscad/core@2.5.8) (2022-04-03)

**Note:** Version bump only for package @jscad/core





## [2.5.7](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.6...@jscad/core@2.5.7) (2022-04-03)

**Note:** Version bump only for package @jscad/core





## [2.5.6](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.5...@jscad/core@2.5.6) (2022-03-13)

**Note:** Version bump only for package @jscad/core





## [2.5.5](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.4...@jscad/core@2.5.5) (2022-03-06)

**Note:** Version bump only for package @jscad/core





## [2.5.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.3...@jscad/core@2.5.4) (2022-02-19)

**Note:** Version bump only for package @jscad/core





## [2.5.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.2...@jscad/core@2.5.3) (2022-01-23)


### Bug Fixes

* **core:** add caching to webRequire ([#971](https://github.com/jscad/OpenJSCAD.org/issues/971)) ([9095129](https://github.com/jscad/OpenJSCAD.org/commit/9095129263c10afb28fa161a94be776428e02bb3))
* **core:** corrected checks for proper main module, and improved error messages ([#979](https://github.com/jscad/OpenJSCAD.org/issues/979)) ([e4e6c12](https://github.com/jscad/OpenJSCAD.org/commit/e4e6c126f3bdccc54efc3ce8f31c08dd514e592c))





## [2.5.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.1...@jscad/core@2.5.2) (2021-12-26)

**Note:** Version bump only for package @jscad/core





## [2.5.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.5.0...@jscad/core@2.5.1) (2021-12-11)

**Note:** Version bump only for package @jscad/core





# [2.5.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.4.0...@jscad/core@2.5.0) (2021-11-07)


### Features

* **core:** remove VTREE from core and web modules ([#938](https://github.com/jscad/OpenJSCAD.org/issues/938)) ([11431dc](https://github.com/jscad/OpenJSCAD.org/commit/11431dc41f9da085dcfc95a9f6af23b28d9809ea))





# [2.4.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.8...@jscad/core@2.4.0) (2021-10-17)


### Features

* **web:** changed default serialize to false, eliminating JSON serialize/deserialize ([#928](https://github.com/jscad/OpenJSCAD.org/issues/928)) ([b29993a](https://github.com/jscad/OpenJSCAD.org/commit/b29993a8fd3da3bd43a5f871edae4c60d7f56fc7))





## [2.3.8](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.7...@jscad/core@2.3.8) (2021-10-04)


### Bug Fixes

* **core:** fix missing json5 dependency ([#919](https://github.com/jscad/OpenJSCAD.org/issues/919)) ([40d1cb1](https://github.com/jscad/OpenJSCAD.org/commit/40d1cb131be4a4c4417584381e711a0bc9f23657))





## [2.3.7](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.6...@jscad/core@2.3.7) (2021-09-27)


### Reverts

* param parsing only for main script ([7193138](https://github.com/jscad/OpenJSCAD.org/commit/71931380be8442b8cc0f4d605eab5201543cfd7d))





## [2.3.6](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.5...@jscad/core@2.3.6) (2021-09-09)

**Note:** Version bump only for package @jscad/core





## [2.3.5](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.4...@jscad/core@2.3.5) (2021-06-20)

**Note:** Version bump only for package @jscad/core





## [2.3.4](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.3...@jscad/core@2.3.4) (2021-06-11)


### Performance Improvements

* **web:** removed JSON serialization of solids between worker and main threads ([#853](https://github.com/jscad/OpenJSCAD.org/issues/853)) ([a3334a6](https://github.com/jscad/OpenJSCAD.org/commit/a3334a6d8a30c69ebf5c0d2b7d08cb43b34d5197))





## [2.3.3](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.2...@jscad/core@2.3.3) (2021-06-01)

**Note:** Version bump only for package @jscad/core





## [2.3.2](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.1...@jscad/core@2.3.2) (2021-05-16)

**Note:** Version bump only for package @jscad/core





## [2.3.1](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.3.0...@jscad/core@2.3.1) (2021-05-07)

**Note:** Version bump only for package @jscad/core





# [2.3.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.2.0...@jscad/core@2.3.0) (2021-04-20)


### Features

* **core:** added @jscad/array-utils to list of core modules ([79ddf31](https://github.com/jscad/OpenJSCAD.org/commit/79ddf31bd10b5250953545e110e59d736109c6b8))





# [2.2.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.0...@jscad/core@2.2.0) (2021-04-17)


### Bug Fixes

* **all:** fix json import ([#675](https://github.com/jscad/OpenJSCAD.org/issues/675)) ([05caf60](https://github.com/jscad/OpenJSCAD.org/commit/05caf60efc3f090313b3e0bddcc0b4f94de67c78))
* **all:** support sparse arrays from main() ([#672](https://github.com/jscad/OpenJSCAD.org/issues/672)) ([209961d](https://github.com/jscad/OpenJSCAD.org/commit/209961d41ebf77373d427a7986934d195780f118))
* **all:** update dependencies ([d8c713a](https://github.com/jscad/OpenJSCAD.org/commit/d8c713a933b97a6d179ed3d3e923e188e334f99e))
* **all:** V2 : allow other file types to be loaded into the fake FS of the WEB UI ([#709](https://github.com/jscad/OpenJSCAD.org/issues/709)) ([1d4304a](https://github.com/jscad/OpenJSCAD.org/commit/1d4304ae6b42c51b0526cba369eab1806fe8f274))
* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/OpenJSCAD.org/issues/705)) ([62017a4](https://github.com/jscad/OpenJSCAD.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))
* **core:** corrected webRequire to use posix paths ([53a6e85](https://github.com/jscad/OpenJSCAD.org/commit/53a6e85e1dc8f515e8e259e0bb40f292909645fa))
* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))
* **web:** fixes for slider, group, and choice parameter types ([a3faba3](https://github.com/jscad/OpenJSCAD.org/commit/a3faba367604c897d240f56ba86ddb5404034afd))


### Features

* **core:** V2 : Fix core packaging ([#720](https://github.com/jscad/OpenJSCAD.org/issues/720)) ([e19c10c](https://github.com/jscad/OpenJSCAD.org/commit/e19c10c6d1a8f2b4f15a0b81144be8439095e02f))
* **modeling:** V2 fix extrusions ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))





# [2.1.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.0...@jscad/core@2.1.0) (2021-04-15)


### Bug Fixes

* **all:** fix json import ([#675](https://github.com/jscad/OpenJSCAD.org/issues/675)) ([05caf60](https://github.com/jscad/OpenJSCAD.org/commit/05caf60efc3f090313b3e0bddcc0b4f94de67c78))
* **all:** support sparse arrays from main() ([#672](https://github.com/jscad/OpenJSCAD.org/issues/672)) ([209961d](https://github.com/jscad/OpenJSCAD.org/commit/209961d41ebf77373d427a7986934d195780f118))
* **all:** update dependencies ([d8c713a](https://github.com/jscad/OpenJSCAD.org/commit/d8c713a933b97a6d179ed3d3e923e188e334f99e))
* **all:** V2 : allow other file types to be loaded into the fake FS of the WEB UI ([#709](https://github.com/jscad/OpenJSCAD.org/issues/709)) ([1d4304a](https://github.com/jscad/OpenJSCAD.org/commit/1d4304ae6b42c51b0526cba369eab1806fe8f274))
* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/OpenJSCAD.org/issues/705)) ([62017a4](https://github.com/jscad/OpenJSCAD.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))
* **core:** corrected webRequire to use posix paths ([53a6e85](https://github.com/jscad/OpenJSCAD.org/commit/53a6e85e1dc8f515e8e259e0bb40f292909645fa))
* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))
* **web:** fixes for slider, group, and choice parameter types ([a3faba3](https://github.com/jscad/OpenJSCAD.org/commit/a3faba367604c897d240f56ba86ddb5404034afd))


### Features

* **core:** V2 : Fix core packaging ([#720](https://github.com/jscad/OpenJSCAD.org/issues/720)) ([e19c10c](https://github.com/jscad/OpenJSCAD.org/commit/e19c10c6d1a8f2b4f15a0b81144be8439095e02f))
* **modeling:** V2 fix extrusions ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))





# [2.0.0](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.14...@jscad/core@2.0.0) (2021-04-12)

**Note:** Version bump only for package @jscad/core





# [2.0.0-alpha.14](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.13...@jscad/core@2.0.0-alpha.14) (2021-03-07)

**Note:** Version bump only for package @jscad/core





# [2.0.0-alpha.13](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.12...@jscad/core@2.0.0-alpha.13) (2021-02-07)


### Features

* **modeling:** V2 fix extrusions ([#761](https://github.com/jscad/OpenJSCAD.org/issues/761)) ([466910e](https://github.com/jscad/OpenJSCAD.org/commit/466910e7c1a3398065ba2895871c42f35877834a))

### Bug Fixes

* **core:** changed serializeSolids to apply transforms before serializing, correcting issues with mirroring

# [2.0.0-alpha.12](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.11...@jscad/core@2.0.0-alpha.12) (2021-01-02)


### Bug Fixes

* **core,modeling:** V2 fix extrude ([#751](https://github.com/jscad/OpenJSCAD.org/issues/751)) ([767b6fc](https://github.com/jscad/OpenJSCAD.org/commit/767b6fc13a24b6203248c197210645e5b7cebc28))





# [2.0.0-alpha.11](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.10...@jscad/core@2.0.0-alpha.11) (2020-12-04)

**Note:** Version bump only for package @jscad/core





# [2.0.0-alpha.10](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.9...@jscad/core@2.0.0-alpha.10) (2020-11-07)


### Features

* **core:** V2 : Fix core packaging ([#720](https://github.com/jscad/OpenJSCAD.org/issues/720)) ([e19c10c](https://github.com/jscad/OpenJSCAD.org/commit/e19c10c6d1a8f2b4f15a0b81144be8439095e02f))





# [2.0.0-alpha.9](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.8...@jscad/core@2.0.0-alpha.9) (2020-10-24)


### Bug Fixes

* **all:** V2 : allow other file types to be loaded into the fake FS of the WEB UI ([#709](https://github.com/jscad/OpenJSCAD.org/issues/709)) ([1d4304a](https://github.com/jscad/OpenJSCAD.org/commit/1d4304ae6b42c51b0526cba369eab1806fe8f274))





# [2.0.0-alpha.8](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.7...@jscad/core@2.0.0-alpha.8) (2020-10-11)


### Bug Fixes

* **all:** V2 : several fixes for modeling ([#705](https://github.com/jscad/OpenJSCAD.org/issues/705)) ([62017a4](https://github.com/jscad/OpenJSCAD.org/commit/62017a41214169d6e000f1e0c11aaefdd68e1097))





# [2.0.0-alpha.7](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.6...@jscad/core@2.0.0-alpha.7) (2020-09-29)

**Note:** Version bump only for package @jscad/core





# [2.0.0-alpha.6](https://github.com/jscad/OpenJSCAD.org/compare/@jscad/core@2.0.0-alpha.5...@jscad/core@2.0.0-alpha.6) (2020-09-28)

**Note:** Version bump only for package @jscad/core





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
