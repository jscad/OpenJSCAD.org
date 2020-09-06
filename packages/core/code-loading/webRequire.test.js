const test = require('ava')

const { registerAllExtensions } = require('../io/registerExtensions')

const makeWebRequire = require('./webRequire')
const makeFakeFs = require('./makeFakeFs')

test.beforeEach((t) => {
})

test('webRequire: should support require, from a single file', (t) => {
  const apiMainPath = '@jscad/modeling'

  let requireFn = makeWebRequire(singleFileJs, { apiMainPath })
  let designRootModule = requireFn(singleFileJs[0].fullPath)

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)

  // NOTE: 'jscad' must be registered as an extension
  const fakeFs = makeFakeFs(singleFileJscad)
  requireFn = makeWebRequire(singleFileJscad, { apiMainPath })
  registerAllExtensions(fakeFs, requireFn)
  designRootModule = requireFn(singleFileJscad[0].fullPath)

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should support require, from a directory with index.js', (t) => {
  const apiMainPath = '@jscad/modeling'

  const requireFn = makeWebRequire(directoryWithIndexJs, { apiMainPath })
  const designRootModule = requireFn('/project')

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should support require, from a directory with index.json', (t) => {
  const apiMainPath = '@jscad/modeling'

  const requireFn = makeWebRequire(directoryWithIndexJson, { apiMainPath })
  const designRootModule = requireFn('/project')

  t.true('name' in designRootModule)
  t.true('version' in designRootModule)
})

test('webRequire: should support require, from a directory with project.json', (t) => {
  const apiMainPath = '@jscad/modeling'

  const requireFn = makeWebRequire(directoryWithPackageJson, { apiMainPath })
  const designRootModule = requireFn('/project')

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should support require, from a directory with dependent files', (t) => {
  const apiMainPath = '@jscad/modeling'

  const fakeFs = makeFakeFs(directoryWithDependencies)
  const requireFn = makeWebRequire(directoryWithDependencies, { apiMainPath })
  registerAllExtensions(fakeFs, requireFn)
  const designRootModule = requireFn('/project')

  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)

  // const resultOfMain = designRootModule.main()
})

test('webRequire: should allow using require.extensions like the native node require (simple)', (t) => {
  const registerJscadExtension = (fs, _require) => {
    const stripBom = require('strip-bom')
    _require.extensions['.jscad'] = (module, filename) => {
      const content = fs.readFileSync(filename, 'utf8')
      module._compile(stripBom(content), filename)
    }
  }

  const mainPath = '/logo.jscad'
  const apiMainPath = '@jscad/modeling'
  const filesAndFolders = [
    {
      ext: 'jscad',
      fullPath: '/logo.jscad',
      name: 'logo.jscad',
      source: `
        const main = () => {
          return cube()
        }
        module.exports = {main}
      `
    }
  ]
  const fakeFs = makeFakeFs(filesAndFolders)
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath, fakeFs })
  registerJscadExtension(fakeFs, requireFn)

  const designRootModule = requireFn(mainPath)
  t.true('main' in designRootModule)
  t.true(designRootModule.main instanceof Function)
})

test('webRequire: should allow using require.extensions like the native node require (parser)', (t) => {
  const registerStlExtension = (fs, _require) => {
    const { deserializers } = require('@jscad/io')
    const deserializer = deserializers.stl
    _require.extensions['.stl'] = (module, filename) => {
      const content = fs.readFileSync(filename, 'utf8')
      const parsed = deserializer({ filename, output: 'geometry' }, content)
      module.exports = parsed
    }
  }

  const mainPath = '/examples/logo.js'
  const apiMainPath = '@jscad/modeling'
  const filesAndFolders = [
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

// TEST FILE SYSTEMS

const singleFileJs = [
  {
    ext: 'js',
    fullPath: '/logo.js',
    name: 'logo.js',
    source: `
      const { cube } = require('@jscad/modeling').primitives

      const main = () => {
        return cube()
      }
      module.exports = {main}
    `
  }
]

const singleFileJscad = [
  {
    ext: 'jscad',
    fullPath: '/logo.jscad',
    name: 'logo.jscad',
    source: `
      const main = () => {
        return cube()
      }
      module.exports = {main}
    `
  }
]

const directoryWithIndexJs = [
  {
    fullPath: '/project',
    name: 'project',
    children: [
      {
        ext: 'js',
        fullPath: '/project/index.js',
        name: 'index.js',
        source: `
          const main = () => {
            return cube()
          }
          module.exports = {main}
        `
      }
    ]
  }
]

const directoryWithIndexJson = [
  {
    fullPath: '/project',
    name: 'project',
    children: [
      {
        ext: 'json',
        fullPath: '/project/index.json',
        name: 'index.json',
        source: `
{
  "name": "project",
  "version": "0.0.0"
}
        `
      }
    ]
  }
]

const directoryWithPackageJson = [
  {
    fullPath: '/project',
    name: 'project',
    children: [
      {
        ext: 'json',
        fullPath: '/project/package.json',
        name: 'package.json',
        source: `
{
  "name": "project",
  "version": "0.0.0",
  "main": "file.js"
}
        `
      },
      {
        ext: 'js',
        fullPath: '/project/file.js',
        name: 'file.js',
        source: `
          const main = () => {
            return cube()
          }
          module.exports = {main}
        `
      }
    ]
  }
]

// REQUIRE: ./version.json
// REQUIRE: ./file
const directoryWithDependencies = [
  {
    fullPath: '/project',
    name: 'project',
    children: [
      {
        ext: 'js',
        fullPath: '/project/index.js',
        name: 'index.js',
        source: `
          const { transforms } = require('@jscad/modeling')

          const { version } = require('./version.json')

          const main = (params) => {
            let mesh1 = require('./file1')
            mesh1 = transforms.translate([50, 50, 50], mesh1)
            return mesh1
          }

          module.exports = { main }
        `
      },
      {
        ext: 'json',
        fullPath: '/project/version.json',
        name: 'version.json',
        source: `
{
  "name": "project",
  "version": "0.0.0"
}
        `
      },
      {
        ext: 'js',
        fullPath: '/project/file1.js',
        name: 'file1.js',
        source: `
          const file1 = () => {
            const shape = require('file2')
            return shape
          }
          module.exports = file1
        `
      },
      {
        ext: 'js',
        fullPath: '/project/file2.js',
        name: 'file2.js',
        source: `
          const { cube } = require('@jscad/modeling').primitives

          const file2 = () => {
            return cube()
          }
          module.exports = file2
        `
      }
    ]
  }
]
