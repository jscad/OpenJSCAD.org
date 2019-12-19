const test = require('ava')
const path = require('path')
const fs = require('fs')
const makeWebRequire = require('./webRequire')
const transformSources = require('./transformSources')
const makeFakeFs = require('./makeFakeFs')

function almostEquals (t, observed, expected, precision) {
  t.is(Math.abs(expected - observed) < precision, true)
}

test.beforeEach(t => {
})

test('webRequire: should allow requiring single (main) files', t => {
  const mainPath = 'http://localhost:8081/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      ext: 'js',
      fullPath: 'http://localhost:8081/examples/logo.js',
      name: 'logo.js',
      source: `const main = () => {
        return cube()
      }`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })
  const designRootModule = requireFn(mainPath)

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should support requiring relative .js files with extensions', t => {
  const mainPath = '/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      fullPath: '/examples/logo.js',
      name: 'logo.js',
      ext: 'js',
      source: `
      const {test} = require('./other.js')
      const main = () => {
        return test()
      }
      module.exports = {main}
      `
    },
    {
      fullPath: '/examples/other.js',
      name: 'other.js',
      ext: 'js',
      source: `
      const test = () => 42
      module.exports = {test}`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })
  const designRootModule = requireFn(mainPath)

  const resultOfMain = designRootModule.main()
  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
  t.deepEqual(resultOfMain, 42)
})

test('webRequire: should support requiring relative .js files with no extensions', t => {
  const mainPath = '/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      fullPath: '/examples/logo.js',
      name: 'logo.js',
      ext: 'js',
      source: `
      const {test} = require('./other')
      const main = () => {
        return test()
      }
      module.exports = {main}
      `
    },
    {
      fullPath: '/examples/other.js',
      name: 'other.js',
      ext: 'js',
      source: `
      const test = () => 42
      module.exports = {test}`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })
  const designRootModule = requireFn(mainPath)

  const resultOfMain = designRootModule.main()
  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
  t.deepEqual(resultOfMain, 42)
})

test('webRequire: should support requiring relative .json files with extensions', t => {
  const mainPath = '/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      fullPath: '/examples/logo.js',
      name: 'logo.js',
      ext: 'js',
      source: `
      const jsonTest = require('./data.json')
      const main = () => {
        return jsonTest.firstName
      }
      module.exports = {main}
      `
    },
    {
      fullPath: '/examples/data.json',
      name: 'data.json',
      ext: 'json',
      source: `{
        "firstName": "Liet",
        "lastName": "Kynes",
        "isAlive": true
      }`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })
  const designRootModule = requireFn(mainPath)

  const resultOfMain = designRootModule.main()
  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
  t.deepEqual(resultOfMain, 'Liet')
})

test('webRequire: should accept an optional fakeFs instance', t => {
  const mainPath = 'http://localhost:8081/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      ext: 'js',
      fullPath: 'http://localhost:8081/examples/logo.js',
      name: 'logo.js',
      source: `const main = () => {
        return cube()
      }`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const fakeFs = makeFakeFs(filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath, fakeFs })
  const designRootModule = requireFn(mainPath)

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should allow using require.extensions like the native node require (simple)', t => {
  const registerJscadExtension = (fs, _require) => {
    const stripBom = require('strip-bom')
    _require.extensions['.jscad'] = (module, filename) => {
      const content = fs.readFileSync(filename, 'utf8')
      module._compile(stripBom(content), filename)
    }
  }

  const mainPath = 'http://localhost:8081/examples/logo.jscad'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      ext: 'jscad',
      fullPath: 'http://localhost:8081/examples/logo.jscad',
      name: 'logo.jscad',
      source: `const main = () => {
        return cube()
      }`
    }
  ]
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
  const fakeFs = makeFakeFs(filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath, fakeFs })
  registerJscadExtension(fakeFs, requireFn)

  const designRootModule = requireFn(mainPath)
  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should allow using require.extensions like the native node require (parser)', t => {
  const registerStlExtension = (fs, _require) => {
    const deserializer = require('@jscad/io').stlDeSerializer
    _require.extensions['.stl'] = (module, filename) => {
      const content = fs.readFileSync(filename, 'utf8')
      const parsed = deserializer.deserialize(content, filename, { output: 'geometry' })
      module.exports = parsed
    }
  }

  const mainPath = '/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  let filesAndFolders = [
    {
      ext: 'js',
      fullPath: '/examples/logo.js',
      name: 'logo.js',
      source: `
      const solidData = require('./cube.stl')
      const main = () => {
        return {cube: solidData}
      }
      module.exports = {main}
      `
    },
    {
      ext: 'stl',
      fullPath: '/examples/cube.stl',
      name: 'cube.stl',
      source: `solid MYSOLID
      facet normal  0.0   0.0  -1.0    
        outer loop
          vertex    0.0   0.0   0.0    
          vertex    1.0   1.0   0.0    
          vertex    1.0   0.0   0.0    
        endloop
      endfacet
      facet normal  0.0   0.0  -1.0    
        outer loop
          vertex    0.0   0.0   0.0 
          vertex    0.0   1.0   0.0    
          vertex    1.0   1.0   0.0    
        endloop
      endfacet
      facet normal -1.0   0.0   0.0    
        outer loop
          vertex    0.0   0.0   0.0
          vertex    0.0   1.0   1.0
          vertex    0.0   1.0   0.0
        endloop
      endfacet
      facet normal -1.0   0.0   0.0    
        outer loop
          vertex    0.0   0.0   0.0
          vertex    0.0   0.0   1.0
          vertex    0.0   1.0   1.0
        endloop
      endfacet
      facet normal  0.0   1.0   0.0    
        outer loop
          vertex    0.0   1.0   0.0
          vertex    1.0   1.0   1.0
          vertex    1.0   1.0   0.0
        endloop
      endfacet
      facet normal  0.0   1.0   0.0    
        outer loop
          vertex    0.0   1.0   0.0
          vertex    0.0   1.0   1.0
          vertex    1.0   1.0   1.0
        endloop
      endfacet
      facet normal  1.0   0.0   0.0    
        outer loop
          vertex    1.0   0.0   0.0
          vertex    1.0   1.0   0.0
          vertex    1.0   1.0   1.0
        endloop
      endfacet
      facet normal  1.0   0.0   0.0    
        outer loop
          vertex    1.0   0.0   0.0
          vertex    1.0   1.0   1.0
          vertex    1.0   0.0   1.0
        endloop
      endfacet
      facet normal  0.0  -1.0   0.0    
        outer loop
          vertex    0.0   0.0   0.0
          vertex    1.0   0.0   0.0
          vertex    1.0   0.0   1.0
        endloop
      endfacet
      facet normal  0.0  -1.0   0.0    
        outer loop
          vertex    0.0   0.0   0.0
          vertex    1.0   0.0   1.0
          vertex    0.0   0.0   1.0
        endloop
      endfacet
      facet normal  0.0   0.0   1.0    
        outer loop
          vertex    0.0   0.0   1.0
          vertex    1.0   0.0   1.0
          vertex    1.0   1.0   1.0
        endloop
      endfacet
      facet normal  0.0   0.0   1.0    
        outer loop
          vertex    0.0   0.0   1.0
          vertex    1.0   1.0   1.0
          vertex    0.0   1.0   1.0
        endloop
      endfacet
    endsolid MYSOLID`
    }
  ]
  const fakeFs = makeFakeFs(filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath, fakeFs })
  registerStlExtension(fakeFs, requireFn)

  const designRootModule = requireFn(mainPath)

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
  const resultOfMain = designRootModule.main()
  t.true('cube' in resultOfMain)
})