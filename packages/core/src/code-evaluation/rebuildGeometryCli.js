import path from 'path'
import { createRequire } from 'module'

import { toArray } from '@jscad/array-utils'

import { requireDesignFromModule } from '../code-loading/requireDesignFromModule.js'
import { getParameterDefinitionsAndValues } from '../parameters/index.js'
import { makeWebRequire } from '../code-loading/webRequire.js'

export const rebuildGeometryCli = async (data) => {
  const defaults = {
    apiMainPath: '@jscad/modeling'
  }
  let { apiMainPath, mainPath, parameterValues, useFakeFs } = Object.assign({}, defaults, data)
  // we need to update the source for our module
  let requireFn = createRequire(import.meta.url)

  // source came from conversion, i.e. not from file system
  if (useFakeFs) {
    const pathParts = path.parse(mainPath)
    const fakeName = `${pathParts.name}.js`
    const fakePath = `/${pathParts.name}.js`
    const filesAndFolders = [
      {
        ext: 'js',
        fullPath: fakePath,
        name: fakeName,
        source: data.source
      }
    ]
    requireFn = makeWebRequire(filesAndFolders, { apiMainPath })

    mainPath = fakePath // and use the alias as the entry point
  }

  // rootModule should contain exported main and getParameterDefinitions functions
  // const rootModule = requireDesignFromModule(mainPath, requireFn)
  // FIXME HACK for designs with import / export
  const rootModule = await import(mainPath)

  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getParameterDefinitionsAndValues(rootModule, parameterValues)

  const rawResults = toArray(rootModule.main(parameters.parameterValues))
  return rawResults
}
