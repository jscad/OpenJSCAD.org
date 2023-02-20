import path from 'path'

import { toArray } from '@jscad/array-utils'

import { getParameterDefinitionsAndValues } from '../parameters/index.js'

export const rebuildGeometryCli = async (data) => {
  const defaults = {
    apiMainPath: '@jscad/modeling'
  }
  let { mainPath, parameterValues, useFakeFs } = Object.assign({}, defaults, data)

  // source came from conversion, i.e. not from file system
  if (useFakeFs) {
    const pathParts = path.parse(mainPath)
    const fakePath = `/${pathParts.name}.js`

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
