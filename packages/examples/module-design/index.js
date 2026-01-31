/**
 * Modular Project Design Example
 * @category Projects
 * @skillLevel 1
 * @description Demonstrating the structure of a multi-file project
 * @tags measurements, bounds, boundingbox
 * @authors Moissette Mark, Simon Clark
 * @licence MIT License
 */

import * as mountPlate from './mountPlate.js'
import { sphereShape } from './subFolder/sphereShape.js'

export const getParameterDefinitions = () => {
  const globalParams = [
    { name: 'showPlate', type: 'checkbox', checked: true, caption: 'Show plate:' },
    { name: 'showSphere', type: 'checkbox', checked: true, caption: 'Show sphere:' }
  ]

  // Load the parameters defined in the mountPlate sub-file, and add them to the project parameters.
  const plateParams = mountPlate.getParameterDefinitions()
  globalParams.push(...plateParams)
  return globalParams
}

export const main = (params) => {
  let results = []
  results = params.showPlate ? results.concat(mountPlate.create(params.plateLength)) : results
  results = params.showSphere ? results.concat(sphereShape(3)) : results

  return results
}
